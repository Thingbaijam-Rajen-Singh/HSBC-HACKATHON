import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Load local environment variables from the repository root. Deployed platforms
// can still inject these variables directly through their environment settings.
dotenv.config({ path: path.resolve(projectRoot, '.env') });

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Helper to get active OpenAI client dynamically from environment
function getOpenAIClient() {
  const key = process.env.OPENAI_API_KEY;
  if (!key || key === 'MY_OPENAI_API_KEY' || !key.startsWith('sk-')) {
    return { client: null, key: null };
  }
  return { client: new OpenAI({ apiKey: key }), key };
}

// Initialize Gemini SDK with runtime user secrets as secondary/fallback engine
const ai = new GoogleGenAI({});

// Cache for OpenAI status check (1 minute TTL)
let cachedOpenAiTest: {
  status: 'connected' | 'quota_exceeded' | 'invalid_key' | 'unconfigured' | 'error';
  message: string;
  timestamp: number;
} | null = null;

async function checkOpenAiHealth() {
  const { client, key } = getOpenAIClient();
  if (!client || !key) {
    return {
      status: 'unconfigured' as const,
      message: 'No OpenAI API key provided. Set OPENAI_API_KEY in environment or .env file.',
    };
  }

  const now = Date.now();
  if (cachedOpenAiTest && now - cachedOpenAiTest.timestamp < 60000) {
    return cachedOpenAiTest;
  }

  try {
    await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'ping' }],
      max_tokens: 5,
    });
    cachedOpenAiTest = {
      status: 'connected',
      message: 'OpenAI GPT-4o-mini is connected and verified.',
      timestamp: now,
    };
  } catch (err: any) {
    let status: 'quota_exceeded' | 'invalid_key' | 'error' = 'error';
    let message = err.message || 'OpenAI call failed';

    if (err.status === 429 || err.code === 'insufficient_quota' || err.code === 'credit_balance_exhausted' || message.includes('credits remaining')) {
      status = 'quota_exceeded';
      message = 'OpenAI 429: You have no credits remaining. Add billing credits at platform.openai.com/settings/organization/billing.';
    } else if (err.status === 401) {
      status = 'invalid_key';
      message = 'OpenAI 401: Invalid API key. Check your key at platform.openai.com/api-keys.';
    }

    cachedOpenAiTest = {
      status,
      message,
      timestamp: now,
    };
  }
  return cachedOpenAiTest;
}

// Check AI provider availability status
app.get('/api/ai-provider-status', async (req, res) => {
  const health = await checkOpenAiHealth();
  const { client } = getOpenAIClient();

  return res.json({
    openaiConfigured: Boolean(client),
    openaiStatus: health.status,
    openaiMessage: health.message,
    openaiModel: 'gpt-4o-mini',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    activePrimaryEngine: health.status === 'connected'
      ? 'OpenAI (GPT-4o-mini)'
      : (health.status === 'quota_exceeded'
          ? 'Gemini 2.5 Flash (OpenAI Quota Exceeded)'
          : 'Gemini 2.5 Flash / Curated Engine'),
  });
});

// API route: AI-assisted Learning Resource Finder / Curriculum Enricher (Powered by OpenAI with Gemini/Curated fallback)
app.post('/api/generate-resources', async (req, res) => {
  const { skillTitle, sublevelTitle, summary } = req.body;

  if (!skillTitle || !sublevelTitle) {
    return res.status(400).json({ error: 'skillTitle and sublevelTitle are required' });
  }

  const prompt = `You are an elite curriculum director and instructional designer for SkillBridge.
A student is currently studying:
Skill: "${skillTitle}"
Sublevel: "${sublevelTitle}"
Context: "${summary || ''}"

Provide 3 to 4 high-quality, authentic, and direct learning resources (YouTube videos, official documentation, interactive articles, or free course modules) suitable for this exact topic.
Respond strictly in JSON format matching this schema:
{
  "curatedSummary": "string summarizing core conceptual learning objectives in 2-3 sentences",
  "keyTakeaways": ["string", "string", "string"],
  "resources": [
    {
      "id": "string",
      "title": "string",
      "type": "video | documentation | article | interactive | course",
      "provider": "string (e.g. YouTube, MDN Web Docs, Nielsen Norman Group, Interaction Design Foundation, freeCodeCamp)",
      "url": "string (valid URL)",
      "isFree": true,
      "duration": "string (e.g. 10 min read or 15 min watch)"
    }
  ]
}`;

  const { client } = getOpenAIClient();
  let openAiNotice: string | null = null;

  // 1. Try OpenAI if configured
  if (client) {
    try {
      const completion = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert curriculum director providing structured technical learning resources in valid JSON format.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      });

      const content = completion.choices[0]?.message?.content || '{}';
      const parsedData = JSON.parse(content);
      return res.json({
        success: true,
        engine: 'OpenAI (GPT-4o-mini)',
        data: parsedData,
      });
    } catch (openAiErr: any) {
      if (openAiErr.status === 429 || openAiErr.code === 'credit_balance_exhausted' || openAiErr.message?.includes('credits remaining')) {
        openAiNotice = 'OpenAI 429: No credits remaining on OpenAI account. Add billing credits at platform.openai.com/settings/organization/billing.';
      } else if (openAiErr.status === 401) {
        openAiNotice = 'OpenAI 401: Invalid API Key.';
      } else {
        openAiNotice = `OpenAI call failed: ${openAiErr.message || 'error'}`;
      }
      console.warn('OpenAI request failed, using secondary engine:', openAiNotice);
    }
  }

  // 2. Secondary fallback: Gemini API
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = {
        curatedSummary: `Key conceptual guide for ${sublevelTitle} in ${skillTitle}.`,
        keyTakeaways: ['Understand core terminology', 'Review live examples', 'Practice hands-on challenge'],
        resources: [],
      };
    }

    return res.json({
      success: true,
      engine: 'Gemini 2.5 Flash',
      openAiNotice,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('AI generate-resources fallback error:', error);
    return res.json({
      success: true,
      engine: 'Curated Fallback',
      openAiNotice,
      data: {
        curatedSummary: `Essential learning references and official documentation for ${sublevelTitle}.`,
        keyTakeaways: [
          'Review real-world design and code patterns',
          'Explore user feedback and edge cases',
          'Apply concepts in the interactive challenge',
        ],
        resources: [
          {
            id: 'ai-res-1',
            title: `${skillTitle} Reference & Documentation`,
            type: 'documentation',
            provider: skillTitle.includes('UI') ? 'Nielsen Norman Group' : (skillTitle.includes('Data') ? 'Pandas Documentation' : 'MDN Web Docs'),
            url: skillTitle.includes('UI') ? 'https://www.nngroup.com/articles/' : (skillTitle.includes('Data') ? 'https://pandas.pydata.org/docs/' : 'https://developer.mozilla.org/'),
            isFree: true,
            duration: '10 min read',
          },
        ],
      },
    });
  }
});

// API route: OpenAI Deep-Dive Architectural Explainer for Roadmap Nodes
app.post('/api/openai/deep-dive', async (req, res) => {
  const { nodeTitle, phaseName, skillTitle, keyTopics } = req.body;

  if (!nodeTitle) {
    return res.status(400).json({ error: 'nodeTitle is required' });
  }

  const prompt = `You are a Principal Software Architect and Technical Educator.
Provide an in-depth, authoritative architectural guide for this topic:
Topic: "${nodeTitle}"
Phase: "${phaseName || ''}"
Skill Domain: "${skillTitle || ''}"
Key Keywords: ${(keyTopics || []).join(', ')}

Respond strictly in JSON matching this schema:
{
  "topic": "${nodeTitle}",
  "architecturalSummary": "Deep conceptual breakdown explaining how this works under the hood (2-3 sentences)",
  "whyItMatters": "Why top engineering teams insist on mastering this (2 sentences)",
  "industryScenarios": [
    { "title": "Scenario 1", "description": "Concrete production usage pattern" },
    { "title": "Scenario 2", "description": "Concrete production usage pattern" }
  ],
  "commonTraps": [
    "Critical pitfall or anti-pattern to avoid",
    "Another common bug or misconception"
  ],
  "interviewTip": "High-value question or talking point an interviewer looks for",
  "recommendedHandsOnProject": "A specific mini-project or code exercise to solidify this concept"
}`;

  const { client } = getOpenAIClient();
  let openAiNotice: string | null = null;

  // Try OpenAI if configured
  if (client) {
    try {
      const completion = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an elite Principal Engineer explaining technical architectures in JSON.' },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      });

      const parsed = JSON.parse(completion.choices[0]?.message?.content || '{}');
      return res.json({ success: true, engine: 'OpenAI (GPT-4o-mini)', data: parsed });
    } catch (err: any) {
      if (err.status === 429 || err.code === 'credit_balance_exhausted' || err.message?.includes('credits remaining')) {
        openAiNotice = 'OpenAI 429: No credits remaining on OpenAI account. Add billing credits at platform.openai.com/settings/organization/billing.';
      } else if (err.status === 401) {
        openAiNotice = 'OpenAI 401: Invalid API Key.';
      } else {
        openAiNotice = `OpenAI call failed: ${err.message || 'error'}`;
      }
      console.warn('OpenAI deep-dive failed, falling back:', openAiNotice);
    }
  }

  // Graceful fallback to Gemini or structured response
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });
    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, engine: 'Gemini 2.5 Flash', openAiNotice, data: parsed });
  } catch (geminiErr) {
    return res.json({
      success: true,
      engine: 'Built-in Engine',
      openAiNotice,
      data: {
        topic: nodeTitle,
        architecturalSummary: `${nodeTitle} forms a critical pillar of modern ${skillTitle || 'software engineering'}. It decouples operational logic, ensures resilient state transitions, and reduces execution friction across distributed systems.`,
        whyItMatters: `High-growth teams rely on robust mastery of ${nodeTitle} to maintain sub-second latency, zero-regression deployments, and seamless developer velocity.`,
        industryScenarios: [
          { title: 'Production Scaling', description: 'Handling high-concurrency workloads with declarative data flows.' },
          { title: 'Resilient Error Handling', description: 'Preventing cascading failures and improving observability.' }
        ],
        commonTraps: [
          'Premature optimization before establishing measurable benchmarks.',
          'Neglecting edge-case teardown and state isolation.'
        ],
        interviewTip: 'Articulate the performance trade-offs and explain how you benchmarked your solution against baseline alternatives.',
        recommendedHandsOnProject: `Build a clean proof-of-concept module demonstrating ${nodeTitle} with end-to-end test coverage.`
      }
    });
  }
});


// API route: OpenAI Custom Roadmap Flowchart Generator
app.post('/api/openai/generate-flowchart', async (req, res) => {
  const { customSkill, mode, goal } = req.body;

  if (!customSkill) {
    return res.status(400).json({ error: 'customSkill is required' });
  }

  const prompt = `You are a Principal Curriculum Architect.
Generate an infographic-ready roadmap flowchart for the skill: "${customSkill}".
Target Mode: "${mode || 'normal'}" (normal: 0-to-100 full foundation; advanced: fast-track skipping basics; smart: diagnostic-driven; quick_build: minimal path to ship target goal: "${goal || 'Production App'}").

Respond strictly in JSON matching this schema:
{
  "skillTitle": "${customSkill}",
  "modeTitle": "string",
  "modeSummary": "string",
  "totalHours": 30,
  "totalTopicsCount": 6,
  "speedRatioBadge": "1.0x Full Mastery",
  "phases": [
    {
      "id": "phase-1",
      "number": 1,
      "title": "Phase 01: Name",
      "shortDesc": "Short description of phase",
      "accentColor": "from-indigo-600 to-indigo-800",
      "badge": "Phase 01"
    },
    {
      "id": "phase-2",
      "number": 2,
      "title": "Phase 02: Name",
      "shortDesc": "Short description of phase",
      "accentColor": "from-purple-600 to-purple-800",
      "badge": "Phase 02"
    }
  ],
  "nodes": [
    {
      "id": "node-1",
      "title": "Topic Name",
      "phaseId": "phase-1",
      "phaseName": "Phase 01: Name",
      "phaseNumber": 1,
      "description": "2 sentence clear summary of this sub-stage",
      "keyTopics": ["Topic 1", "Topic 2", "Topic 3"],
      "estimatedHours": 5,
      "difficulty": "Beginner | Intermediate | Advanced",
      "status": "active | fast-track | diagnostic-check | project-critical",
      "statusBadge": "Core Standard | Fast-Track | Project Critical",
      "isMilestone": false,
      "deliverable": "Working Prototype Deliverable",
      "prerequisites": [],
      "nextNodes": ["node-2"]
    }
  ]
}
Provide exactly 2 to 3 phases, with 2 to 3 nodes per phase. Make each node realistic, modern, and high-impact.`;

  const { client } = getOpenAIClient();
  let openAiNotice: string | null = null;

  // Try OpenAI if configured
  if (client) {
    try {
      const completion = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a Principal Technical Curriculum Architect returning valid structured JSON.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      });

      const parsed = JSON.parse(completion.choices[0]?.message?.content || '{}');
      return res.json({ success: true, engine: 'OpenAI (GPT-4o-mini)', data: parsed });
    } catch (err: any) {
      if (err.status === 429 || err.code === 'credit_balance_exhausted' || err.message?.includes('credits remaining')) {
        openAiNotice = 'OpenAI 429: No credits remaining on OpenAI account. Add billing credits at platform.openai.com/settings/organization/billing.';
      } else if (err.status === 401) {
        openAiNotice = 'OpenAI 401: Invalid API Key.';
      } else {
        openAiNotice = `OpenAI flowchart failed: ${err.message || 'error'}`;
      }
      console.warn('OpenAI flowchart generation failed, falling back:', openAiNotice);
    }
  }

  // Graceful fallback to Gemini or structured response
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });
    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, engine: 'Gemini 2.5 Flash', openAiNotice, data: parsed });
  } catch (geminiErr) {
    return res.json({
      success: true,
      engine: 'Built-in Engine',
      openAiNotice,
      data: {
        skillTitle: customSkill,
        modeTitle: `${customSkill} Custom Roadmap`,
        modeSummary: `Engineered curriculum roadmap generated for ${customSkill}.`,
        totalHours: 35,
        totalTopicsCount: 6,
        speedRatioBadge: '1.2x Accelerated',
        phases: [
          {
            id: 'phase-1',
            number: 1,
            title: `Phase 01: Core Architecture`,
            shortDesc: `Master foundational mechanics and core concepts of ${customSkill}.`,
            accentColor: 'from-[#5534DA] to-[#3B1CA8]',
            badge: 'Phase 01'
          },
          {
            id: 'phase-2',
            number: 2,
            title: `Phase 02: Production Systems & Deployment`,
            shortDesc: `Build scalable implementations, testing, and production deliverables.`,
            accentColor: 'from-[#FF5C38] to-[#D94520]',
            badge: 'Phase 02'
          }
        ],
        nodes: [
          {
            id: 'custom-1',
            title: `${customSkill} Fundamentals`,
            phaseId: 'phase-1',
            phaseName: 'Phase 01: Core Architecture',
            phaseNumber: 1,
            description: `Understand the syntax, mental model, and architecture of ${customSkill}.`,
            keyTopics: ['Core Paradigms', 'Environment Setup', 'Execution Model'],
            estimatedHours: 6,
            difficulty: 'Beginner',
            status: 'active',
            statusBadge: 'Core Standard',
            isMilestone: false,
            prerequisites: [],
            nextNodes: ['custom-2']
          },
          {
            id: 'custom-2',
            title: `${customSkill} State & Patterns`,
            phaseId: 'phase-1',
            phaseName: 'Phase 01: Core Architecture',
            phaseNumber: 1,
            description: `Apply idiomatic design patterns, component modularity, and error handling.`,
            keyTopics: ['Modular Design', 'Error Handling', 'Data Flow'],
            estimatedHours: 8,
            difficulty: 'Intermediate',
            status: 'active',
            statusBadge: 'Core Standard',
            isMilestone: true,
            deliverable: `Verified ${customSkill} Foundation Prototype`,
            prerequisites: ['custom-1'],
            nextNodes: ['custom-3']
          },
          {
            id: 'custom-3',
            title: `${customSkill} Production Architecture`,
            phaseId: 'phase-2',
            phaseName: 'Phase 02: Production Systems & Deployment',
            phaseNumber: 2,
            description: `Connect real-time data layers, security constraints, and automated tests.`,
            keyTopics: ['Security Policies', 'Performance Benchmarks', 'CI/CD'],
            estimatedHours: 10,
            difficulty: 'Advanced',
            status: 'active',
            statusBadge: 'Core Standard',
            isMilestone: false,
            prerequisites: ['custom-2'],
            nextNodes: ['custom-4']
          },
          {
            id: 'custom-4',
            title: `${customSkill} Capstone Deliverable`,
            phaseId: 'phase-2',
            phaseName: 'Phase 02: Production Systems & Deployment',
            phaseNumber: 2,
            description: `Ship a live, cloud-deployed capstone project with automated metrics and monitoring.`,
            keyTopics: ['Live Deployment', 'Monitoring & Analytics', 'Production Release'],
            estimatedHours: 11,
            difficulty: 'Advanced',
            status: 'active',
            statusBadge: 'Milestone Deliverable',
            isMilestone: true,
            deliverable: `Live Deployed ${customSkill} Production Project`,
            prerequisites: ['custom-3'],
            nextNodes: []
          }
        ]
      }
    });
  }
});

// Production and Dev middleware setup
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // Mount Vite dev server in development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      configFile: path.resolve(projectRoot, 'vite.config.ts'),
      root: path.resolve(projectRoot, 'frontend'),
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(projectRoot, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(projectRoot, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SkillBridge server running on port ${PORT}`);
  });
}

startServer();
