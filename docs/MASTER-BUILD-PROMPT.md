# MASTER BUILD PROMPT — SKILLBRIDGE

Act as a senior full-stack engineer, product designer, UX architect, educational technology specialist, and software architect. Build a complete, modern, responsive, functional web application called **SkillBridge**.

## 1. PROJECT IDENTITY

**Project name:** SkillBridge

**Tagline:** From learning skills to proving skills.

**Product vision:**

SkillBridge is a gamified skill-learning and project-building platform that helps students discover learning resources, choose personalized learning paths, practise through interactive challenges, build complete projects, track their progress, and automatically create a shareable portfolio.

The platform should combine the convenience of a course discovery website, the progression mechanics of a Candy Crush-style game, the interactivity of coding practice platforms, and the portfolio capabilities of a student showcase website.

The final result must feel like one unified educational product, not a collection of unrelated pages.

**Critical product principles:**

1. Skill Level-Up and Project Zone are separate sections with different purposes.
2. Skill Level-Up must support all eight specified activity types, not just Bug Hunts.
3. External learning resources are optional. Students can attempt activities directly.
4. Course Browser is a dedicated feature that searches for free and paid courses across supported external sources.
5. SkillBridge offers four distinct learning modes: Normal, Advanced, Smart and Quick Build.
6. The Skill Passport updates automatically using saved learning achievements and project records.
7. All navigation, buttons, filters, progress tracking, authentication and submission flows must work.
8. Do not create a static mockup with nonfunctional controls or fake application logic.

## 2. REQUIRED TECHNOLOGY STACK

Build a full-stack web application using the technologies supported by Google AI Studio Build mode.

- Frontend: React with TypeScript.
- Styling: Tailwind CSS.
- Backend: Node.js server-side runtime.
- Database: Firebase Cloud Firestore.
- Authentication: Firebase Authentication.
- Routing: React Router or an appropriate routing solution.
- Icons: Lucide React.
- Code editing: A suitable browser code editor, such as Monaco or CodeMirror, when supported.
- Charts: Lightweight charts or visual progress components where appropriate.
- AI integration: Optional Gemini API calls through server-side code only.
- Deployment: Compatible with Google AI Studio's supported deployment options.

Use Firebase for persistent user information, roadmap progress, challenge attempts, project submissions, saved courses and portfolio settings.

Do not place API keys, secrets or privileged database operations in client-side code. Use the server-side runtime for external API integrations and sensitive operations.

If a feature requires credentials or an external service that is not configured, build the correct integration structure and clearly document the required setup. Do not pretend the service is connected.

## 3. DESIGN SYSTEM AND VISUAL DIRECTION

Create a polished, dark-first educational platform with a modern developer-product aesthetic.

Use:

- A charcoal or near-black background.
- Clear white and muted-gray typography.
- Blue and violet accents for interactive elements.
- Green for completed activities.
- Amber for rewards, XP and achievements.
- Rounded cards, subtle borders and restrained shadows.
- Clear typography, comfortable spacing and accessible contrast.
- Consistent icons and visual language.
- Responsive layouts for desktop, tablets and mobile devices.

Avoid excessive gradients, distracting animations, cluttered dashboards and oversized cards.

Use animations selectively for unlocking levels, earning achievements and completing missions. Respect reduced-motion preferences.

The interface should feel professional enough for a real product, with a playful learning experience inside Skill Level-Up.

Use a consistent application shell containing a sidebar or responsive navigation, a page header, the student's profile menu and a main content area.

## 4. MAIN APPLICATION NAVIGATION

Create these primary sections:

1. Dashboard
2. Learn a Skill
3. Skill Level-Up
4. Course Browser
5. Project Zone
6. My Skill Passport
7. Opportunities
8. Profile and Settings

These sections must be connected but must not be merged into one workflow that forces students to complete everything in sequence.

Students should be able to switch between learning, projects, course discovery and their portfolio at any time.

## 5. USER AUTHENTICATION AND PROFILE

Build functional student registration, sign-in, sign-out and authenticated sessions using Firebase Authentication.

Support Google sign-in and email/password authentication where configured.

Each student should have a profile containing:

- Display name.
- Profile image or avatar.
- Short introduction.
- Learning interests.
- Career or learning goals.
- Selected skills.
- Current learning roadmaps.
- Saved courses.
- Learning achievements.
- Project history.
- Skill Passport settings.

Persist all relevant information.

Users must only be able to edit their own private data and submissions. Public portfolio access must follow the student's explicit sharing settings.

Create a useful empty state for a new student who has not started learning.

## 6. DASHBOARD

The dashboard should welcome the student and provide an overview of their learning journey.

Include:

- Continue learning.
- Active roadmaps.
- Current world, level and sublevel.
- Recent activities and results.
- Completed levels.
- XP and achievements.
- Projects in progress.
- Recently completed projects.
- Recommended next action.
- Quick links to Course Browser, Project Zone and Skill Passport.

Every dashboard card and action must navigate to the relevant functional page.

Avoid inventing progress. A new student should see an onboarding state rather than fabricated statistics.

## 7. LEARN A SKILL

Create a skill discovery page where students can search and choose a skill.

Start with Web Development as the primary fully populated demonstration skill. Add extensible categories such as:

- Python Programming.
- Data Analysis.
- UI/UX Design.
- Graphic Design.
- Other technical and creative skills.

Each skill should have metadata such as title, description, difficulty, prerequisite skills and available roadmaps.

When a student selects a skill, display four roadmap options.

### A. Normal Roadmap

A structured route from beginner fundamentals to more advanced knowledge.

Example for Web Development:

HTML → CSS → JavaScript → Git and GitHub → React → APIs → Backend → Database → Deployment.

### B. Advanced Roadmap

Designed for students who already know the fundamentals.

Example:

Advanced JavaScript and TypeScript → React architecture → State management → Backend architecture → Database design → Security → Testing → Performance → Deployment.

### C. Smart Roadmap

Personalizes the learning route based on existing knowledge and the student's goal.

Ask students which skills they know, then provide placement quizzes or practical assessments for relevant topics.

Compare the results with the target skill map and its prerequisites.

For example, a student who knows JavaScript may need HTML, CSS, Git and React, but may not need to repeat demonstrated JavaScript fundamentals.

Allow the student to skip or shorten appropriate introductory topics only when existing knowledge is supported by placement results or relevant completed activities.

The generated path must explain which topics are already demonstrated, which are missing, and why each recommended topic appears in the roadmap.

### D. Quick Build Roadmap

A project-focused, accelerated learning route.

Ask what the student wants to build, then recommend the smallest practical learning sequence for that goal.

Example:

React fundamentals → UI components → Supabase or Firebase → data handling → authentication if required → deployment.

This route should teach essential concepts when needed, rather than require a student to complete an entire traditional curriculum first.

Do not claim that React eliminates HTML and CSS. Include the minimum necessary markup and styling concepts.

### Roadmap system requirements

All four modes must use a shared, configurable roadmap engine.

Roadmaps must be represented as data with prerequisites, topic relationships, learning nodes and completion rules, not four separate hardcoded applications.

For the MVP, implement rule-based matching and placement assessments. AI-based roadmap generation is optional and must not be required for core functionality.

## 8. SKILL LEVEL-UP — CANDY CRUSH-STYLE LEARNING SYSTEM

This is a major feature of SkillBridge.

Build a gamified learning map where students travel through worlds, levels and sublevels.

The hierarchy should be:

**Selected Skill → Roadmap → World → Level → Sublevel → Activities → Completion and Unlocking**

For the Normal Web Development roadmap, begin with these worlds:

### World 1: HTML

Levels and topics:

- Text and headings.
- Paragraphs and text emphasis.
- Links and images.
- Lists.
- Horizontal rules and line breaks.
- Semantic page structure.
- Forms and inputs.

### World 2: CSS

Levels and topics:

- Selectors.
- Colors and typography.
- Box model.
- Margins, padding and borders.
- Display properties.
- Flexbox.
- CSS Grid.
- Responsive design.
- Transitions and basic animation.

### World 3: JavaScript

Levels and topics:

- Variables and data types.
- Operators and expressions.
- Conditions.
- Loops.
- Functions.
- Arrays and objects.
- DOM manipulation.
- Events.
- Asynchronous JavaScript.
- Error handling.

### World 4: Modern Frontend

- React basics.
- Components.
- Props.
- State.
- Hooks.
- Forms.
- Routing.
- Application structure.

### World 5: APIs and Data

- HTTP fundamentals.
- Fetching data.
- Loading and error states.
- Backend fundamentals.
- Databases.
- Authentication.
- Connecting frontend applications to backend services.

### World 6: Testing and Deployment

- Debugging and testing.
- Accessibility basics.
- Production builds.
- Environment configuration.
- Deployment.
- Final integrated assessment.

These are initial curriculum templates. Store their content in data so levels and topics can be expanded or adapted by roadmap mode.

### Candy Crush-style map

Create an attractive visual map with:

- Completed nodes.
- Available nodes.
- Locked nodes.
- The current node.
- World boundaries.
- Progress markers.
- Stars, XP and achievement indicators.
- A clear path between levels.

The map must be responsive and usable on mobile devices.

Do not require students to finish every world before opening the separate Project Zone.

## 9. ALL EIGHT SKILL LEVEL-UP ACTIVITY TYPES

Implement all eight activity types through reusable activity components and a data-driven activity engine.

Each activity must have appropriate instructions, content, interaction, result handling and completion logic.

### Activity 1: Interactive Learning

Allow students to manipulate code or parameters and observe immediate results.

Examples:

- Change HTML elements and see the webpage update.
- Experiment with CSS colors, margins, padding or alignment.
- Change JavaScript values and observe program behaviour.

Use a live preview where appropriate.

### Activity 2: Quizzes and Knowledge Checks

Provide appropriate question formats, including:

- Single-choice questions.
- Multiple-choice questions.
- True/false questions.
- Short-answer questions where suitable.

Automatically grade objectively verifiable answers and provide useful feedback.

### Activity 3: Fill in the Missing Code

Display partially completed code with one or more missing expressions, tags, properties or statements.

Allow the student to complete the code and check the submission against the task's requirements.

### Activity 4: Code Puzzles

Create interactive exercises such as:

- Arranging code fragments in the correct order.
- Matching programming concepts with examples.
- Selecting the correct code structure.
- Sequencing the steps required to produce a result.

Provide appropriate instructions and feedback.

### Activity 5: Bug Hunt Missions

Provide intentionally broken code or faulty behaviour.

Students must find and repair the problem.

Examples:

- Fix a broken HTML link.
- Repair a CSS layout.
- Fix a JavaScript event handler.
- Correct a program that produces the wrong result.

Include starter code, an editable workspace, a preview when appropriate, hints, retries and predefined automated checks.

### Activity 6: Build-from-Scratch Challenges

Ask students to independently write a small, focused piece of code.

Examples:

- Create an HTML form.
- Write a JavaScript function.
- Create a button that updates page content.
- Construct a responsive card layout.

These are short learning activities, not full portfolio projects.

### Activity 7: Predict the Output

Display a code snippet and ask students to predict the result before running it.

Show the actual result after submission and explain why it occurs.

Support appropriate languages and code types in the MVP, beginning with JavaScript.

### Activity 8: Level Challenges and Boss Missions

Provide larger, focused assessments that combine several concepts covered in a level or world.

Examples:

- Repair a supplied article page using HTML headings, paragraphs, links, images and lists.
- Fix a responsive layout with multiple CSS issues.
- Repair a small JavaScript interface with several interacting controls.

**Important separation:** Boss missions test mastery of defined learning objectives. They are not substitutes for the full independent projects in Project Zone.

### Activity engine requirements

Every activity must support configurable:

- Instructions and learning objectives.
- Activity type.
- Starter content or code where relevant.
- Answer format.
- Success conditions.
- Scoring rules.
- Feedback.
- Hints.
- Retry policy.
- XP reward.
- Completion status.

Use one reusable engine rather than creating a separate application for each sublevel.

Not every sublevel must contain all eight activity types. Select suitable activities for the concept, and configure which activities are required for completion.

### Progression rules

- External resources are optional.
- Students can begin an activity without watching a video.
- Failed attempts provide feedback and allow retries.
- Passing an activity records the result.
- Required activity completion unlocks the next sublevel when its prerequisites are satisfied.
- Required sublevels and level assessments unlock subsequent levels.
- World completion can require a configured final assessment.

Save progress in Firestore so that it persists across sessions.

### Code safety

Run HTML, CSS and JavaScript previews inside a restricted sandboxed browser environment.

Do not execute arbitrary student-submitted code directly on the backend server.

Use deterministic, task-specific checks. Do not rely on superficial string matching when the task requires checking actual behaviour.

For unsupported execution environments, provide a clear implementation or configuration requirement instead of pretending code is safely executed.

## 10. OPTIONAL LEARNING RESOURCES INSIDE EACH SUBLEVEL

Every sublevel should have an optional learning resources panel.

Include relevant links to:

- YouTube tutorials.
- Official documentation.
- Written tutorials.
- Articles.
- Interactive coding exercises.
- Related free and paid courses.

Display provider, title, resource type and known price information where available.

Students can open a resource, skip it, or return to it whenever they want.

Opening or completing a resource must never be a mandatory condition for unlocking a level.

This contextual resource panel is distinct from the dedicated Course Browser.

## 11. COURSE BROWSER — DEDICATED INTERNET COURSE DISCOVERY

Build a fully separate Course Browser section.

Its purpose is to help students search broadly for courses related to any skill, compare options across supported providers, and find free and paid learning opportunities.

### Search interface

Include:

- Search input for skills, technologies and course names.
- Free-only filter.
- Paid-only filter.
- All-prices option.
- Difficulty filter.
- Provider filter.
- Language filter.
- Course format filter.
- Sorting by relevance, price where known, or duration where known.
- Saved courses and bookmarks.

### Course result cards

Where the data exists, display:

- Course title.
- Provider.
- Description.
- Skill or topic.
- Free or paid status.
- Actual listed price and currency.
- Difficulty.
- Language.
- Duration.
- Rating and review count only when provided by a reliable source.
- Original course URL.
- Last checked date or freshness indicator.

Selecting a result opens a detailed course page or its original provider page.

### Course Browser integrations

Create a provider-adapter architecture on the server.

Use official APIs and permitted data sources where available. For example, support YouTube Data API search for video resources and allow additional provider-specific integrations to be configured using their official interfaces.

Store external API credentials as server-side secrets.

Where a search provider requires a key that has not been configured, show a clear setup message and keep other working sources available.

Provide a curated sample dataset for development and demonstration, but visibly distinguish sample data from live search results.

Never invent course titles, providers, prices, ratings, availability or URLs.

The feature should aim for broad coverage across course providers, but must not claim to index every course on the internet. Course platforms do not all expose the same search interfaces or data.

### Saved courses

Allow students to bookmark a course and associate it with their active roadmap or a particular topic.

A saved course is a personal bookmark; it does not mean the student has completed that course.

## 12. PROJECT ZONE — A SEPARATE FULL-PROJECT SECTION

Do not mix Project Zone with Skill Level-Up.

Skill Level-Up is for learning concepts through small activities and focused assessments.

Project Zone is for students to build complete products.

### Project categories

Include:

- HTML Projects.
- CSS Projects.
- JavaScript Projects.
- React Projects.
- Backend and Database Projects.
- Integrated Web Development Projects.

Examples:

HTML:
- Personal profile website.
- Recipe website.
- Simple multi-page blog.

CSS:
- Responsive portfolio.
- Product landing page.
- Responsive showcase website.

JavaScript:
- Calculator.
- Quiz application.
- Task manager.
- Expense tracker.

React:
- Movie search application.
- Student dashboard.
- Task management application.

Backend and Database:
- Notes application.
- Registration system.
- CRUD application.

Integrated Web Development:
- Job portal prototype.
- Community project platform.
- Complete data-driven web application.

### Project browsing

Provide:

- Project categories.
- Difficulty levels.
- Technology tags.
- Search and filtering.
- Project descriptions.
- Required features.
- Suggested technologies.
- Completion requirements.
- Optional reference resources.

### Project details and submissions

Every project detail page should contain:

1. Project overview.
2. Problem to solve.
3. Required functionality.
4. Suggested technologies.
5. Expected deliverables.
6. Useful references where relevant.
7. Progress status.
8. Submission form.

Allow students to record project details, provide a GitHub or repository URL, provide a deployed URL, upload supported files where configured, and attach screenshots.

Support statuses such as Not Started, In Progress and Completed.

For the initial version, students can complete and record their own projects without requiring admin review. Label the source accurately as student-submitted work; do not imply independent verification.

Projects must remain distinct from small build-from-scratch activities inside Skill Level-Up.

Students may enter Project Zone at any time, regardless of their current learning level.

## 13. AUTOMATIC SKILL PASSPORT AND READY-MADE PORTFOLIO

This feature connects Skill Level-Up, Project Zone and the student profile.

Create a polished Skill Passport that is automatically populated from the student's stored records.

### Learning records

Record:

- Selected skill and roadmap mode.
- Completed topics and levels.
- Mission attempts and results.
- Relevant assessment results.
- XP and badges.
- Completion dates.

### Project records

Record:

- Project title and description.
- Technologies used.
- Project status.
- Submitted repository or deployment link.
- Supporting screenshots or files where available.
- Completion date.

### Automatically generated portfolio

Provide a ready-made portfolio template containing:

- Student name and profile.
- Short introduction.
- Career goal.
- Skills and their learning statuses.
- Learning achievements.
- Featured projects.
- Project descriptions.
- Repository and deployed project links.
- Relevant badges and milestones.

Update the generated profile and portfolio automatically when saved records change.

Do not require the student to manually add each completed level or qualifying project to the portfolio.

### Important distinctions

Display clearly whether a record represents:

- A topic studied.
- A mission passed.
- A level completed.
- A project recorded.
- A skill demonstrated through a specified assessment.

Do not automatically label a skill as independently verified just because a student completed a course or uploaded a project.

### Sharing and privacy

Allow students to:

- Preview their portfolio.
- Edit their introduction and profile details.
- Choose which projects to feature.
- Choose which sections appear publicly.
- Generate or enable a shareable public profile link.

Keep private records inaccessible to other students and public visitors unless the student explicitly shares them.

## 14. PROGRESS DASHBOARD AND GAMIFICATION

Create a consistent progression and reward system.

Include:

- XP and points for qualifying activities.
- Stars based on configurable performance criteria.
- Achievement badges.
- World-completion milestones.
- Level maps and unlock indicators.
- Mission history.
- Personal progress summaries.
- Current and next learning goals.
- Project completion indicators.
- A resume-learning action.

Do not introduce punishment mechanics that permanently remove progress when a student fails.

Allow retries and use clear feedback to support learning.

Use server-validated progression and reward rules so that users cannot obtain arbitrary completion status by modifying client-side state.

## 15. OPPORTUNITY MATCHING

Include an Opportunities section from the original SkillBridge concept.

The section should eventually help students discover:

- Internships.
- Competitions.
- Volunteering opportunities.
- Community projects.
- Student project contributions.

Match opportunities using relevant student interests, career goals, demonstrated activities and project experience.

Show why an opportunity is relevant to a student.

Use real links and reliable sources when configured. Clearly label any sample opportunity data used for the initial demonstration. Do not invent currently active internships, deadlines or eligibility requirements.

Keep this section modular so that it can be expanded after the core learning and portfolio system works.

## 16. AUTOMATIC DATA MODEL AND PERSISTENCE

Design a sensible Firestore data structure for the application.

Include collections or equivalent structures for:

- users and profiles.
- skills and prerequisites.
- roadmap templates.
- roadmap nodes.
- user-selected roadmaps.
- topic progress.
- missions and activities.
- mission attempts.
- learning resources.
- course search results where appropriate.
- saved courses.
- project definitions.
- student project submissions.
- badges and rewards.
- passport and public sharing settings.
- opportunities and saved opportunities.

Use unique identifiers and appropriate references between records.

Avoid duplicating portfolio data that can be derived from the student's learning and project records.

Build appropriate Firestore security rules so students can access their own private information and only public portfolio information is exposed to viewers.

Validate server-side progression events and submissions. Do not trust client-side claims of completion without checking the relevant conditions.

## 17. CONTENT MANAGEMENT

Make learning content data-driven.

A mission should be defined by its:

- Skill.
- Roadmap.
- World, level and sublevel.
- Activity type.
- Instructions.
- Starter content.
- Required behaviour.
- Grading criteria.
- Feedback and hints.
- Reward.
- Unlocking rules.

Create an extensible structure so that new worlds, levels, sublevels and activities can be added without redesigning the entire application.

If practical, provide a protected admin-only interface for managing curriculum content and project definitions. Public students must never be able to edit official mission definitions.

Do not make the entire platform depend on AI generation. Seed curriculum content and deterministic evaluation rules for the MVP.

## 18. INITIAL DEMONSTRATION CONTENT

The first version must include real working demonstration content rather than empty placeholders everywhere.

Seed the application with:

- Web Development as the primary skill.
- Normal, Advanced, Smart and Quick Build roadmap templates.
- HTML, CSS and JavaScript curriculum worlds.
- Multiple levels and sublevels.
- Optional contextual learning resources.
- At least one functional demonstration of each of the eight activity types.
- A small collection of realistic project briefs.
- An operational course search interface with configured sources where available and clearly labelled sample data as fallback.
- A working Skill Passport with automatic updates.

Ensure that a student can complete at least one end-to-end learning path and one independent project.

## 19. EXPECTED USER WORKFLOW

Implement the following complete student journey:

1. Open SkillBridge.
2. Register or sign in.
3. Choose a skill.
4. Select Normal, Advanced, Smart or Quick Build.
5. Complete relevant initial setup or placement assessment.
6. View the resulting roadmap.
7. Open a world, level and sublevel.
8. Optionally open learning resources.
9. Complete supported activities such as quizzes, fill-in-code exercises, puzzles, Bug Hunts and coding challenges.
10. Receive results and feedback.
11. Pass required activities and unlock subsequent sublevels.
12. Complete a level assessment where required.
13. Access Project Zone whenever desired.
14. Select a complete project and read its requirements.
15. Build the project independently.
16. Save the submission and completion status.
17. See the profile and Skill Passport update automatically.
18. Customise and share a portfolio.
19. Return later and resume saved progress.

Students must not be forced to complete every roadmap before starting a project.

## 20. IMPORTANT IMPLEMENTATION RULES

- Generate functional application code, not just a visual concept or a list of instructions.
- Create reusable components for each activity type.
- Keep roadmap content separate from rendering logic.
- Keep Skill Level-Up and Project Zone clearly separate in the interface and data model.
- Persist student progress and submissions in Firestore.
- Keep external learning resources optional.
- Do not generate fake course results or pretend to connect APIs that are not configured.
- Never expose secrets in client-side bundles.
- Implement loading, error, empty and success states.
- Validate user input and handle failed requests.
- Use server-side permissions and secure Firestore rules.
- Keep the app responsive and accessible.
- Avoid fake buttons, hardcoded success messages and nonfunctional placeholder routes.
- If a feature needs unavailable external credentials, provide a clear configuration path and a fallback that is explicitly labelled as demo data.
- Use realistic seed data for development and identify it as sample content where appropriate.
- Ensure the core app works without optional AI features being enabled.

## 21. ACCEPTANCE CRITERIA

Consider the first version successful only when the following work:

1. Students can register and log in.
2. Students can select a skill and choose a roadmap mode.
3. The roadmap map displays worlds, levels, sublevels and locked stages.
4. Smart Roadmap can use initial skill information and placement results to adapt the path.
5. All eight activity types have functional implementations and representative sample content.
6. Optional learning resources do not block progression.
7. Mission checks update saved student progress correctly.
8. Completed activities unlock the appropriate next stages.
9. The separate Project Zone supports complete project briefs and student submissions.
10. The Course Browser supports searching and filtering its available course sources.
11. Unconfigured external integrations are identified clearly rather than simulated as live.
12. The Skill Passport updates using saved learning achievements and project records.
13. Public portfolio sharing respects student privacy settings.
14. Dashboard statistics reflect actual stored information.
15. Authentication, routes, forms and navigation work end to end.
16. The application can be previewed and its code can be exported or deployed.

## 22. EXECUTION INSTRUCTIONS

Begin implementing the application in the current Google AI Studio Build workspace.

First, establish the shared application structure, visual design, Firebase setup and persistent data model.

Then implement the functional user journey, roadmap engine, Skill Level-Up activities, Course Browser, Project Zone and automatic Skill Passport.

Keep all features within one coherent application. Use modular code and reusable data-driven components.

Test the implemented flows and fix errors encountered during development. Do not stop after displaying the first screen.

If the entire specification cannot be completed in a single generation, prioritize a genuinely functional end-to-end MVP and leave the remaining capabilities clearly structured for subsequent implementation. Preserve the complete information architecture and the separation between Skill Level-Up, Project Zone, Course Browser and Skill Passport.

**Final objective:** Deliver a polished, working SkillBridge web application that takes a student from choosing a skill through personalized learning, interactive skill practice and complete project building to an automatically generated, shareable portfolio.