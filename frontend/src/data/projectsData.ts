import { ProjectDefinition } from '../types';

export const availableProjects: ProjectDefinition[] = [
  {
    id: 'proj-html-profile',
    title: 'Personal Developer Profile Page',
    category: 'HTML',
    difficulty: 'Beginner',
    shortDesc: 'A multi-section semantic HTML portfolio presenting your developer biography, skills, and contact links.',
    problem: 'Recruiters and open-source project owners need a clean, structured, accessible landing page to review a developer’s bio, projects, and contact channels.',
    requiredFeatures: [
      'Semantic document structure using <header>, <nav>, <main>, <section>, and <footer>',
      'At least three distinct sections: About Me, Skills / Learning Roadmap, and Contact Information',
      'Accessible hyperlinks opening social profiles with rel="noopener noreferrer"',
      'Clean contact form with name, email, and message inputs with appropriate input types and labels',
    ],
    suggestedStack: ['HTML5', 'Semantic Tags', 'Basic CSS Styling'],
    expectedDeliverables: [
      'GitHub repository with clear README documentation',
      'Deployed preview link (e.g. GitHub Pages, Vercel, or Cloud Run)',
      'Lighthouse accessibility score of 95+',
    ],
    learningReferences: [
      { title: 'MDN: Semantic HTML Guide', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics' },
      { title: 'Web.dev: Accessible Forms', url: 'https://web.dev/learn/forms/' },
    ],
  },
  {
    id: 'proj-html-recipe',
    title: 'Culinary Recipe & Nutrition Journal',
    category: 'HTML',
    difficulty: 'Beginner',
    shortDesc: 'Structured multi-page website showcasing recipes, ingredient checklists, step-by-step instructions, and tables.',
    problem: 'Cooking enthusiasts require organized, easy-to-read recipe sheets with accurate measurement tables and semantic instruction lists.',
    requiredFeatures: [
      'Multi-page navigation linking home, appetizers, main courses, and desserts',
      'HTML <table> displaying ingredient nutritional breakdowns and cooking times',
      'Ordered <ol> and unordered <ul> lists for steps and preparation notes',
      'Responsive media: high quality food imagery with descriptive alt attributes',
    ],
    suggestedStack: ['HTML5', 'HTML Tables', 'Semantic Landmarks'],
    expectedDeliverables: [
      'Git repository with at least 3 linked HTML recipe pages',
      'Working cross-page navigation bar',
    ],
    learningReferences: [
      { title: 'MDN: HTML Tables basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics' },
    ],
  },
  {
    id: 'proj-css-landing',
    title: 'Modern Responsive SaaS Landing Page',
    category: 'CSS',
    difficulty: 'Intermediate',
    shortDesc: 'A high-converting SaaS landing page with responsive navigation, hero banner, feature grid, and pricing cards.',
    problem: 'Startups need a visually compelling, mobile-friendly landing page that clearly presents product benefits, testimonials, and tiered pricing.',
    requiredFeatures: [
      'Fully responsive navigation with a mobile hamburger toggle layout',
      'Hero banner featuring headline, CTA button, and product mockup showcase',
      'Feature section powered by CSS Grid with auto-fit responsive columns',
      'Interactive pricing comparison table with a highlighted "Most Popular" tier and hover animations',
    ],
    suggestedStack: ['Modern CSS3', 'Flexbox', 'CSS Grid', 'Media Queries'],
    expectedDeliverables: [
      'Live deployed site verified on mobile (375px), tablet (768px), and desktop (1280px)',
      'Well-organized CSS file using custom CSS variables for color scheme',
    ],
    learningReferences: [
      { title: 'CSS Tricks: CSS Grid Complete Guide', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' },
      { title: 'Kevin Powell: Responsive Design Fundamentals', url: 'https://www.youtube.com/@KevinPowell' },
    ],
  },
  {
    id: 'proj-js-task-tracker',
    title: 'Smart Task & Priority Manager',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    shortDesc: 'Interactive productivity application featuring task creation, tag filters, completion toggles, and localStorage persistence.',
    problem: 'Students and remote workers struggle with daily focus and need a reliable offline-capable task tracking tool with progress indicators.',
    requiredFeatures: [
      'Add, edit, toggle complete, and delete tasks with instant DOM updates',
      'Filter tasks by status (All, Active, Completed) and priority tags (High, Medium, Low)',
      'Calculate and display a live completion percentage progress bar',
      'Persist all tasks in browser localStorage so data survives page refreshes',
    ],
    suggestedStack: ['Vanilla JavaScript ES6+', 'DOM APIs', 'Web Storage API', 'CSS'],
    expectedDeliverables: [
      'Working interactive application repository',
      'Test notes demonstrating data persistence across tab refreshes',
    ],
    learningReferences: [
      { title: 'MDN: Web Storage API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API' },
      { title: 'JavaScript.info: Event Delegation', url: 'https://javascript.info/event-delegation' },
    ],
  },
  {
    id: 'proj-react-movies',
    title: 'Movie & Media Explorer',
    category: 'React',
    difficulty: 'Intermediate',
    shortDesc: 'Dynamic media discovery application with live search debounce, modal detail views, and favorite bookmarks.',
    problem: 'Film buffs need a fast, responsive interface to discover trending movies, read plot summaries, and bookmark favorites to their personal watchlist.',
    requiredFeatures: [
      'Search input with debounce to query external movie API (or mock catalog)',
      'Responsive poster card grid displaying ratings, release years, and genre chips',
      'Modal window showing full movie backdrop, cast list, and overview plot',
      'Add to Watchlist toggle state stored with React state / localStorage',
    ],
    suggestedStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Lucide Icons'],
    expectedDeliverables: [
      'React application with modular component architecture',
      'Custom hook for API data fetching with loading and error states',
    ],
    learningReferences: [
      { title: 'React.dev: Extracting State Logic into a Reducer', url: 'https://react.dev/learn/extracting-state-logic-into-a-reducer' },
    ],
  },
  {
    id: 'proj-backend-notes',
    title: 'Secure Cloud Notes & Collaboration Web App',
    category: 'Backend & Database',
    difficulty: 'Advanced',
    shortDesc: 'Full-stack application featuring user authentication, encrypted notes, real-time Firestore synchronization, and search.',
    problem: 'Teams and individuals require secure note-taking where content is encrypted in transit, isolated per authenticated user, and synced in real-time.',
    requiredFeatures: [
      'Firebase Authentication (Google / Email sign-in)',
      'CRUD operations against Cloud Firestore database',
      'Attribute-Based security rules enforcing owner-only read and write access',
      'Rich text or markdown note editing with tag categorization and instant search',
    ],
    suggestedStack: ['React', 'Firebase Auth', 'Cloud Firestore', 'Tailwind CSS'],
    expectedDeliverables: [
      'Production deployment with hardened Firestore security rules',
      'Security verification demonstrating unauthorized users cannot read another user’s notes',
    ],
    learningReferences: [
      { title: 'Firebase Firestore Web Documentation', url: 'https://firebase.google.com/docs/firestore' },
      { title: 'Firebase Security Rules Best Practices', url: 'https://firebase.google.com/docs/rules' },
    ],
  },
  {
    id: 'proj-fullstack-skillbridge',
    title: 'Integrated Student Showcase & Portfolio Platform',
    category: 'Integrated Web Development',
    difficulty: 'Advanced',
    shortDesc: 'End-to-end web application combining authenticated roadmaps, live challenge evaluations, and public portfolio links.',
    problem: 'Educators and self-taught developers need a unified platform that bridges learning with tangible project proof and sharable credentials.',
    requiredFeatures: [
      'User registration, profile customization, and career goal setting',
      'Interactive skill roadmap with real-time progress calculations',
      'Project submission portal recording GitHub repositories and live demo links',
      'Automatic Skill Passport generation with public sharing privacy controls',
    ],
    suggestedStack: ['React', 'TypeScript', 'Firebase Auth & Firestore', 'Tailwind CSS'],
    expectedDeliverables: [
      'Full-stack deployed web application',
      'Shareable public portfolio link with verified badges',
    ],
    learningReferences: [
      { title: 'SkillMate Architecture Specification', url: 'https://skillmate.dev/architecture' },
    ],
  },
];
