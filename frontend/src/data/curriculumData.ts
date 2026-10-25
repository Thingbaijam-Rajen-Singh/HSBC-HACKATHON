import { World, PlacementQuestion } from '../types';
import { uiuxCurriculumWorlds, uiuxPlacementQuestions } from './uiuxCurriculum';
import { pythonCurriculumWorlds, pythonPlacementQuestions } from './otherCurricula';
import { dataAnalysisCurriculumWorlds, dataAnalysisPlacementQuestions } from './dataAnalysisCurriculum';
import { cloudDevopsCurriculumWorlds, cloudDevopsPlacementQuestions } from './cloudDevopsCurriculum';

export const placementQuestions: PlacementQuestion[] = [
  {
    id: 'pq-1',
    topic: 'HTML & Semantic Structure',
    question: 'Which HTML5 element represents self-contained content that could be distributed independently (e.g. blog post)?',
    options: ['<section>', '<article>', '<div>', '<main>'],
    correctIndex: 1,
  },
  {
    id: 'pq-2',
    topic: 'CSS Flexbox',
    question: 'In CSS Flexbox, which property aligns items along the cross-axis?',
    options: ['justify-content', 'align-items', 'flex-direction', 'align-content'],
    correctIndex: 1,
  },
  {
    id: 'pq-3',
    topic: 'JavaScript Fundamentals',
    question: 'What does the array method `.filter()` return in modern JavaScript?',
    options: [
      'A single reduced value',
      'The first matching element index',
      'A new array containing elements that pass the test condition',
      'The original array mutated in place',
    ],
    correctIndex: 2,
  },
  {
    id: 'pq-4',
    topic: 'React & State',
    question: 'In React, what is the fundamental purpose of the useState hook?',
    options: [
      'To fetch data from external APIs',
      'To declare a state variable that triggers a re-render when updated',
      'To directly mutate DOM nodes without React seeing it',
      'To define global CSS styles',
    ],
    correctIndex: 1,
  },
];

export const webDevCurriculumWorlds: World[] = [
  {
    id: 'world-1',
    number: 1,
    title: 'World 1: HTML Architecture',
    shortDesc: 'Structure, semantic markup, hyperlinks, accessible forms, and content semantics.',
    color: 'from-blue-600 to-indigo-700',
    levels: [
      {
        id: 'lvl-1-1',
        worldId: 'world-1',
        title: 'Level 1: Headings & Text Structure',
        order: 1,
        description: 'Master document outline, text hierarchy, paragraphs, and semantic importance.',
        sublevels: [
          {
            id: 'sub-1-1-1',
            levelId: 'lvl-1-1',
            worldId: 'world-1',
            title: '1.1 Interactive Headings Lab',
            order: 1,
            summary: 'Live experiment changing heading levels to understand SEO outline and visual hierarchy.',
            optionalResources: [
              {
                id: 'res-1',
                title: 'MDN Web Docs: HTML Headings and Structure',
                type: 'documentation',
                provider: 'MDN Web Docs',
                url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements',
                isFree: true,
                duration: '10 min read',
              },
              {
                id: 'res-2',
                title: 'freeCodeCamp: HTML5 Semantic Elements Crash Course',
                type: 'video',
                provider: 'freeCodeCamp YouTube',
                url: 'https://www.youtube.com/watch?v=kUMe1FH4CHE',
                isFree: true,
                duration: '15 min watch',
              },
            ],
            activities: [
              {
                id: 'act-1-1-1',
                sublevelId: 'sub-1-1-1',
                title: 'Interactive Tag Playground',
                type: 'interactive',
                xpReward: 35,
                description: 'Adjust the heading levels and paragraph text below. Watch the live preview update in real-time as you modify the code.',
                learningObjectives: [
                  'Understand the difference between h1, h2, and h3',
                  'Recognize semantic hierarchy over visual appearance',
                ],
                hints: [
                  'A valid webpage should contain only one primary <h1> tag.',
                  'Subheadings follow in sequence: <h2>, then <h3>.',
                ],
                interactiveData: {
                  initialCode: `<!-- Modify the markup below to create a clean profile page -->\n<h1>Alex Rivera</h1>\n<h2>Full-Stack Developer</h2>\n<p>Building accessible, lightning-fast web applications.</p>\n<h3>Core Focus Areas</h3>\n<ul>\n  <li>React & TypeScript</li>\n  <li>Node.js Services</li>\n</ul>`,
                  language: 'html',
                  targetInstruction: 'Change the h1 title to your own name or "SkillMate Scholar", and ensure proper <h1> and <h2> tags exist.',
                  solutionHint: 'Include at least one <h1> and one <h2> tag with descriptive text.',
                  validationRegex: '<h1[^>]*>.*</h1>[\\s\\S]*<h2[^>]*>.*</h2>',
                },
              },
            ],
          },
          {
            id: 'sub-1-1-2',
            levelId: 'lvl-1-1',
            worldId: 'world-1',
            title: '1.2 Semantic HTML Knowledge Check',
            order: 2,
            summary: 'Test your understanding of semantic tags versus generic container div elements.',
            optionalResources: [
              {
                id: 'res-3',
                title: 'W3C: Why Semantic HTML Matters for Accessibility',
                type: 'article',
                provider: 'W3C Web Accessibility',
                url: 'https://www.w3.org/WAI/tutorials/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-1-1-2',
                sublevelId: 'sub-1-1-2',
                title: 'HTML Semantic Knowledge Quiz',
                type: 'quiz',
                xpReward: 40,
                description: 'Select the correct answers for each semantic markup question.',
                learningObjectives: [
                  'Differentiate between <div>, <section>, <article>, and <header>',
                  'Understand screen reader accessibility benefits of semantic tags',
                ],
                hints: [
                  'Semantic elements clearly describe their meaning to both browser and developer.',
                ],
                quizData: [
                  {
                    id: 'q-1',
                    question: 'Why should developers prefer semantic tags like <nav> and <main> over generic <div> tags?',
                    type: 'single',
                    options: [
                      'They automatically apply pre-built CSS animations without code',
                      'They provide screen readers with accessibility landmarks and assist SEO crawlers',
                      'They prevent users from copying text on the website',
                      'They render 5x faster than standard HTML elements',
                    ],
                    correctAnswerIndices: [1],
                    explanation: 'Semantic elements convey meaning to assistive technologies like screen readers, search engine indexers, and other developers.',
                  },
                  {
                    id: 'q-2',
                    question: 'Which of the following elements are considered HTML5 semantic elements? (Select all that apply)',
                    type: 'multiple',
                    options: ['<header>', '<div>', '<article>', '<span>', '<footer>'],
                    correctAnswerIndices: [0, 2, 4],
                    explanation: '<header>, <article>, and <footer> convey semantic roles. <div> and <span> are non-semantic generic containers.',
                  },
                  {
                    id: 'q-3',
                    question: 'True or False: Using the <strong> tag only changes visual boldness, with no semantic importance for screen readers.',
                    type: 'true_false',
                    options: ['True', 'False'],
                    correctAnswerIndices: [1],
                    explanation: 'False. <strong> conveys urgent seriousness or semantic importance, whereas <b> is purely visual without implied importance.',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'lvl-1-2',
        worldId: 'world-1',
        title: 'Level 2: Hyperlinks, Media & Lists',
        order: 2,
        description: 'Connecting pages, linking assets, and assembling structured list menus.',
        sublevels: [
          {
            id: 'sub-1-2-1',
            levelId: 'lvl-1-2',
            worldId: 'world-1',
            title: '2.1 Fill in the Missing Code',
            order: 1,
            summary: 'Complete incomplete HTML anchor links and media attributes.',
            optionalResources: [
              {
                id: 'res-4',
                title: 'MDN Web Docs: Creating Hyperlinks',
                type: 'documentation',
                provider: 'MDN',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-1-2-1',
                sublevelId: 'sub-1-2-1',
                title: 'Anchor & Target Attribute Precision',
                type: 'fill_code',
                xpReward: 45,
                description: 'Fill in the missing attributes so that this link points to "https://skillbridge.dev" and opens safely in a new browser tab.',
                learningObjectives: [
                  'Use href attribute for destination URLs',
                  'Use target="_blank" and rel="noopener noreferrer" for security',
                ],
                hints: [
                  'The attribute specifying the hyperlink destination is "href".',
                  'The standard value to open in a new tab is "_blank".',
                ],
                fillCodeData: {
                  codeSnippet: `<a {{blank_1}}="https://skillmate.dev" {{blank_2}}="_blank" rel="noopener noreferrer">\n  Visit SkillMate Platform\n</a>`,
                  blanks: [
                    {
                      id: 'blank_1',
                      placeholder: 'destination attribute (e.g. href)',
                      correctAnswer: 'href',
                    },
                    {
                      id: 'blank_2',
                      placeholder: 'window target attribute (e.g. target)',
                      correctAnswer: 'target',
                    },
                  ],
                  explanation: 'The href attribute defines the link destination, while target="_blank" instructs the browser to open the resource in a new browsing context.',
                },
              },
            ],
          },
          {
            id: 'sub-1-2-2',
            levelId: 'lvl-1-2',
            worldId: 'world-1',
            title: '2.2 Code Puzzle: Navigation Bar',
            order: 2,
            summary: 'Drag and reorder code fragments into the correct semantic HTML structure.',
            optionalResources: [
              {
                id: 'res-5',
                title: 'Web.dev: Learn Navigation Landmarks',
                type: 'documentation',
                provider: 'Google Web.dev',
                url: 'https://web.dev/learn/html/semantic-html/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-1-2-2',
                sublevelId: 'sub-1-2-2',
                title: 'Assemble the Semantic Navigation List',
                type: 'code_puzzle',
                xpReward: 50,
                description: 'Arrange these scrambled code fragments into the correct order to construct a valid accessible navigation bar with an unordered list.',
                learningObjectives: [
                  'Structure <nav> container wrapping an unordered list <ul>',
                  'Nest <li> items within <ul> correctly',
                ],
                hints: [
                  'The outermost tag is <nav>.',
                  'Inside <nav> comes the <ul> tag.',
                  'List items <li> reside inside <ul>.',
                ],
                codePuzzleData: {
                  instructions: 'Click or drag the pieces into the correct top-to-bottom sequence:',
                  pieces: [
                    { id: 'p-1', text: '<nav class="site-nav">' },
                    { id: 'p-2', text: '  <ul>' },
                    { id: 'p-3', text: '    <li><a href="/home">Home</a></li>' },
                    { id: 'p-4', text: '    <li><a href="/projects">Projects</a></li>' },
                    { id: 'p-5', text: '  </ul>' },
                    { id: 'p-6', text: '</nav>' },
                  ],
                  correctOrder: ['p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6'],
                  explanation: 'A standard accessible navigation structure wraps an unordered list within a semantic <nav> element.',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'lvl-1-3',
        worldId: 'world-1',
        title: 'Level 3: Forms, Inputs & Bug Hunts',
        order: 3,
        description: 'Input validation, labels, accessibility attributes, and interactive debugging.',
        sublevels: [
          {
            id: 'sub-1-3-1',
            levelId: 'lvl-1-3',
            worldId: 'world-1',
            title: '3.1 Bug Hunt: Broken Form Mission',
            order: 1,
            summary: 'Identify and fix syntax and attribute errors in a student registration form.',
            optionalResources: [
              {
                id: 'res-6',
                title: 'MDN Web Docs: How to structure an HTML form',
                type: 'documentation',
                provider: 'MDN',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-1-3-1',
                sublevelId: 'sub-1-3-1',
                title: 'Bug Hunt: Rescue the Registration Form',
                type: 'bug_hunt',
                xpReward: 60,
                description: 'The registration form has several critical bugs: an unclosed input tag, an incorrect input type for password, and a submit button with no type attribute. Fix all bugs and test the form!',
                learningObjectives: [
                  'Identify broken input types and missing attributes',
                  'Ensure label "for" matches input "id"',
                ],
                hints: [
                  'Change type="texxt" to type="email" for the email input.',
                  'Change type="text" to type="password" for the secret key input.',
                  'Set the button to type="submit".',
                ],
                bugHuntData: {
                  starterCode: `<form id="signup-form">\n  <label for="user-email">Email Address</label>\n  <input id="user-email" type="texxt" required placeholder="you@domain.com" />\n\n  <label for="user-pass">Password</label>\n  <input id="user-pass" type="text" required placeholder="Choose password" />\n\n  <button>Create Account</button>\n</form>`,
                  brokenDescription: 'Email field has typo "texxt", password field reveals sensitive text with type="text", and submit button lacks type="submit".',
                  expectedBehavior: 'Email input has type="email", password input has type="password", and button has type="submit".',
                  testFunction: `(code) => {
                    const hasEmailType = /type=["']email["']/.test(code);
                    const hasPasswordType = /type=["']password["']/.test(code);
                    const hasSubmitBtn = /type=["']submit["']/.test(code);
                    if (!hasEmailType) return 'The email input still has an incorrect type. It should be type="email".';
                    if (!hasPasswordType) return 'The password input is still exposed. It should be type="password".';
                    if (!hasSubmitBtn) return 'The button should explicitly declare type="submit".';
                    return true;
                  }`,
                  hints: [
                    'Look at the type attribute on the user-email input.',
                    'Check the user-pass input type.',
                    'Add type="submit" to the button element.',
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
    id: 'world-2',
    number: 2,
    title: 'World 2: Modern CSS & Layouts',
    shortDesc: 'Box model, Flexbox, responsive CSS Grid, typography, and card designs.',
    color: 'from-violet-600 to-purple-800',
    levels: [
      {
        id: 'lvl-2-1',
        worldId: 'world-2',
        title: 'Level 1: Box Model & Spacing',
        order: 1,
        description: 'Understand content, padding, border, and margin dimensions.',
        sublevels: [
          {
            id: 'sub-2-1-1',
            levelId: 'lvl-2-1',
            worldId: 'world-2',
            title: '1.1 Interactive Box Model Studio',
            order: 1,
            summary: 'Live CSS tweaking with instant feedback to balance layout padding and margin.',
            optionalResources: [
              {
                id: 'res-7',
                title: 'CSS Tricks: The CSS Box Model Explained',
                type: 'article',
                provider: 'CSS Tricks',
                url: 'https://css-tricks.com/the-css-box-model/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-2-1-1',
                sublevelId: 'sub-2-1-1',
                title: 'Box Model Playground',
                type: 'interactive',
                xpReward: 45,
                description: 'Adjust the CSS styling to create a modern card with at least 16px of padding, rounded corners (border-radius), and a border.',
                learningObjectives: [
                  'Master padding inside borders vs margin outside borders',
                  'Apply box-sizing: border-box for predictable dimensions',
                ],
                hints: [
                  'Add `padding: 20px;` to give the card breathing room inside.',
                  'Add `border-radius: 12px;` for smooth rounded corners.',
                ],
                interactiveData: {
                  initialCode: `<style>\n  .skill-badge {\n    background: #1e1e2f;\n    color: #e2e8f0;\n    /* Adjust padding, border-radius, and border below */\n    padding: 8px;\n    border-radius: 4px;\n    border: 1px solid #3b82f6;\n    font-family: system-ui, sans-serif;\n  }\n</style>\n<div class="skill-badge">\n  <h3>Frontend Architect</h3>\n  <p>Mastering modern responsive UI systems.</p>\n</div>`,
                  language: 'html',
                  targetInstruction: 'Increase padding to 16px or more and set border-radius to 12px.',
                  solutionHint: 'Set padding: 16px; (or higher) and border-radius: 12px;',
                  validationRegex: 'padding:\\s*(1[6-9]|[2-9][0-9])px;[\\s\\S]*border-radius:\\s*(1[2-9]|[2-9][0-9])px;',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'lvl-2-2',
        worldId: 'world-2',
        title: 'Level 2: Flexbox Mastery',
        order: 2,
        description: 'Single-axis alignment, distribution, and flex wrap configurations.',
        sublevels: [
          {
            id: 'sub-2-2-1',
            levelId: 'lvl-2-2',
            worldId: 'world-2',
            title: '2.1 Build-from-Scratch: Centered Hero Card',
            order: 1,
            summary: 'Write CSS from scratch to perfectly center a badge horizontally and vertically with Flexbox.',
            optionalResources: [
              {
                id: 'res-8',
                title: 'A Complete Guide to Flexbox',
                type: 'article',
                provider: 'CSS-Tricks',
                url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-2-2-1',
                sublevelId: 'sub-2-2-1',
                title: 'Build-from-Scratch: The Perfect Center',
                type: 'build_challenge',
                xpReward: 55,
                description: 'Write the CSS rules for `.flex-container` using display: flex, justify-content: center, and align-items: center to center the trophy icon.',
                learningObjectives: [
                  'Use display: flex on parent container',
                  'Align items along both axes simultaneously',
                ],
                hints: [
                  'Set display: flex;',
                  'Set justify-content: center;',
                  'Set align-items: center;',
                ],
                buildChallengeData: {
                  challengePrompt: 'Create a centered flex container by applying the required CSS properties to the container.',
                  starterCode: `<style>\n  .flex-container {\n    /* Write your Flexbox centering properties here */\n    \n    height: 180px;\n    background: #0f172a;\n    border: 2px dashed #6366f1;\n    border-radius: 8px;\n  }\n  .badge {\n    background: #6366f1;\n    color: white;\n    padding: 12px 24px;\n    border-radius: 20px;\n    font-weight: 600;\n  }\n</style>\n<div class="flex-container">\n  <div class="badge">🏆 Level Completed!</div>\n</div>`,
                  requirements: [
                    'Include "display: flex"',
                    'Include "justify-content: center"',
                    'Include "align-items: center"',
                  ],
                  testAssertions: [
                    'code.includes("display: flex")',
                    'code.includes("justify-content: center")',
                    'code.includes("align-items: center")',
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
    id: 'world-3',
    number: 3,
    title: 'World 3: JavaScript Programming',
    shortDesc: 'Variables, data types, functions, DOM events, and async operations.',
    color: 'from-amber-600 to-yellow-600',
    levels: [
      {
        id: 'lvl-3-1',
        worldId: 'world-3',
        title: 'Level 1: Variables, Scope & Logic',
        order: 1,
        description: 'Const vs let, arrow functions, template literals, and execution order.',
        sublevels: [
          {
            id: 'sub-3-1-1',
            levelId: 'lvl-3-1',
            worldId: 'world-3',
            title: '1.1 Predict the Output Challenge',
            order: 1,
            summary: 'Analyze modern JavaScript code and predict its console output before execution.',
            optionalResources: [
              {
                id: 'res-9',
                title: 'JavaScript.info: Variables and Data Types',
                type: 'article',
                provider: 'JavaScript.info',
                url: 'https://javascript.info/variables',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-3-1-1',
                sublevelId: 'sub-3-1-1',
                title: 'Predict the Console Output',
                type: 'predict_output',
                xpReward: 50,
                description: 'Read the JavaScript snippet carefully. Predict what will be logged to the console when this script runs.',
                learningObjectives: [
                  'Understand array mapping and filter chaining',
                  'Recognize value immutability in array methods',
                ],
                hints: [
                  'The `.filter(n => n > 2)` filters numbers strictly greater than 2.',
                  'Then `.map(n => n * 2)` doubles each remaining number.',
                ],
                predictOutputData: {
                  codeSnippet: `const numbers = [1, 2, 3, 4];\nconst result = numbers\n  .filter(n => n > 2)\n  .map(n => n * 2);\n\nconsole.log(result);`,
                  options: [
                    '[6, 8]',
                    '[2, 4, 6, 8]',
                    '[3, 4]',
                    '[1, 2, 6, 8]',
                  ],
                  correctOptionIndex: 0,
                  executionExplanation: 'First, .filter(n => n > 2) evaluates [1, 2, 3, 4] and keeps [3, 4]. Then, .map(n => n * 2) transforms [3, 4] into [6, 8]. The original array is unchanged.',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'lvl-3-2',
        worldId: 'world-3',
        title: 'Level 2: DOM Manipulation & Events',
        order: 2,
        description: 'Selecting elements, listening to click events, and dynamically updating UI.',
        sublevels: [
          {
            id: 'sub-3-2-1',
            levelId: 'lvl-3-2',
            worldId: 'world-3',
            title: '2.1 Bug Hunt: The Frozen Counter',
            order: 1,
            summary: 'Debug a counter app where clicks are ignored due to an incorrect event listener selector.',
            optionalResources: [
              {
                id: 'res-10',
                title: 'MDN Web Docs: Introduction to Events',
                type: 'documentation',
                provider: 'MDN',
                url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-3-2-1',
                sublevelId: 'sub-3-2-1',
                title: 'Bug Hunt: Unfreeze the Counter',
                type: 'bug_hunt',
                xpReward: 65,
                description: 'The counter button is broken! The script is querying the wrong button ID, and the textContent increment is using string concatenation instead of numeric addition. Fix both bugs!',
                learningObjectives: [
                  'Fix document.getElementById target',
                  'Ensure numeric calculation with parseInt or Number',
                ],
                hints: [
                  'The button has id="btn-count", but the script looked for "button-counter".',
                  'Make sure count increments by 1 numerically.',
                ],
                bugHuntData: {
                  starterCode: `<div style="text-align: center; padding: 20px;">\n  <h2>Score: <span id="display-count">0</span></h2>\n  <button id="btn-count" style="padding: 10px 20px; background: #3b82f6; color: white; border-radius: 6px; cursor: pointer;">Add Point</button>\n</div>\n\n<script>\n  // BUG: The ID passed to getElementById does not match the button ID!\n  const btn = document.getElementById('wrong-id');\n  const display = document.getElementById('display-count');\n  let score = 0;\n\n  if (btn) {\n    btn.addEventListener('click', () => {\n      score = score + 1;\n      display.textContent = score;\n    });\n  }\n</script>`,
                  brokenDescription: 'Button ID mismatch causes btn to be null, preventing the click event listener from attaching.',
                  expectedBehavior: 'getElementById("btn-count") correctly binds the click listener and increments the score.',
                  testFunction: `(code) => {
                    if (code.includes("'wrong-id'") || code.includes('"wrong-id"')) {
                      return 'The code still references "wrong-id". Change it to "btn-count".';
                    }
                    if (!code.includes('btn-count')) {
                      return 'Must reference the button with id "btn-count".';
                    }
                    if (!code.includes('score = score + 1') && !code.includes('score += 1') && !code.includes('score++')) {
                      return 'Make sure score is incremented on click.';
                    }
                    return true;
                  }`,
                  hints: [
                    'Change document.getElementById("wrong-id") to document.getElementById("btn-count").',
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        id: 'lvl-3-3',
        worldId: 'world-3',
        title: 'Level 3: World Boss Arena',
        order: 3,
        description: 'Comprehensive multi-objective boss battle testing HTML, CSS, and JavaScript mastery.',
        sublevels: [
          {
            id: 'sub-3-3-1',
            levelId: 'lvl-3-3',
            worldId: 'world-3',
            title: '3.1 Boss Mission: The Frontend Overlord',
            order: 1,
            summary: 'Conquer the Frontend Overlord by solving all three system integration challenges.',
            optionalResources: [
              {
                id: 'res-11',
                title: 'Full-Stack JavaScript Integration Review',
                type: 'interactive',
                provider: 'SkillMate Curriculum Team',
                url: 'https://skillmate.dev/curriculum/js-integration',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-3-3-1',
                sublevelId: 'sub-3-3-1',
                title: 'Boss Mission: Defeat The Frontend Overlord',
                type: 'boss_mission',
                xpReward: 150,
                description: 'The Frontend Overlord has locked down the system with three corrupted modules! Fulfill each objective in code to deplete the Overlord’s HP and earn the coveted "Overlord Slayer" Achievement Badge.',
                learningObjectives: [
                  'Integrate semantic HTML, custom CSS variables, and dynamic JavaScript',
                  'Handle user input sanitization and dynamic DOM updates',
                ],
                hints: [
                  'Objective 1: Ensure the form has a submit button with id="boss-submit".',
                  'Objective 2: Define a CSS rule with `color: #10b981;` for the success state.',
                  'Objective 3: Add an event listener to handle form submit and prevent default.',
                ],
                bossMissionData: {
                  bossName: 'The Frontend Overlord',
                  bossTitle: 'Guardian of the Web Gateway',
                  bossHealth: 100,
                  scenarioDescription: 'To pierce the Overlord’s shield, your code must satisfy all three core requirements: structured HTML, styling rules, and clean event handling.',
                  starterCode: `<div id="boss-arena">\n  <header>\n    <h2>Gateway Terminal</h2>\n  </header>\n  \n  <form id="overlord-form">\n    <input type="text" id="passcode" placeholder="Enter override code..." />\n    <!-- Objective 1: Add a submit button with id="boss-submit" -->\n    <button type="submit" id="boss-submit">Override Defense</button>\n  </form>\n  \n  <div id="status-panel" class="success-state">Ready</div>\n</div>\n\n<style>\n  /* Objective 2: Give .success-state a green color (#10b981) */\n  .success-state {\n    color: #10b981;\n    font-weight: bold;\n  }\n</style>\n\n<script>\n  // Objective 3: Intercept submit and call e.preventDefault()\n  const form = document.getElementById('overlord-form');\n  if (form) {\n    form.addEventListener('submit', (e) => {\n      e.preventDefault();\n      document.getElementById('status-panel').textContent = 'GATEWAY UNLOCKED!';\n    });\n  }\n</script>`,
                  objectives: [
                    {
                      id: 'obj-1',
                      description: 'Maintain button element with id="boss-submit"',
                      checkHint: 'Include <button ... id="boss-submit">',
                    },
                    {
                      id: 'obj-2',
                      description: 'Define .success-state with color: #10b981',
                      checkHint: 'Include color: #10b981 in style block',
                    },
                    {
                      id: 'obj-3',
                      description: 'Prevent page reload using e.preventDefault()',
                      checkHint: 'Call e.preventDefault() in submit handler',
                    },
                  ],
                  badgeName: 'Frontend Overlord Conqueror',
                  badgeIcon: 'Crown',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'world-4',
    number: 4,
    title: 'World 4: React & Component Architecture',
    shortDesc: 'Components, JSX, Props, State hooks, conditional rendering, and clean UI patterns.',
    color: 'from-cyan-600 to-blue-700',
    levels: [
      {
        id: 'lvl-4-1',
        worldId: 'world-4',
        title: 'Level 1: React Fundamentals & JSX',
        order: 1,
        description: 'Component lifecycles, virtual DOM concepts, and composable UI blocks.',
        sublevels: [
          {
            id: 'sub-4-1-1',
            levelId: 'lvl-4-1',
            worldId: 'world-4',
            title: '1.1 React Mental Models Quiz',
            order: 1,
            summary: 'Deep-dive into one-way data flow, state immutability, and declarative rendering.',
            optionalResources: [
              {
                id: 'res-12',
                title: 'Official React Documentation: Describing the UI',
                type: 'documentation',
                provider: 'React.dev',
                url: 'https://react.dev/learn/describing-the-ui',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-4-1-1',
                sublevelId: 'sub-4-1-1',
                title: 'React Core Concepts Quiz',
                type: 'quiz',
                xpReward: 50,
                description: 'Verify your understanding of React declarative principles.',
                learningObjectives: [
                  'Understand state immutability',
                  'Recognize why key props are needed for list rendering',
                ],
                hints: ['State in React should never be directly mutated.'],
                quizData: [
                  {
                    id: 'rq-1',
                    question: 'Why should you never mutate state directly (e.g. `user.name = "Bob"`) in React?',
                    type: 'single',
                    options: [
                      'React will crash immediately with a compile error',
                      'React relies on shallow reference equality checks to know when to re-render the UI',
                      'Mutating state directly writes directly to the client disk',
                      'Browsers disable direct object mutation',
                    ],
                    correctAnswerIndices: [1],
                    explanation: 'React compares object references (Object.is) to schedule re-renders. Direct mutations maintain the same reference, so React misses the update.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'world-5',
    number: 5,
    title: 'World 5: APIs, Backend & Cloud Data',
    shortDesc: 'HTTP verbs, REST APIs, JSON parsing, authentication flows, and Cloud Firestore storage.',
    color: 'from-emerald-600 to-teal-800',
    levels: [
      {
        id: 'lvl-5-1',
        worldId: 'world-5',
        title: 'Level 1: Fetching & Data Flow',
        order: 1,
        description: 'Async/await data fetching, handling loading and error UI states.',
        sublevels: [
          {
            id: 'sub-5-1-1',
            levelId: 'lvl-5-1',
            worldId: 'world-5',
            title: '1.1 Fill in Missing Async Fetch',
            order: 1,
            summary: 'Complete a robust API fetch function handling HTTP status and JSON extraction.',
            optionalResources: [
              {
                id: 'res-13',
                title: 'MDN Web Docs: Using the Fetch API',
                type: 'documentation',
                provider: 'MDN',
                url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-5-1-1',
                sublevelId: 'sub-5-1-1',
                title: 'Async/Await Data Retrieval',
                type: 'fill_code',
                xpReward: 55,
                description: 'Fill in the missing keywords to asynchronously fetch user data from the API endpoint and convert the response to JSON.',
                learningObjectives: [
                  'Use async keyword before function declaration',
                  'Use await before fetch and res.json() calls',
                ],
                hints: [
                  'Async functions start with the keyword "async".',
                  'To pause until a Promise resolves, use "await".',
                ],
                fillCodeData: {
                  codeSnippet: `{{blank_1}} function loadUserData(userId) {\n  const response = {{blank_2}} fetch(\`/api/users/\${userId}\`);\n  if (!response.ok) throw new Error('Network error');\n  const data = await response.json();\n  return data;\n}`,
                  blanks: [
                    {
                      id: 'blank_1',
                      placeholder: 'async keyword',
                      correctAnswer: 'async',
                    },
                    {
                      id: 'blank_2',
                      placeholder: 'await keyword',
                      correctAnswer: 'await',
                    },
                  ],
                  explanation: 'Functions declaring async allow using the await keyword inside their body to cleanly handle asynchronous promises.',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'world-6',
    number: 6,
    title: 'World 6: Testing, CI/CD & Production',
    shortDesc: 'Automated testing, Lighthouse performance, accessibility audits, and Cloud deployment.',
    color: 'from-rose-600 to-pink-700',
    levels: [
      {
        id: 'lvl-6-1',
        worldId: 'world-6',
        title: 'Level 1: Production Readiness',
        order: 1,
        description: 'Zero-downtime deployment, environment security, and performance optimization.',
        sublevels: [
          {
            id: 'sub-6-1-1',
            levelId: 'lvl-6-1',
            worldId: 'world-6',
            title: '1.1 Deployment & Security Quiz',
            order: 1,
            summary: 'Verify knowledge of secure API secrets, build minification, and web vitals.',
            optionalResources: [
              {
                id: 'res-14',
                title: 'Google Web Vitals Documentation',
                type: 'documentation',
                provider: 'web.dev',
                url: 'https://web.dev/vitals/',
                isFree: true,
              },
            ],
            activities: [
              {
                id: 'act-6-1-1',
                sublevelId: 'sub-6-1-1',
                title: 'Production Deployment & Security Check',
                type: 'quiz',
                xpReward: 60,
                description: 'Test your understanding of production deployment safety.',
                learningObjectives: [
                  'Safeguard private backend keys from public client code',
                  'Understand Lighthouse Core Web Vitals',
                ],
                hints: ['Never commit sensitive private keys into client repositories.'],
                quizData: [
                  {
                    id: 'dq-1',
                    question: 'Where should sensitive database admin secrets and third-party private API keys reside?',
                    type: 'single',
                    options: [
                      'In client-side JavaScript code so any user can access them',
                      'In a public GitHub README for transparent documentation',
                      'In protected server-side environment variables accessed only by backend runtimes',
                      'Inside the browser localStorage',
                    ],
                    correctAnswerIndices: [2],
                    explanation: 'Secrets must always remain server-side. Anything sent to the client browser can be viewed by anyone.',
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

export const curriculumWorlds = webDevCurriculumWorlds;

export const skillCurricula: Record<string, World[]> = {
  'web-dev': webDevCurriculumWorlds,
  'ui-ux-design': uiuxCurriculumWorlds,
  'python-dev': pythonCurriculumWorlds,
  'data-analysis': dataAnalysisCurriculumWorlds,
  'cloud-devops': cloudDevopsCurriculumWorlds,
};

export const getCurriculumForSkill = (skillId: string = 'web-dev'): World[] => {
  return skillCurricula[skillId] || skillCurricula['web-dev'];
};

export const getPlacementQuestionsForSkill = (skillId: string = 'web-dev'): PlacementQuestion[] => {
  if (skillId === 'ui-ux-design') return uiuxPlacementQuestions;
  if (skillId === 'python-dev') return pythonPlacementQuestions;
  if (skillId === 'data-analysis') return dataAnalysisPlacementQuestions;
  if (skillId === 'cloud-devops') return cloudDevopsPlacementQuestions;
  return placementQuestions;
};
