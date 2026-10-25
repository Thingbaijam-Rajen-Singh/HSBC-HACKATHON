import { RoadmapMode } from '../types';

export interface FlowchartNode {
  id: string;
  title: string;
  phaseId: string;
  phaseName: string;
  phaseNumber: number;
  description: string;
  keyTopics: string[];
  estimatedHours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'active' | 'fast-track' | 'skipped' | 'diagnostic-check' | 'project-critical';
  statusBadge: string;
  isMilestone?: boolean;
  deliverable?: string;
  prerequisites: string[]; // Node IDs
  nextNodes: string[]; // Node IDs
  diagnosticQuestionRef?: string;
  isGoalNode?: boolean;
}

export interface FlowchartPhase {
  id: string;
  number: number;
  title: string;
  shortDesc: string;
  accentColor: string;
  badge: string;
}

export interface RoadmapFlowchartData {
  skillId: string;
  skillTitle: string;
  mode: RoadmapMode;
  modeTitle: string;
  modeSummary: string;
  totalHours: number;
  totalTopicsCount: number;
  speedRatioBadge: string;
  phases: FlowchartPhase[];
  nodes: FlowchartNode[];
}

export interface QuickBuildGoalOption {
  id: string;
  title: string;
  desc: string;
  targetDeliverable: string;
  estimatedHours: number;
  includedNodeIds: string[];
}

export const quickBuildGoalsMap: Record<string, QuickBuildGoalOption[]> = {
  'ui-ux-design': [
    {
      id: 'qb-figma-kit',
      title: 'Design System & Component Library',
      desc: 'Create an enterprise-ready Figma token system, button variants, and typographic scale.',
      targetDeliverable: 'Production Design System with Figma Variants & Tokens',
      estimatedHours: 20,
      includedNodeIds: ['ui-fnd-1', 'ui-grid-1', 'ui-tokens-1', 'ui-ds-sys-1'],
    },
    {
      id: 'qb-mobile-app',
      title: 'Fintech Mobile App Interactive Prototype',
      desc: 'Design high-converting mobile micro-flows, biometric onboarding, and usability-tested prototype.',
      targetDeliverable: 'Interactive 12-Screen Fintech Figma Prototype',
      estimatedHours: 24,
      includedNodeIds: ['ui-res-1', 'ui-wire-1', 'ui-proto-1', 'ui-test-1'],
    },
    {
      id: 'qb-saas-audit',
      title: 'SaaS Analytics Dashboard UI Kit',
      desc: 'Build dense data tables, responsive chart cards, and ethical dark-pattern prevention.',
      targetDeliverable: 'High-Density Responsive Analytics Dashboard',
      estimatedHours: 22,
      includedNodeIds: ['ui-grid-1', 'ui-wire-1', 'ui-ds-sys-1', 'ui-audit-1'],
    },
  ],
  'web-dev': [
    {
      id: 'qb-portfolio',
      title: 'Interactive Developer Portfolio',
      desc: 'Build and deploy a responsive high-impact portfolio with modern CSS and dynamic projects.',
      targetDeliverable: 'Live Deployed Interactive Portfolio Site',
      estimatedHours: 22,
      includedNodeIds: ['web-html-1', 'web-css-1', 'web-js-core', 'web-deploy-1'],
    },
    {
      id: 'qb-saas',
      title: 'Full-Stack Cloud Notes & Auth SaaS',
      desc: 'Direct path to React components, Firebase authentication, and real-time cloud data.',
      targetDeliverable: 'Live Cloud SaaS Application with Auth & Firestore',
      estimatedHours: 32,
      includedNodeIds: ['web-js-core', 'web-react-core', 'web-auth-1', 'web-deploy-1'],
    },
    {
      id: 'qb-dashboard',
      title: 'Real-time Analytical Dashboard',
      desc: 'Focused pipeline for REST API data consumption, chart rendering, and state management.',
      targetDeliverable: 'Real-Time Live Chart Analytics Dashboard',
      estimatedHours: 26,
      includedNodeIds: ['web-js-core', 'web-react-core', 'web-api-1', 'web-deploy-1'],
    },
  ],
  'python-dev': [
    {
      id: 'qb-py-automation',
      title: 'Automated Web Scraper & Report Generator',
      desc: 'Build automated web crawlers that extract tabular datasets and dispatch scheduled email reports.',
      targetDeliverable: 'Automated Multi-Source Scraper with CSV & Email Output',
      estimatedHours: 18,
      includedNodeIds: ['py-syn-1', 'py-ds-1', 'py-io-1', 'py-scrap-1'],
    },
    {
      id: 'qb-py-api',
      title: 'RESTful Backend API Service',
      desc: 'Design high-speed RESTful microservices with FastAPI, validation models, and ORM database persistence.',
      targetDeliverable: 'Production FastAPI Microservice with JWT Auth & Postgres',
      estimatedHours: 28,
      includedNodeIds: ['py-syn-1', 'py-oop-1', 'py-api-1', 'py-db-1'],
    },
  ],
  'data-analysis': [
    {
      id: 'qb-eda-exec',
      title: 'Executive Sales & Churn Analytics Dashboard',
      desc: 'Wrangle messy enterprise tabular logs with Pandas and formulate executive KPIs.',
      targetDeliverable: 'Interactive Streamlit Executive Insights Dashboard',
      estimatedHours: 24,
      includedNodeIds: ['da-clean-1', 'da-pandas-1', 'da-viz-1', 'da-story-1'],
    },
    {
      id: 'qb-ml-churn',
      title: 'Customer Churn Machine Learning Classifier',
      desc: 'Formulate predictive feature pipelines, train regression models, and quantify ROI impact.',
      targetDeliverable: 'Deployed Scikit-Learn Predictive Model API',
      estimatedHours: 30,
      includedNodeIds: ['da-pandas-1', 'da-stat-1', 'da-ml-1', 'da-story-1'],
    },
  ],
  'cloud-devops': [
    {
      id: 'qb-docker-cicd',
      title: 'Containerized CI/CD Automated Pipeline',
      desc: 'Package full-stack web services into secure Docker containers with GitHub Actions automation.',
      targetDeliverable: 'Production GitHub Actions CI/CD Pipeline with Docker',
      estimatedHours: 25,
      includedNodeIds: ['cld-linux-1', 'cld-docker-1', 'cld-cicd-1', 'cld-deploy-1'],
    },
  ],
};

// Generates roadmap flowchart graph per skill and roadmap mode
export function getRoadmapFlowchart(
  skillId: string,
  mode: RoadmapMode,
  selectedGoalId?: string
): RoadmapFlowchartData {
  switch (skillId) {
    case 'ui-ux-design':
      return getUiUxFlowchart(mode, selectedGoalId);
    case 'python-dev':
      return getPythonFlowchart(mode, selectedGoalId);
    case 'data-analysis':
      return getDataAnalysisFlowchart(mode, selectedGoalId);
    case 'cloud-devops':
      return getCloudDevopsFlowchart(mode, selectedGoalId);
    case 'web-dev':
    default:
      return getWebDevFlowchart(mode, selectedGoalId);
  }
}

// -------------------------------------------------------------
// UI / UX DESIGN FLOWCHART GENERATOR
// -------------------------------------------------------------
function getUiUxFlowchart(mode: RoadmapMode, selectedGoalId?: string): RoadmapFlowchartData {
  const phases: FlowchartPhase[] = [
    {
      id: 'ui-p1',
      number: 1,
      title: 'Stage 1: Discovery & Research',
      shortDesc: 'Empathy mapping, user interviews, POV statements & journey flows.',
      accentColor: 'from-pink-500 to-rose-500',
      badge: 'Discovery Gate',
    },
    {
      id: 'ui-p2',
      number: 2,
      title: 'Stage 2: Information Architecture & Wireframes',
      shortDesc: 'Card sorting, low-fidelity wireframing, and micro-flow validation.',
      accentColor: 'from-amber-500 to-orange-500',
      badge: 'Structural Core',
    },
    {
      id: 'ui-p3',
      number: 3,
      title: 'Stage 3: Visual Design & Token Systems',
      shortDesc: '8pt grid systems, WCAG accessible contrast, typography and tokens.',
      accentColor: 'from-purple-500 to-indigo-600',
      badge: 'Design Systems',
    },
    {
      id: 'ui-p4',
      number: 4,
      title: 'Stage 4: Prototyping & Usability Testing',
      shortDesc: 'Figma interactive components, user testing loops, and dev handoff specs.',
      accentColor: 'from-emerald-500 to-teal-600',
      badge: 'Handoff & Ship',
    },
  ];

  // Base raw nodes
  const allNodes: FlowchartNode[] = [
    {
      id: 'ui-fnd-1',
      title: 'Design Thinking & UX Mindset',
      phaseId: 'ui-p1',
      phaseName: 'Stage 1: Discovery & Research',
      phaseNumber: 1,
      description: 'Understanding user pain points, problem framing, and divergent thinking versus convergent synthesis.',
      keyTopics: ['Human-Centered Design', 'Double Diamond Framework', 'Problem Framing'],
      estimatedHours: 5,
      difficulty: 'Beginner',
      status: 'active',
      statusBadge: 'Core Foundation',
      prerequisites: [],
      nextNodes: ['ui-res-1'],
    },
    {
      id: 'ui-res-1',
      title: 'User Personas & POV Synthesis',
      phaseId: 'ui-p1',
      phaseName: 'Stage 1: Discovery & Research',
      phaseNumber: 1,
      description: 'Conducting qualitative user interviews, formulating empathy maps, and distilling personas.',
      keyTopics: ['Empathy Maps', 'Jobs To Be Done (JTBD)', 'Journey Mapping'],
      estimatedHours: 6,
      difficulty: 'Beginner',
      status: 'active',
      statusBadge: 'User Research',
      prerequisites: ['ui-fnd-1'],
      nextNodes: ['ui-ia-1', 'ui-wire-1'],
    },
    {
      id: 'ui-ia-1',
      title: 'Information Architecture & Sitemap',
      phaseId: 'ui-p2',
      phaseName: 'Stage 2: Information Architecture & Wireframes',
      phaseNumber: 2,
      description: 'Hierarchical navigation structures, card sorting experiments, and mental model alignment.',
      keyTopics: ['Card Sorting', 'Taxonomy', 'User Navigation Flows'],
      estimatedHours: 6,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'Structural',
      prerequisites: ['ui-res-1'],
      nextNodes: ['ui-wire-1'],
    },
    {
      id: 'ui-wire-1',
      title: 'Low-to-Mid Fidelity Wireframing',
      phaseId: 'ui-p2',
      phaseName: 'Stage 2: Information Architecture & Wireframes',
      phaseNumber: 2,
      description: 'Rapid paper sketches to Figma wireframes testing visual hierarchy before applying colors or styling.',
      keyTopics: ['Visual Hierarchy', 'Content Blocks', 'Fitts Law Touch Targets'],
      estimatedHours: 8,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'Wireframing',
      prerequisites: ['ui-res-1', 'ui-ia-1'],
      nextNodes: ['ui-grid-1'],
    },
    {
      id: 'ui-grid-1',
      title: 'Visual Hierarchy & 8pt Grid System',
      phaseId: 'ui-p3',
      phaseName: 'Stage 3: Visual Design & Token Systems',
      phaseNumber: 3,
      description: 'Master mathematical spacing cadences, 8pt spatial scales, and responsive baseline alignment.',
      keyTopics: ['8pt Grid', 'Fluid Layouts', 'White Space Rhythms'],
      estimatedHours: 7,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'Layout Mastery',
      prerequisites: ['ui-wire-1'],
      nextNodes: ['ui-tokens-1', 'ui-ds-sys-1'],
    },
    {
      id: 'ui-tokens-1',
      title: 'Typography & WCAG Accessible Color',
      phaseId: 'ui-p3',
      phaseName: 'Stage 3: Visual Design & Token Systems',
      phaseNumber: 3,
      description: 'Modular scale typography, WCAG AAA/AA 4.5:1 color contrast, and dark mode palettes.',
      keyTopics: ['Type Modular Scale', 'WCAG 2.1 Contrast', 'Semantic Color Roles'],
      estimatedHours: 7,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'Accessibility Gate',
      prerequisites: ['ui-grid-1'],
      nextNodes: ['ui-ds-sys-1', 'ui-proto-1'],
    },
    {
      id: 'ui-ds-sys-1',
      title: 'Design Systems & Component Architecture',
      phaseId: 'ui-p3',
      phaseName: 'Stage 3: Visual Design & Token Systems',
      phaseNumber: 3,
      description: 'Atomic design, nested Figma auto-layout components, variants, and design token naming systems.',
      keyTopics: ['Figma Variants', 'Design Tokens', 'Atomic Design Methodology'],
      estimatedHours: 10,
      difficulty: 'Advanced',
      status: 'active',
      statusBadge: 'Design System',
      isMilestone: true,
      deliverable: 'Reusable Multi-Theme Component Library',
      prerequisites: ['ui-grid-1', 'ui-tokens-1'],
      nextNodes: ['ui-proto-1', 'ui-audit-1'],
    },
    {
      id: 'ui-proto-1',
      title: 'High-Fidelity Interactive Prototyping',
      phaseId: 'ui-p4',
      phaseName: 'Stage 4: Prototyping & Usability Testing',
      phaseNumber: 4,
      description: 'Craft smart animated transitions, micro-interactions, modal overlays, and touch gestures.',
      keyTopics: ['Smart Animate', 'Micro-Interactions', 'Interactive States'],
      estimatedHours: 8,
      difficulty: 'Advanced',
      status: 'active',
      statusBadge: 'Interactive Prototype',
      prerequisites: ['ui-ds-sys-1', 'ui-tokens-1'],
      nextNodes: ['ui-test-1'],
    },
    {
      id: 'ui-test-1',
      title: 'Usability Testing & Heuristic Review',
      phaseId: 'ui-p4',
      phaseName: 'Stage 4: Prototyping & Usability Testing',
      phaseNumber: 4,
      description: 'Nielsen Norman 10 Heuristics, unmoderated user testing sessions, and SUS scoring synthesis.',
      keyTopics: ['10 Heuristics', 'System Usability Scale (SUS)', 'Iterative Refinement'],
      estimatedHours: 6,
      difficulty: 'Advanced',
      status: 'active',
      statusBadge: 'Validation Gate',
      prerequisites: ['ui-proto-1'],
      nextNodes: ['ui-audit-1'],
    },
    {
      id: 'ui-audit-1',
      title: 'Ethical UX & Production Developer Handoff',
      phaseId: 'ui-p4',
      phaseName: 'Stage 4: Prototyping & Usability Testing',
      phaseNumber: 4,
      description: 'Dark-pattern prevention, accessibility inspection, redlining, and Figma-to-code token handoff.',
      keyTopics: ['Dark Pattern Defense', 'Handoff Documentation', 'Design Token JSON'],
      estimatedHours: 8,
      difficulty: 'Advanced',
      status: 'active',
      statusBadge: 'Production Capstone',
      isMilestone: true,
      deliverable: 'Complete Deployed Case Study & Design System',
      prerequisites: ['ui-test-1', 'ui-ds-sys-1'],
      nextNodes: [],
    },
  ];

  return buildFlowchartForMode(
    'ui-ux-design',
    'UI/UX & Product Design',
    mode,
    phases,
    allNodes,
    selectedGoalId
  );
}

// -------------------------------------------------------------
// WEB DEVELOPMENT FLOWCHART GENERATOR
// -------------------------------------------------------------
function getWebDevFlowchart(mode: RoadmapMode, selectedGoalId?: string): RoadmapFlowchartData {
  const phases: FlowchartPhase[] = [
    {
      id: 'web-p1',
      number: 1,
      title: 'Stage 1: Semantic Foundations & Layout',
      shortDesc: 'Semantic HTML5, accessible forms, modern CSS Flexbox and Grid engines.',
      accentColor: 'from-blue-500 to-cyan-500',
      badge: 'Core Engine',
    },
    {
      id: 'web-p2',
      number: 2,
      title: 'Stage 2: JavaScript ES6+ & DOM Logic',
      shortDesc: 'Variables, array methods, event listeners, async/await, and APIs.',
      accentColor: 'from-amber-500 to-yellow-600',
      badge: 'Logic & Runtime',
    },
    {
      id: 'web-p3',
      number: 3,
      title: 'Stage 3: React Architecture & State',
      shortDesc: 'Functional components, hooks, props flow, Tailwind styling, and routing.',
      accentColor: 'from-indigo-600 to-purple-600',
      badge: 'Modern SPA',
    },
    {
      id: 'web-p4',
      number: 4,
      title: 'Stage 4: Cloud Services, Auth & Deployment',
      shortDesc: 'Firebase Authentication, Cloud Firestore, serverless APIs, and production build.',
      accentColor: 'from-emerald-500 to-teal-600',
      badge: 'Production Ship',
    },
  ];

  const allNodes: FlowchartNode[] = [
    {
      id: 'web-html-1',
      title: 'Semantic HTML5 & Accessibility (A11y)',
      phaseId: 'web-p1',
      phaseName: 'Stage 1: Semantic Foundations & Layout',
      phaseNumber: 1,
      description: 'Document outline, landmark roles, forms, inputs, and accessible screen-reader tags.',
      keyTopics: ['<header>, <nav>, <main>', 'ARIA attributes', 'Accessible Forms'],
      estimatedHours: 8,
      difficulty: 'Beginner',
      status: 'active',
      statusBadge: 'Foundations',
      prerequisites: [],
      nextNodes: ['web-css-1'],
    },
    {
      id: 'web-css-1',
      title: 'Modern CSS, Flexbox & CSS Grid',
      phaseId: 'web-p1',
      phaseName: 'Stage 1: Semantic Foundations & Layout',
      phaseNumber: 1,
      description: 'Fluid 1D and 2D layout mechanics, responsive media queries, CSS variables, and transitions.',
      keyTopics: ['Flexbox 1D', 'CSS Grid 2D', 'Responsive Breakpoints', 'Tailwind Utilities'],
      estimatedHours: 12,
      difficulty: 'Beginner',
      status: 'active',
      statusBadge: 'Styling Core',
      prerequisites: ['web-html-1'],
      nextNodes: ['web-js-core'],
    },
    {
      id: 'web-js-core',
      title: 'Modern JavaScript (ES6+) & DOM',
      phaseId: 'web-p2',
      phaseName: 'Stage 2: JavaScript ES6+ & DOM Logic',
      phaseNumber: 2,
      description: 'Arrow functions, destructuring, higher-order array methods (map, filter, reduce), and DOM events.',
      keyTopics: ['ES6 Syntax', 'Array Methods', 'Event Loop', 'DOM Manipulation'],
      estimatedHours: 15,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'Programming Logic',
      prerequisites: ['web-css-1'],
      nextNodes: ['web-api-1', 'web-react-core'],
    },
    {
      id: 'web-api-1',
      title: 'Asynchronous JS, Fetch & REST APIs',
      phaseId: 'web-p2',
      phaseName: 'Stage 2: JavaScript ES6+ & DOM Logic',
      phaseNumber: 2,
      description: 'Promises, async/await pipelines, HTTP status codes, JSON parsing, and error handling.',
      keyTopics: ['fetch() API', 'async/await', 'Error Boundaries', 'REST Standards'],
      estimatedHours: 10,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'Data Flow',
      prerequisites: ['web-js-core'],
      nextNodes: ['web-react-core'],
    },
    {
      id: 'web-react-core',
      title: 'React Fundamentals & Component State',
      phaseId: 'web-p3',
      phaseName: 'Stage 3: React Architecture & State',
      phaseNumber: 3,
      description: 'JSX syntax, component tree hierarchy, useState, useEffect, props contract, and re-rendering.',
      keyTopics: ['Component Tree', 'useState Hook', 'useEffect Dependencies', 'Synthetic Events'],
      estimatedHours: 18,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'Frontend Framework',
      prerequisites: ['web-js-core', 'web-api-1'],
      nextNodes: ['web-state-arch', 'web-auth-1'],
    },
    {
      id: 'web-state-arch',
      title: 'Advanced State Architecture & Custom Hooks',
      phaseId: 'web-p3',
      phaseName: 'Stage 3: React Architecture & State',
      phaseNumber: 3,
      description: 'Context API, custom hooks abstraction, memoization (useMemo/useCallback), and performance tuning.',
      keyTopics: ['Context API', 'Custom Hooks', 'useMemo / useCallback', 'State Machine Patterns'],
      estimatedHours: 14,
      difficulty: 'Advanced',
      status: 'active',
      statusBadge: 'Architecture',
      prerequisites: ['web-react-core'],
      nextNodes: ['web-auth-1', 'web-deploy-1'],
    },
    {
      id: 'web-auth-1',
      title: 'Cloud Authentication & Firestore Database',
      phaseId: 'web-p4',
      phaseName: 'Stage 4: Cloud Services, Auth & Deployment',
      phaseNumber: 4,
      description: 'Secure client-side authentication, real-time NoSQL Firestore querying, and security rules.',
      keyTopics: ['Firebase Auth', 'Firestore Real-time Subscriptions', 'Security Rules'],
      estimatedHours: 14,
      difficulty: 'Advanced',
      status: 'active',
      statusBadge: 'Cloud Backend',
      prerequisites: ['web-react-core', 'web-state-arch'],
      nextNodes: ['web-deploy-1'],
    },
    {
      id: 'web-deploy-1',
      title: 'Production Build, CI/CD & Cloud Deployment',
      phaseId: 'web-p4',
      phaseName: 'Stage 4: Cloud Services, Auth & Deployment',
      phaseNumber: 4,
      description: 'Vite production bundler, tree-shaking, automated deployment pipelines, and custom domain hosting.',
      keyTopics: ['Vite Production Build', 'Environment Variables', 'CDN Hosting', 'Lighthouse Audit'],
      estimatedHours: 10,
      difficulty: 'Advanced',
      status: 'active',
      statusBadge: 'Capstone Release',
      isMilestone: true,
      deliverable: 'Live Deployed Full-Stack Web Application',
      prerequisites: ['web-auth-1', 'web-state-arch'],
      nextNodes: [],
    },
  ];

  return buildFlowchartForMode(
    'web-dev',
    'Web Development',
    mode,
    phases,
    allNodes,
    selectedGoalId
  );
}

// -------------------------------------------------------------
// PYTHON PROGRAMMING FLOWCHART GENERATOR
// -------------------------------------------------------------
function getPythonFlowchart(mode: RoadmapMode, selectedGoalId?: string): RoadmapFlowchartData {
  const phases: FlowchartPhase[] = [
    {
      id: 'py-p1',
      number: 1,
      title: 'Stage 1: Core Syntax & Data Structures',
      shortDesc: 'Variables, conditionals, loops, lists, dictionaries, tuples, and sets.',
      accentColor: 'from-amber-500 to-emerald-600',
      badge: 'Syntax Core',
    },
    {
      id: 'py-p2',
      number: 2,
      title: 'Stage 2: OOP & Modular Architecture',
      shortDesc: 'Classes, inheritance, encapsulation, file I/O, and virtual environments.',
      accentColor: 'from-teal-500 to-cyan-600',
      badge: 'Object Models',
    },
    {
      id: 'py-p3',
      number: 3,
      title: 'Stage 3: Web Scraping & Automation Pipelines',
      shortDesc: 'HTTP requests, BeautifulSoup parsing, CSV automation, and scheduled workers.',
      accentColor: 'from-blue-600 to-indigo-600',
      badge: 'Automation',
    },
    {
      id: 'py-p4',
      number: 4,
      title: 'Stage 4: Backend API & Microservices',
      shortDesc: 'FastAPI routes, Pydantic data schemas, SQLAlchemy ORM, and cloud hosting.',
      accentColor: 'from-purple-600 to-rose-600',
      badge: 'Microservices',
    },
  ];

  const allNodes: FlowchartNode[] = [
    {
      id: 'py-syn-1',
      title: 'Python Syntax, Control Flow & Functions',
      phaseId: 'py-p1',
      phaseName: 'Stage 1: Core Syntax & Data Structures',
      phaseNumber: 1,
      description: 'Pythonic conventions, dynamic typing, if/elif logic, while/for loops, and pure functions.',
      keyTopics: ['PEP 8 Style', 'List Comprehensions', 'Function Signatures', 'Scope'],
      estimatedHours: 8,
      difficulty: 'Beginner',
      status: 'active',
      statusBadge: 'Syntax Fundamentals',
      prerequisites: [],
      nextNodes: ['py-ds-1'],
    },
    {
      id: 'py-ds-1',
      title: 'Data Structures: Lists, Dicts & Sets',
      phaseId: 'py-p1',
      phaseName: 'Stage 1: Core Syntax & Data Structures',
      phaseNumber: 1,
      description: 'Hash-map lookups, dictionary operations, nested data parsing, and algorithmic time complexity.',
      keyTopics: ['Dict Operations', 'Tuples & Sets', 'Slicing & Sorting'],
      estimatedHours: 10,
      difficulty: 'Beginner',
      status: 'active',
      statusBadge: 'Data Structures',
      prerequisites: ['py-syn-1'],
      nextNodes: ['py-oop-1', 'py-io-1'],
    },
    {
      id: 'py-oop-1',
      title: 'Object-Oriented Programming & Classes',
      phaseId: 'py-p2',
      phaseName: 'Stage 2: OOP & Modular Architecture',
      phaseNumber: 2,
      description: 'Class declarations, self instance methods, dunder methods (__init__, __str__), and inheritance.',
      keyTopics: ['Classes & Objects', 'Encapsulation', 'Dunder Methods', 'Polymorphism'],
      estimatedHours: 12,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'OOP Systems',
      prerequisites: ['py-ds-1'],
      nextNodes: ['py-api-1'],
    },
    {
      id: 'py-io-1',
      title: 'File I/O, Error Handling & Virtual Environments',
      phaseId: 'py-p2',
      phaseName: 'Stage 2: OOP & Modular Architecture',
      phaseNumber: 2,
      description: 'Context managers (with open), try/except/finally blocks, pipenv/venv package isolation.',
      keyTopics: ['Context Managers', 'Exception Handling', 'Virtual Environments', 'JSON/CSV I/O'],
      estimatedHours: 8,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'File Systems',
      prerequisites: ['py-ds-1'],
      nextNodes: ['py-scrap-1'],
    },
    {
      id: 'py-scrap-1',
      title: 'Automated Web Scraping & Crawlers',
      phaseId: 'py-p3',
      phaseName: 'Stage 3: Web Scraping & Automation Pipelines',
      phaseNumber: 3,
      description: 'Requests library, header spoofing, BeautifulSoup HTML parsing, and structured data storage.',
      keyTopics: ['Requests API', 'BeautifulSoup4', 'Rate Limiting & Ethics', 'Headless Crawling'],
      estimatedHours: 12,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'Web Crawlers',
      prerequisites: ['py-io-1'],
      nextNodes: ['py-api-1', 'py-db-1'],
    },
    {
      id: 'py-api-1',
      title: 'FastAPI Backend Microservices',
      phaseId: 'py-p4',
      phaseName: 'Stage 4: Backend API & Microservices',
      phaseNumber: 4,
      description: 'Modern asynchronous REST API construction, Pydantic type validation, Swagger documentation.',
      keyTopics: ['FastAPI Framework', 'Pydantic Schemas', 'Async Endpoints', 'Dependency Injection'],
      estimatedHours: 15,
      difficulty: 'Advanced',
      status: 'active',
      statusBadge: 'Backend Engine',
      prerequisites: ['py-oop-1', 'py-scrap-1'],
      nextNodes: ['py-db-1'],
    },
    {
      id: 'py-db-1',
      title: 'SQLAlchemy ORM & Cloud Database Persistence',
      phaseId: 'py-p4',
      phaseName: 'Stage 4: Backend API & Microservices',
      phaseNumber: 4,
      description: 'Relational database modeling with PostgreSQL/SQLite, database migrations with Alembic, and JWT auth.',
      keyTopics: ['SQLAlchemy Models', 'Database Migrations', 'JWT Authentication', 'Dockerized Cloud Deployment'],
      estimatedHours: 14,
      difficulty: 'Advanced',
      status: 'active',
      statusBadge: 'Production Release',
      isMilestone: true,
      deliverable: 'Live Production FastAPI & Postgres Service',
      prerequisites: ['py-api-1'],
      nextNodes: [],
    },
  ];

  return buildFlowchartForMode(
    'python-dev',
    'Python Programming',
    mode,
    phases,
    allNodes,
    selectedGoalId
  );
}

// -------------------------------------------------------------
// DATA ANALYSIS FLOWCHART GENERATOR
// -------------------------------------------------------------
function getDataAnalysisFlowchart(mode: RoadmapMode, selectedGoalId?: string): RoadmapFlowchartData {
  const phases: FlowchartPhase[] = [
    {
      id: 'da-p1',
      number: 1,
      title: 'Stage 1: Tabular Foundations & Cleaning',
      shortDesc: 'Pandas dataframes, missing value imputation, and anomaly detection.',
      accentColor: 'from-purple-500 to-pink-500',
      badge: 'Data Wrangling',
    },
    {
      id: 'da-p2',
      number: 2,
      title: 'Stage 2: Exploratory Data Analysis (EDA)',
      shortDesc: 'Distribution profiling, grouping, aggregation, and hypothesis testing.',
      accentColor: 'from-indigo-500 to-blue-600',
      badge: 'EDA Core',
    },
    {
      id: 'da-p3',
      number: 3,
      title: 'Stage 3: Visual Analytics & Storytelling',
      shortDesc: 'Plotly interactive charts, dashboard layout, and executive insights.',
      accentColor: 'from-amber-500 to-orange-600',
      badge: 'Visualization',
    },
    {
      id: 'da-p4',
      number: 4,
      title: 'Stage 4: Predictive Modeling & Production',
      shortDesc: 'Feature engineering, Scikit-learn regression, classification, and deployment.',
      accentColor: 'from-emerald-500 to-teal-600',
      badge: 'Predictive ML',
    },
  ];

  const allNodes: FlowchartNode[] = [
    {
      id: 'da-clean-1',
      title: 'Data Cleaning & Wrangling with Pandas',
      phaseId: 'da-p1',
      phaseName: 'Stage 1: Tabular Foundations & Cleaning',
      phaseNumber: 1,
      description: 'Handling nulls, type coercions, string regex transforms, and deduplication.',
      keyTopics: ['DataFrame Indexing', 'Null Imputation', 'Data Transformation'],
      estimatedHours: 10,
      difficulty: 'Beginner',
      status: 'active',
      statusBadge: 'Data Wrangling',
      prerequisites: [],
      nextNodes: ['da-pandas-1'],
    },
    {
      id: 'da-pandas-1',
      title: 'Aggregation, Merging & Pivot Tables',
      phaseId: 'da-p1',
      phaseName: 'Stage 1: Tabular Foundations & Cleaning',
      phaseNumber: 1,
      description: 'Groupby pipelines, multi-table SQL-like joins, and pivot table reshapes.',
      keyTopics: ['groupby() & agg()', 'pd.merge() joins', 'Pivot Tables'],
      estimatedHours: 12,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'Tabular Processing',
      prerequisites: ['da-clean-1'],
      nextNodes: ['da-stat-1', 'da-viz-1'],
    },
    {
      id: 'da-stat-1',
      title: 'Statistical Testing & Probability Reasoning',
      phaseId: 'da-p2',
      phaseName: 'Stage 2: Exploratory Data Analysis (EDA)',
      phaseNumber: 2,
      description: 'Hypothesis testing (p-values, t-tests, chi-square), correlation vs causation, and A/B test analysis.',
      keyTopics: ['Normal Distributions', 'Hypothesis Testing', 'Confidence Intervals'],
      estimatedHours: 14,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'Statistical Gate',
      prerequisites: ['da-pandas-1'],
      nextNodes: ['da-viz-1', 'da-ml-1'],
    },
    {
      id: 'da-viz-1',
      title: 'Interactive Visual Analytics & Dashboards',
      phaseId: 'da-p3',
      phaseName: 'Stage 3: Visual Analytics & Storytelling',
      phaseNumber: 3,
      description: 'Interactive visualization with Plotly, Seaborn statistical charts, and Streamlit dashboard apps.',
      keyTopics: ['Plotly Express', 'Color Encoding', 'Streamlit UI Dashboards'],
      estimatedHours: 14,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'Visual Storytelling',
      prerequisites: ['da-pandas-1', 'da-stat-1'],
      nextNodes: ['da-story-1'],
    },
    {
      id: 'da-story-1',
      title: 'Executive Insights & Actionable KPI Reports',
      phaseId: 'da-p3',
      phaseName: 'Stage 3: Visual Analytics & Storytelling',
      phaseNumber: 3,
      description: 'Translating quantitative metrics into business decisions, ROI calculations, and executive slide decks.',
      keyTopics: ['Executive Summaries', 'North Star Metrics', 'Cohort Retention'],
      estimatedHours: 10,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'Business Synthesis',
      prerequisites: ['da-viz-1'],
      nextNodes: ['da-ml-1'],
    },
    {
      id: 'da-ml-1',
      title: 'Predictive Feature Engineering & Machine Learning',
      phaseId: 'da-p4',
      phaseName: 'Stage 4: Predictive Modeling & Production',
      phaseNumber: 4,
      description: 'Scikit-learn classification & regression models, cross-validation, and model metrics (ROC-AUC).',
      keyTopics: ['Feature Scaling', 'Cross-Validation', 'Scikit-Learn Pipelines'],
      estimatedHours: 18,
      difficulty: 'Advanced',
      status: 'active',
      statusBadge: 'Machine Learning Capstone',
      isMilestone: true,
      deliverable: 'Deployed Predictive Customer Churn Analytics Model',
      prerequisites: ['da-stat-1', 'da-story-1'],
      nextNodes: [],
    },
  ];

  return buildFlowchartForMode(
    'data-analysis',
    'Data Analysis & Insights',
    mode,
    phases,
    allNodes,
    selectedGoalId
  );
}

// -------------------------------------------------------------
// CLOUD & DEVOPS FLOWCHART GENERATOR
// -------------------------------------------------------------
function getCloudDevopsFlowchart(mode: RoadmapMode, selectedGoalId?: string): RoadmapFlowchartData {
  const phases: FlowchartPhase[] = [
    {
      id: 'cld-p1',
      number: 1,
      title: 'Stage 1: Linux & Networking Foundations',
      shortDesc: 'Bash scripting, file permissions, SSH keys, TCP/IP, and reverse proxies.',
      accentColor: 'from-blue-600 to-indigo-700',
      badge: 'Linux Core',
    },
    {
      id: 'cld-p2',
      number: 2,
      title: 'Stage 2: Containerization with Docker',
      shortDesc: 'Dockerfiles, multi-stage builds, docker-compose, and volume networking.',
      accentColor: 'from-cyan-500 to-blue-600',
      badge: 'Containers',
    },
    {
      id: 'cld-p3',
      number: 3,
      title: 'Stage 3: CI/CD Pipelines & Automation',
      shortDesc: 'GitHub Actions, automated testing, container registry push, and security scanning.',
      accentColor: 'from-amber-500 to-emerald-600',
      badge: 'CI/CD Automation',
    },
    {
      id: 'cld-p4',
      number: 4,
      title: 'Stage 4: Cloud Infrastructure & Observability',
      shortDesc: 'Terraform IaC, Kubernetes clusters, Prometheus metrics, and Grafana dashboards.',
      accentColor: 'from-purple-600 to-rose-600',
      badge: 'Cloud Orchestration',
    },
  ];

  const allNodes: FlowchartNode[] = [
    {
      id: 'cld-linux-1',
      title: 'Linux Systems, Bash & Networking',
      phaseId: 'cld-p1',
      phaseName: 'Stage 1: Linux & Networking Foundations',
      phaseNumber: 1,
      description: 'Command line fluency, SSH keys, permissions, systemd services, and DNS/TLS networking.',
      keyTopics: ['Bash Scripting', 'SSH / Keypairs', 'systemd', 'DNS & Reverse Proxies'],
      estimatedHours: 12,
      difficulty: 'Beginner',
      status: 'active',
      statusBadge: 'Linux Systems',
      prerequisites: [],
      nextNodes: ['cld-docker-1'],
    },
    {
      id: 'cld-docker-1',
      title: 'Docker Containerization & Multi-Stage Builds',
      phaseId: 'cld-p2',
      phaseName: 'Stage 2: Containerization with Docker',
      phaseNumber: 2,
      description: 'Creating lightweight Docker images, optimizing layer caching, multi-container docker-compose.',
      keyTopics: ['Dockerfile Syntax', 'Multi-Stage Builds', 'docker-compose', 'Networking Bridges'],
      estimatedHours: 16,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'Containers',
      prerequisites: ['cld-linux-1'],
      nextNodes: ['cld-cicd-1'],
    },
    {
      id: 'cld-cicd-1',
      title: 'GitHub Actions & Automated Testing CI/CD',
      phaseId: 'cld-p3',
      phaseName: 'Stage 3: CI/CD Pipelines & Automation',
      phaseNumber: 3,
      description: 'Automated test execution, linting gates, automated semantic versioning, and secure Docker registry pushing.',
      keyTopics: ['GitHub Actions Workflows', 'Secrets Management', 'Docker Hub / Artifact Registry'],
      estimatedHours: 16,
      difficulty: 'Intermediate',
      status: 'active',
      statusBadge: 'Automated CI/CD',
      prerequisites: ['cld-docker-1'],
      nextNodes: ['cld-deploy-1', 'cld-iac-1'],
    },
    {
      id: 'cld-iac-1',
      title: 'Infrastructure as Code (IaC) with Terraform',
      phaseId: 'cld-p4',
      phaseName: 'Stage 4: Cloud Infrastructure & Observability',
      phaseNumber: 4,
      description: 'Declarative cloud provisioning, state management, VPCs, subnets, and IAM least privilege.',
      keyTopics: ['Terraform HCL', 'Remote State', 'IAM & Cloud Security', 'VPC Networking'],
      estimatedHours: 18,
      difficulty: 'Advanced',
      status: 'active',
      statusBadge: 'Terraform IaC',
      prerequisites: ['cld-cicd-1'],
      nextNodes: ['cld-deploy-1'],
    },
    {
      id: 'cld-deploy-1',
      title: 'Kubernetes Orchestration & Observability',
      phaseId: 'cld-p4',
      phaseName: 'Stage 4: Cloud Infrastructure & Observability',
      phaseNumber: 4,
      description: 'Deploying pods, services, ingress controllers, Prometheus monitoring, and Grafana alerts.',
      keyTopics: ['K8s Deployments & Services', 'Ingress & TLS', 'Prometheus & Grafana'],
      estimatedHours: 22,
      difficulty: 'Advanced',
      status: 'active',
      statusBadge: 'Production DevOps Capstone',
      isMilestone: true,
      deliverable: 'Automated Multi-Service Cluster Deployment with CI/CD',
      prerequisites: ['cld-cicd-1', 'cld-iac-1'],
      nextNodes: [],
    },
  ];

  return buildFlowchartForMode(
    'cloud-devops',
    'Cloud & DevOps Engineering',
    mode,
    phases,
    allNodes,
    selectedGoalId
  );
}

// -------------------------------------------------------------
// FLOWCHART BUILDER ENGINE FOR MODES (NORMAL, ADVANCED, SMART, QUICK BUILD)
// -------------------------------------------------------------
function buildFlowchartForMode(
  skillId: string,
  skillTitle: string,
  mode: RoadmapMode,
  phases: FlowchartPhase[],
  baseNodes: FlowchartNode[],
  selectedGoalId?: string
): RoadmapFlowchartData {
  let modeTitle = 'Normal Roadmap (Mode A)';
  let modeSummary = 'Complete end-to-end curriculum. Step-by-step sequential and branch progression from ground fundamentals to production mastery.';
  let speedRatioBadge = '100% Comprehensive Coverage';

  // Deep clone nodes to allow per-mode transformations
  let nodes: FlowchartNode[] = JSON.parse(JSON.stringify(baseNodes));

  if (mode === 'advanced') {
    modeTitle = 'Advanced Fast-Track (Mode B)';
    modeSummary = 'Fast-tracked for experienced learners. Introductory syntax and basic theory are bypassed so you can jump straight to advanced architecture and systems.';
    speedRatioBadge = '~45% Accelerated Pace';

    // In advanced mode, the first 1 or 2 introductory nodes in Phase 1 are marked as skipped/fast-tracked
    nodes = nodes.map((node, idx) => {
      if (node.phaseNumber === 1 && idx < 2) {
        return {
          ...node,
          status: 'skipped',
          statusBadge: 'Fast-Track Skipped',
          description: `[Bypassed in Advanced Track] Assumes you already have fluency in ${node.title}. Focus shifted to downstream architecture.`,
        };
      }
      return {
        ...node,
        status: node.isMilestone ? 'active' : 'fast-track',
        statusBadge: node.isMilestone ? 'Senior Capstone' : 'Fast-Track Core',
      };
    });
  } else if (mode === 'smart') {
    modeTitle = 'Smart Diagnostic Roadmap (Mode C)';
    modeSummary = 'Adaptive curriculum based on diagnostic placement assessment. Proves your prior knowledge, bypasses verified competencies, and targets remaining gaps.';
    speedRatioBadge = 'Adaptive Knowledge Mapping';

    nodes = nodes.map((node, idx) => {
      if (idx === 0) {
        return {
          ...node,
          status: 'diagnostic-check',
          statusBadge: 'Diagnostic Verified',
          description: `Evaluated via Smart Diagnostic quiz. Verified as baseline competency; available for quick review.`,
        };
      }
      if (idx === 1 || idx === 2) {
        return {
          ...node,
          status: 'active',
          statusBadge: 'Target Focus Gap',
          description: `Key targeted growth area identified for high ROI based on prerequisite analysis.`,
        };
      }
      return {
        ...node,
        status: 'active',
        statusBadge: node.isMilestone ? 'Validated Capstone' : 'Upcoming Module',
      };
    });
  } else if (mode === 'quick_build') {
    modeTitle = 'Quick Build Goal Roadmap (Mode D)';
    modeSummary = 'Project-centered path. Distills the curriculum down to the minimum viable topics required to design, develop, and ship your target project.';
    speedRatioBadge = 'Goal-Optimized Critical Path';

    const goalOptions = quickBuildGoalsMap[skillId] || [];
    const activeGoal = goalOptions.find((g) => g.id === selectedGoalId) || goalOptions[0];

    const targetNodeIds = activeGoal ? activeGoal.includedNodeIds : [];

    nodes = nodes.map((node) => {
      const isCritical = targetNodeIds.includes(node.id) || node.isMilestone;
      if (isCritical) {
        return {
          ...node,
          status: 'project-critical',
          statusBadge: node.isMilestone ? 'Project Deliverable' : 'Critical Prerequisite',
          description: `Essential prerequisite to build "${activeGoal?.title || 'Target Project'}".`,
          isGoalNode: true,
        };
      }
      return {
        ...node,
        status: 'skipped',
        statusBadge: 'Deferred (Non-Essential)',
        description: `Bypassed in Quick Build mode to accelerate direct delivery of your target project.`,
        isGoalNode: false,
      };
    });
  }

  // Calculate active total hours and topic counts
  const activeNodes = nodes.filter((n) => n.status !== 'skipped');
  const totalHours = activeNodes.reduce((acc, curr) => acc + curr.estimatedHours, 0);

  return {
    skillId,
    skillTitle,
    mode,
    modeTitle,
    modeSummary,
    totalHours,
    totalTopicsCount: activeNodes.length,
    speedRatioBadge,
    phases,
    nodes,
  };
}
