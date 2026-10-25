import { World, PlacementQuestion } from '../types';

export const uiuxPlacementQuestions: PlacementQuestion[] = [
  {
    id: 'pq-ux-1',
    topic: 'Design Thinking & Empathy',
    question: 'What is the primary objective of creating a User Persona in UX research?',
    options: [
      'To represent an exact real-life individual with their personal address',
      'To create a composite archetype based on user research that embodies key user needs and goals',
      'To generate marketing copy for social media ads',
      'To decide the exact hexadecimal color palette for the brand',
    ],
    correctIndex: 1,
  },
  {
    id: 'pq-ux-2',
    topic: 'WCAG Accessibility Standards',
    question: 'According to WCAG 2.1 Level AA guidelines, what is the minimum contrast ratio required for normal body text?',
    options: ['3:1', '4.5:1', '7:1', '2:1'],
    correctIndex: 1,
  },
  {
    id: 'pq-ux-3',
    topic: 'Visual Hierarchy & Spacing',
    question: 'Why do modern UI design systems (like Material Design and Tailwind) utilize an 8pt / 4pt grid system?',
    options: [
      'Screens can only render pixel dimensions divisible by 8',
      'It creates consistent visual cadence, simplifies developer handoff, and aligns with standard screen pixel densities',
      'It reduces CSS bundle file size by 50%',
      'It is mandated by W3C browser specifications',
    ],
    correctIndex: 1,
  },
  {
    id: 'pq-ux-4',
    topic: 'Usability Heuristics',
    question: 'Nielsen’s first usability heuristic is "Visibility of System Status". Which UI element best satisfies this heuristic?',
    options: [
      'A decorative gradient banner at the bottom of the page',
      'A clear loading spinner, progress bar, or breadcrumb showing current location',
      'A copyright notice in the footer',
      'An auto-playing background video',
    ],
    correctIndex: 1,
  },
];

export const uiuxCurriculumWorlds: World[] = [
  {
    id: 'world-ux-1',
    number: 1,
    title: 'World 1: Design Thinking & User Research',
    shortDesc: 'Empathy mapping, user personas, problem statements, and qualitative research methods.',
    color: 'from-pink-600 to-rose-700',
    levels: [
      {
        id: 'lvl-ux-1-1',
        worldId: 'world-ux-1',
        title: 'Level 1: Problem Statements & Personas',
        order: 1,
        description: 'Understand user pain points, define POV statements, and construct user archetypes.',
        sublevels: [
          {
            id: 'sub-ux-1-1-1',
            levelId: 'lvl-ux-1-1',
            worldId: 'world-ux-1',
            title: '1.1 Interactive Persona Studio',
            order: 1,
            summary: 'Live experiment designing a user persona card with clear goals, frustrations, and core needs.',
            optionalResources: [
              {
                id: 'res-ux-1',
                title: 'Nielsen Norman Group: Persona Empathy Mapping Guide',
                type: 'article',
                provider: 'NN/g',
                url: 'https://www.nngroup.com/articles/empathy-mapping/',
                isFree: true,
                duration: '8 min read',
              },
              {
                id: 'res-ux-2',
                title: 'Interaction Design Foundation: Design Thinking Process',
                type: 'course',
                provider: 'IxDF',
                url: 'https://www.interaction-design.org/literature/topics/design-thinking',
                isFree: true,
                duration: '12 min read',
              },
            ],
            activities: [
              {
                id: 'act-ux-1-1-1',
                sublevelId: 'sub-ux-1-1-1',
                title: 'Persona Card Archetype Lab',
                type: 'interactive',
                xpReward: 35,
                description: 'Adjust the user persona HTML/CSS below to highlight clear Core Goals and Major Frustrations. Watch the persona preview render in real-time.',
                learningObjectives: [
                  'Synthesize user research into clear goals and frustrations',
                  'Structure persona cards with visual hierarchy',
                ],
                hints: [
                  'Add at least 2 distinct user goals.',
                  'Add at least 1 frustration or friction point.',
                ],
                interactiveData: {
                  initialCode: `<!-- Design your target user persona archetype -->\n<div style="font-family: system-ui, sans-serif; background: #1e1b4b; color: #f8fafc; padding: 24px; border-radius: 16px; border: 1px solid #6366f1;">\n  <div style="display: flex; gap: 16px; align-items: center;">\n    <div style="width: 56px; height: 56px; border-radius: 12px; background: #4f46e5; display: flex; align-items: center; justify-content: center; font-size: 24px;">🎨</div>\n    <div>\n      <h2 style="margin: 0; font-size: 20px;">Jordan Lee, 28</h2>\n      <p style="margin: 4px 0 0 0; color: #a5b4fc; font-size: 13px;">Junior Product Designer</p>\n    </div>\n  </div>\n  \n  <div style="margin-top: 16px; border-top: 1px solid #3730a3; pt-3;">\n    <h3 style="color: #38bdf8; font-size: 14px; margin-bottom: 8px;">Core Goals</h3>\n    <ul style="padding-left: 20px; font-size: 13px; color: #e2e8f0;">\n      <li>Master design systems and design tokens</li>\n      <li>Prove skills with an independent portfolio</li>\n    </ul>\n  </div>\n</div>`,
                  language: 'html',
                  targetInstruction: 'Ensure the persona has Jordan Lee (or another name), Core Goals, and add a Frustrations section.',
                  solutionHint: 'Include Jordan Lee and core goals in the card markup.',
                  validationRegex: 'Core Goals[\\s\\S]*</ul>',
                },
              },
            ],
          },
          {
            id: 'sub-ux-1-1-2',
            levelId: 'lvl-ux-1-1',
            worldId: 'world-ux-1',
            title: '1.2 User Research Heuristics Quiz',
            order: 2,
            summary: 'Test your understanding of qualitative user interviews versus quantitative analytics.',
            optionalResources: [
              {
                id: 'res-ux-3',
                title: 'NN/g: 10 Usability Heuristics for User Interface Design',
                type: 'article',
                provider: 'Nielsen Norman Group',
                url: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-ux-1-1-2',
                sublevelId: 'sub-ux-1-1-2',
                title: 'UX Research & Discovery Quiz',
                type: 'quiz',
                xpReward: 40,
                description: 'Answer these fundamental user research and heuristic questions.',
                learningObjectives: [
                  'Understand the role of generative research vs evaluative research',
                  'Recognize leading interview questions and how to avoid them',
                ],
                hints: ['Open-ended questions allow users to express genuine motivations.'],
                quizData: [
                  {
                    id: 'ux-q-1',
                    question: 'Which of the following is an OPEN-ENDED interview question that uncovers genuine user mental models?',
                    type: 'single',
                    options: [
                      'Do you think our checkout button is too small? (Yes/No)',
                      'Would you pay $10/month for this feature?',
                      'Can you walk me through the last time you booked a hotel room online?',
                      'Isn’t this design cleaner than our competitors?',
                    ],
                    correctAnswerIndices: [2],
                    explanation: 'Asking users to recount a recent experience prompts real behavioral storytelling rather than biased hypotheticals.',
                  },
                  {
                    id: 'ux-q-2',
                    question: 'What is the purpose of conducting a "Card Sorting" exercise with users?',
                    type: 'single',
                    options: [
                      'To test payment gateway credit cards',
                      'To organize and structure information architecture and navigation based on user mental models',
                      'To evaluate CPU and GPU performance of CSS animations',
                      'To select typography font pairings',
                    ],
                    correctAnswerIndices: [1],
                    explanation: 'Card sorting reveals how users naturally group categories and labels, directly informing navigation menus and IA.',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'lvl-ux-1-2',
        worldId: 'world-ux-1',
        title: 'Level 2: Information Architecture & Flows',
        order: 2,
        description: 'Site mapping, user flows, and reducing cognitive load across user journeys.',
        sublevels: [
          {
            id: 'sub-ux-1-2-1',
            levelId: 'lvl-ux-1-2',
            worldId: 'world-ux-1',
            title: '2.1 Fill in Missing IA Hierarchy',
            order: 1,
            summary: 'Complete the information architecture hierarchy for an e-commerce checkout flow.',
            optionalResources: [
              {
                id: 'res-ux-4',
                title: 'The Anatomy of Information Architecture',
                type: 'documentation',
                provider: 'UX Collective',
                url: 'https://uxdesign.cc/information-architecture-study-guide-38102ff935f',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-ux-1-2-1',
                sublevelId: 'sub-ux-1-2-1',
                title: 'IA Flow Completion',
                type: 'fill_code',
                xpReward: 45,
                description: 'Fill in the missing hierarchy levels to represent an accessible breadcrumb path from Catalog to Product Detail to Checkout.',
                learningObjectives: [
                  'Structure breadcrumbs matching mental model depth',
                  'Maintain clear visual orientation for the user',
                ],
                hints: [
                  'The second level under Home is "Catalog" or "Category".',
                  'The final breadcrumb represents the active "Product".',
                ],
                fillCodeData: {
                  codeSnippet: `<!-- Accessible Breadcrumbs Navigation -->\n<nav aria-label="Breadcrumb" class="breadcrumbs">\n  <ol>\n    <li><a href="/">Home</a></li>\n    <li><a href="/catalog">{{blank_1}}</a></li>\n    <li aria-current="page">{{blank_2}}</li>\n  </ol>\n</nav>`,
                  blanks: [
                    {
                      id: 'blank_1',
                      placeholder: 'category level (e.g. Products)',
                      correctAnswer: 'Products',
                    },
                    {
                      id: 'blank_2',
                      placeholder: 'current page item (e.g. Details)',
                      correctAnswer: 'Details',
                    },
                  ],
                  explanation: 'Breadcrumb navigation allows users to orient themselves in complex hierarchies and step back one or more levels without hitting browser back.',
                },
              },
            ],
          },
          {
            id: 'sub-ux-1-2-2',
            levelId: 'lvl-ux-1-2',
            worldId: 'world-ux-1',
            title: '2.2 Flow Puzzle: User Onboarding Funnel',
            order: 2,
            summary: 'Reorder a scrambled onboarding funnel into the lowest-friction, highest-converting sequence.',
            optionalResources: [
              {
                id: 'res-ux-5',
                title: 'Growth.design: Friction in User Onboarding',
                type: 'interactive',
                provider: 'Growth.design',
                url: 'https://growth.design/case-studies',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-ux-1-2-2',
                sublevelId: 'sub-ux-1-2-2',
                title: 'Assemble the Zero-Friction Onboarding Sequence',
                type: 'code_puzzle',
                xpReward: 50,
                description: 'Arrange these scrambled UX steps into the industry standard sequence that minimizes initial drop-off and delivers early user delight.',
                learningObjectives: [
                  'Understand progressive disclosure',
                  'Deliver value before asking for high-friction commitments',
                ],
                hints: [
                  'First introduce the core value proposition.',
                  'Allow quick customization before password creation.',
                  'End with welcoming the user into their personalized dashboard.',
                ],
                codePuzzleData: {
                  instructions: 'Order the onboarding journey steps from first touch to completion:',
                  pieces: [
                    { id: 'f-1', text: '1. Value Proposition Splash: Highlight immediate benefits to the user' },
                    { id: 'f-2', text: '2. Lightweight Personalization: Ask 1-2 quick interest/goal questions' },
                    { id: 'f-3', text: '3. One-Click Social Authentication: Fast sign-in without lengthy form' },
                    { id: 'f-4', text: '4. Empty State Guidance: Show first actionable tutorial step' },
                    { id: 'f-5', text: '5. Welcome into Active Dashboard: Celebrate first milestone with confetti' },
                  ],
                  correctOrder: ['f-1', 'f-2', 'f-3', 'f-4', 'f-5'],
                  explanation: 'Delivering clear value before demanding effort or credentials dramatically reduces churn and improves user retention.',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'world-ux-2',
    number: 2,
    title: 'World 2: Visual Design, Typography & Color',
    shortDesc: 'WCAG contrast ratios, typography hierarchy, 8pt spacing grids, and design tokens.',
    color: 'from-purple-600 to-indigo-800',
    levels: [
      {
        id: 'lvl-ux-2-1',
        worldId: 'world-ux-2',
        title: 'Level 1: WCAG Contrast & Accessible Color',
        order: 1,
        description: 'Audit and repair contrast failures, colorblind accessibility, and semantic color cues.',
        sublevels: [
          {
            id: 'sub-ux-2-1-1',
            levelId: 'lvl-ux-2-1',
            worldId: 'world-ux-2',
            title: '1.1 Interactive Contrast Studio',
            order: 1,
            summary: 'Live experiment testing foreground and background colors to achieve a verified WCAG AA rating (4.5:1).',
            optionalResources: [
              {
                id: 'res-ux-6',
                title: 'WebAIM: Color Contrast Checker',
                type: 'interactive',
                provider: 'WebAIM',
                url: 'https://webaim.org/resources/contrastchecker/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-ux-2-1-1',
                sublevelId: 'sub-ux-2-1-1',
                title: 'Contrast & Readability Lab',
                type: 'interactive',
                xpReward: 45,
                description: 'The current button has low contrast gray-on-light-gray (#888 on #eee). Change background to high-contrast dark indigo (#1e1b4b or #2563eb) and text to crisp white (#ffffff) to satisfy WCAG AA.',
                learningObjectives: [
                  'Satisfy WCAG AA 4.5:1 contrast ratio',
                  'Maintain clear button affordance',
                ],
                hints: [
                  'Set background: #2563eb; or #1e1b4b;',
                  'Set color: #ffffff; for maximum readability.',
                ],
                interactiveData: {
                  initialCode: `<style>\n  .cta-btn {\n    /* Currently FAILS contrast checks */\n    background: #e2e8f0;\n    color: #94a3b8;\n    padding: 14px 28px;\n    border-radius: 12px;\n    font-weight: 600;\n    font-family: system-ui, sans-serif;\n    border: none;\n    cursor: pointer;\n  }\n</style>\n<div style="background: #0f172a; padding: 40px; text-align: center;">\n  <button class="cta-btn">Start Designing Free</button>\n</div>`,
                  language: 'html',
                  targetInstruction: 'Update .cta-btn so background has a strong saturated hue (e.g. #2563eb or #4f46e5) and text is white (#ffffff or #fff).',
                  solutionHint: 'Set color: #ffffff; and background: #2563eb;',
                  validationRegex: 'color:\\s*(#ffffff|#fff|white)[\\s\\S]*background:\\s*#?(2563eb|4f46e5|1e1b4b|3b82f6|10b981)',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'lvl-ux-2-2',
        worldId: 'world-ux-2',
        title: 'Level 2: Micro-Interactions & Spacing',
        order: 2,
        description: 'Design token architecture, hover feedback, and spatial rhythm.',
        sublevels: [
          {
            id: 'sub-ux-2-2-1',
            levelId: 'lvl-ux-2-2',
            worldId: 'world-ux-2',
            title: '2.1 Build-from-Scratch: Modern Metric Card',
            order: 1,
            summary: 'Build a clean, accessible UI card utilizing 8pt spacing and subtle elevation.',
            optionalResources: [
              {
                id: 'res-ux-7',
                title: 'Refactoring UI: Hierarchy and Spacing Fundamentals',
                type: 'article',
                provider: 'Steve Schoger & Adam Wathan',
                url: 'https://www.refactoringui.com/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-ux-2-2-1',
                sublevelId: 'sub-ux-2-2-1',
                title: 'Build-from-Scratch: High-Clarity Metric Card',
                type: 'build_challenge',
                xpReward: 55,
                description: 'Write the CSS for `.metric-card` incorporating border-radius (at least 12px), comfortable padding (at least 20px), and a subtle border or box-shadow.',
                learningObjectives: [
                  'Use 8pt multiples for padding and border-radius',
                  'Ensure high typographic clarity between label and value',
                ],
                hints: [
                  'Set padding: 24px;',
                  'Set border-radius: 16px;',
                  'Include a border: 1px solid #334155;',
                ],
                buildChallengeData: {
                  challengePrompt: 'Create a clean, elevated metric card with proper padding, border-radius, and border.',
                  starterCode: `<style>\n  .metric-card {\n    /* Add your spacing and border styling here */\n    \n    background: #1e293b;\n    color: white;\n    font-family: system-ui, sans-serif;\n  }\n  .label { font-size: 12px; color: #94a3b8; text-transform: uppercase; font-weight: 600; }\n  .value { font-size: 28px; font-weight: 800; color: #38bdf8; margin-top: 4px; }\n</style>\n<div class="metric-card">\n  <div class="label">Weekly Active Students</div>\n  <div class="value">14,280</div>\n</div>`,
                  requirements: [
                    'Include "padding: 24px" (or at least 20px)',
                    'Include "border-radius"',
                    'Include "border:" or "box-shadow:"',
                  ],
                  testAssertions: [
                    '/padding:\\s*(2[0-9]|[3-9][0-9])px/i.test(code)',
                    'code.includes("border-radius")',
                    'code.includes("border") || code.includes("box-shadow")',
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'world-ux-3',
    number: 3,
    title: 'World 3: Design Systems & Boss Arena',
    shortDesc: 'Component variant states, eliminating dark patterns, ethical UI, and World Boss conquest.',
    color: 'from-amber-600 to-orange-700',
    levels: [
      {
        id: 'lvl-ux-3-1',
        worldId: 'world-ux-3',
        title: 'Level 1: Component Variants & Interaction Predictor',
        order: 1,
        description: 'Understand button hover, active, focus-visible, and disabled states.',
        sublevels: [
          {
            id: 'sub-ux-3-1-1',
            levelId: 'lvl-ux-3-1',
            worldId: 'world-ux-3',
            title: '1.1 Predict the UX Interaction Outcome',
            order: 1,
            summary: 'Evaluate what happens when a screen reader or keyboard user navigates an interface without focus rings.',
            optionalResources: [
              {
                id: 'res-ux-8',
                title: 'A11y Project: Keep Focus Rings Visible',
                type: 'article',
                provider: 'The A11y Project',
                url: 'https://www.a11yproject.com/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-ux-3-1-1',
                sublevelId: 'sub-ux-3-1-1',
                title: 'Predict Focus & Accessibility Behavior',
                type: 'predict_output',
                xpReward: 50,
                description: 'A developer applies `outline: none;` without providing an alternative focus indicator. What is the direct consequence for keyboard users pressing Tab?',
                learningObjectives: [
                  'Understand keyboard accessibility',
                  'Provide high-visibility focus-visible indicators',
                ],
                hints: ['Keyboard users rely on the focus ring to know where they are.'],
                predictOutputData: {
                  codeSnippet: `button:focus {\n  outline: none; /* Removed default browser focus ring */\n  /* No custom box-shadow or ring was added */\n}`,
                  options: [
                    'The browser displays an accessible speech bubble automatically',
                    'Keyboard users become completely disoriented because they cannot see which element has active focus',
                    'The page switches into high-contrast audio mode',
                    'Touch screen users can no longer tap the button',
                  ],
                  correctOptionIndex: 1,
                  executionExplanation: 'Removing focus outlines without a visible custom replacement creates a critical accessibility barrier for keyboard-only users who can no longer track where they are on the screen.',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'lvl-ux-3-2',
        worldId: 'world-ux-3',
        title: 'Level 2: Ethical UX & Dark Pattern Bug Hunt',
        order: 2,
        description: 'Identify and repair deceptive designs, sneak-into-basket tricks, and disguised ads.',
        sublevels: [
          {
            id: 'sub-ux-3-2-1',
            levelId: 'lvl-ux-3-2',
            worldId: 'world-ux-3',
            title: '2.1 Bug Hunt: Eliminate the Dark Pattern',
            order: 1,
            summary: 'Fix a deceptive checkout modal that sneakily pre-checks an expensive recurring donation and hides the decline button.',
            optionalResources: [
              {
                id: 'res-ux-9',
                title: 'Deceptive Design: Types of Dark Patterns',
                type: 'documentation',
                provider: 'Deceptive Design (formerly DarkPatterns.org)',
                url: 'https://www.deceptive.design/types',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-ux-3-2-1',
                sublevelId: 'sub-ux-3-2-1',
                title: 'Bug Hunt: Rescue the Honest Checkout Flow',
                type: 'bug_hunt',
                xpReward: 65,
                description: 'The checkout modal has dark patterns: the monthly donation checkbox is pre-checked by default, and the "No Thanks" button has invisible text color matching the background (#333 on #333). Fix both to make the UI ethical and transparent!',
                learningObjectives: [
                  'Avoid pre-checked checkboxes for optional charges',
                  'Make secondary actions legible and accessible',
                ],
                hints: [
                  'Remove the `checked` attribute from the checkbox input so user explicitly opts in.',
                  'Change the decline button color to legible white or neutral-300.',
                ],
                bugHuntData: {
                  starterCode: `<div style="background: #18181b; padding: 24px; border-radius: 12px; font-family: system-ui, sans-serif; color: white;">\n  <h3>Complete Your Enrollment</h3>\n  \n  <!-- DARK PATTERN: Pre-checked recurring fee -->\n  <label style="display: flex; gap: 8px; margin: 16px 0; font-size: 13px;">\n    <input type="checkbox" id="extra-fee" checked />\n    <span>Add $29/month automated recurring coaching subscription</span>\n  </label>\n  \n  <div style="display: flex; gap: 12px;">\n    <button style="padding: 10px 20px; background: #6366f1; color: white; border: none; border-radius: 8px;">Proceed</button>\n    <!-- DARK PATTERN: Deceptive invisible cancel button (#27272a on #18181b) -->\n    <button id="btn-decline" style="padding: 10px 20px; background: transparent; color: #18181b; border: 1px solid #18181b; border-radius: 8px;">No Thanks</button>\n  </div>\n</div>`,
                  brokenDescription: 'Checkbox is pre-checked by default, and "No Thanks" button is rendered invisible with color: #18181b matching the dark card.',
                  expectedBehavior: 'Checkbox is unchecked by default, and decline button has visible text color (#ffffff or #e4e4e7).',
                  testFunction: `(code) => {
                    if (code.includes('id="extra-fee" checked') || code.includes("checked id='extra-fee'") || (code.includes('type="checkbox"') && code.includes('checked'))) {
                      return 'The checkbox should not be pre-checked. Remove the "checked" attribute to respect user consent.';
                    }
                    if (code.includes('color: #18181b') || code.includes('color:#18181b')) {
                      return 'The "No Thanks" button still has invisible text matching the dark background. Give it a legible color (e.g. #e4e4e7 or #ffffff).';
                    }
                    return true;
                  }`,
                  hints: [
                    'Remove the word `checked` from `<input type="checkbox" ... />`.',
                    'Change `color: #18181b;` on the decline button to `color: #e4e4e7;` or `color: white;`.',
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        id: 'lvl-ux-3-3',
        worldId: 'world-ux-3',
        title: 'Level 3: World Boss Arena',
        order: 3,
        description: 'Confront the Dark Pattern Overlord and restore an ethical, accessible design system.',
        sublevels: [
          {
            id: 'sub-ux-3-3-1',
            levelId: 'lvl-ux-3-3',
            worldId: 'world-ux-3',
            title: '3.1 Boss Mission: Defeat the Dark Pattern Overlord',
            order: 1,
            summary: 'Conquer the Overlord by implementing three ethical design mandates across typography, contrast, and transparent consent.',
            optionalResources: [
              {
                id: 'res-ux-10',
                title: 'Humane By Design: Principles of Ethical Digital Products',
                type: 'article',
                provider: 'Humane by Design',
                url: 'https://humanebydesign.com/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-ux-3-3-1',
                sublevelId: 'sub-ux-3-3-1',
                title: 'Boss Mission: Overthrow the Dark Pattern Overlord',
                type: 'boss_mission',
                xpReward: 150,
                description: 'The Dark Pattern Overlord has infected this user interface with deceptive traps! Fulfill all 3 ethical UX objectives to shatter the Overlord’s shield and earn the "Ethical UX Champion" badge.',
                learningObjectives: [
                  'Implement transparent user consent without deceptive pre-selections',
                  'Maintain high-contrast WCAG compliant call-to-actions',
                  'Provide clear cancellation feedback with confirm dialog',
                ],
                hints: [
                  'Objective 1: Maintain a visible unsubscribe link with id="boss-optout".',
                  'Objective 2: Style .ethical-badge with `background: #10b981;`.',
                  'Objective 3: Provide a clear confirm dialog in JavaScript on click.',
                ],
                bossMissionData: {
                  bossName: 'The Dark Pattern Overlord',
                  bossTitle: 'Architect of Deceptive Friction',
                  bossHealth: 100,
                  scenarioDescription: 'To pierce the Overlord’s defense, eliminate deceptive practices and enforce total transparency for the student.',
                  starterCode: `<div id="ethical-arena" style="font-family: system-ui; padding: 20px; background: #09090b; color: white;">\n  <h2>Subscription Settings</h2>\n  <p>Manage your preferences openly with zero hidden traps.</p>\n  \n  <!-- Objective 1: Add a visible link with id="boss-optout" -->\n  <a href="#opt-out" id="boss-optout" style="color: #60a5fa; font-size: 13px;">Cancel Subscription Anytime</a>\n  \n  <div style="margin-top: 16px;">\n    <!-- Objective 2: Give .ethical-badge background: #10b981 -->\n    <span class="ethical-badge">Verified Transparent</span>\n  </div>\n</div>\n\n<style>\n  .ethical-badge {\n    background: #10b981;\n    color: black;\n    padding: 4px 12px;\n    border-radius: 12px;\n    font-size: 11px;\n    font-weight: bold;\n  }\n</style>\n\n<script>\n  // Objective 3: Clean event handler on optout link\n  const optout = document.getElementById('boss-optout');\n  if (optout) {\n    optout.addEventListener('click', (e) => {\n      e.preventDefault();\n      alert('Subscription cancelled immediately with zero penalties.');\n    });\n  }\n</script>`,
                  objectives: [
                    {
                      id: 'obj-1',
                      description: 'Maintain link with id="boss-optout"',
                      checkHint: 'Include <a ... id="boss-optout">',
                    },
                    {
                      id: 'obj-2',
                      description: 'Style .ethical-badge with background: #10b981',
                      checkHint: 'Include background: #10b981 in style block',
                    },
                    {
                      id: 'obj-3',
                      description: 'Intercept click and call e.preventDefault()',
                      checkHint: 'Call e.preventDefault() in optout listener',
                    },
                  ],
                  badgeName: 'Ethical UX Champion',
                  badgeIcon: 'Palette',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'world-ux-4',
    number: 4,
    title: 'World 4: Prototyping & Micro-Interactions',
    shortDesc: 'State transitions, spring physics, hover affordance, and responsive Figma components.',
    color: 'from-pink-500 to-rose-600',
    levels: [
      {
        id: 'lvl-ux-4-1',
        worldId: 'world-ux-4',
        title: 'Level 1: Motion & Cognitive Feedback',
        order: 1,
        description: 'Using animation purposefully to convey spatial relationships and state shifts.',
        sublevels: [
          {
            id: 'sub-ux-4-1-1',
            levelId: 'lvl-ux-4-1',
            worldId: 'world-ux-4',
            title: '1.1 Micro-Interaction Feedback Quiz',
            order: 1,
            summary: 'Master motion design principles: duration, easing curves, and respecting prefers-reduced-motion.',
            optionalResources: [
              {
                id: 'res-ux-11',
                title: 'Material Design 3: Motion Principles',
                type: 'documentation',
                provider: 'Google Material Design',
                url: 'https://m3.material.io/styles/motion/overview',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-ux-4-1-1',
                sublevelId: 'sub-ux-4-1-1',
                title: 'Motion Principles Quiz',
                type: 'quiz',
                xpReward: 50,
                description: 'Test your understanding of UI micro-interaction animation.',
                learningObjectives: [
                  'Apply appropriate animation durations (150ms - 300ms)',
                  'Respect prefers-reduced-motion media query for vestibular safety',
                ],
                hints: ['UI animations should be purposeful and never cause motion sickness.'],
                quizData: [
                  {
                    id: 'ux-mot-1',
                    question: 'Why must designers support the CSS `@media (prefers-reduced-motion)` query?',
                    type: 'single',
                    options: [
                      'It speeds up web page download times on slow 3G connections',
                      'Users with vestibular disorders can experience dizziness, nausea, and disorientation from large animations',
                      'It is required to display images on retina displays',
                      'It prevents battery drain on electric vehicles',
                    ],
                    correctAnswerIndices: [1],
                    explanation: 'Excessive motion can trigger vestibular disorders. Reduced motion preferences allow users to navigate safely without vertigo.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
