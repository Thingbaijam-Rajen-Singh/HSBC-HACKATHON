# SkillMate

SkillBridge is a personalized, gamified skill-development platform that transforms how students learn, practise, and demonstrate their abilities. It turns skill development into an interactive journey where students follow adaptive roadmaps, solve coding challenges, and build practical projects instead of simply consuming courses and collecting certificates.

It brings together four personalized learning pathways, a Candy Crush-inspired progression system, eight interactive challenge types, cross-platform course discovery, independent project building, and an automatically generated Skill Passport to connect learning with tangible outcomes. By adapting to what students already know and documenting what they accomplish, SkillBridge helps them turn learning progress into a portfolio of practical skills and real projects.

## Tech stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express, TypeScript via `tsx`
- **Authentication and data:** Firebase Authentication and Cloud Firestore
- **AI features:** OpenAI API with Gemini fallback for learning-resource and roadmap generation
- **Local demo behaviour:** profiles and progress also use browser local storage in demo/guest flows

## Project layout

```text
SkillBridge/
├── backend/
│   └── server.ts                 # Express API and frontend-serving server
├── frontend/
│   ├── index.html                # Vite HTML entry point
│   ├── public/
│   │   └── images/               # Static images copied into the production build
│   └── src/
│       ├── components/           # Screens and reusable UI components
│       │   └── activities/       # The interactive practice activity components
│       ├── context/              # Authentication and learning-progress state
│       ├── data/                 # Curriculum, skill, course, project and opportunity data
│       ├── lib/                  # Firebase client setup and helpers
│       ├── types/                # Shared TypeScript types
│       ├── App.tsx               # Main application and navigation
│       ├── main.tsx              # Frontend entry point
│       └── index.css             # Global styles
├── firebase/
│   ├── firestore.rules           # Firestore access and validation rules
│   └── firebase-blueprint.json   # Data model/schema reference
├── scripts/
│   └── start-production.mjs      # Starts Express with production settings
├── docs/
│   ├── GITHUB-UPLOAD-GUIDE.md    # Beginner-friendly GitHub publishing steps
│   ├── MASTER-BUILD-PROMPT.md    # Original AI Studio build prompt
│   └── reference-images/         # Design screenshots; not used by the running app
├── .env.example                 # Safe configuration template (copy to .env)
├── package.json
├── tsconfig.json
└── vite.config.ts
```
Core Workflow
                              USER
                                |
                                v
                     +----------------------+
                     |    Register / Login  |
                     +----------------------+
                                |
                                v
                     +----------------------+
                     |   Student Dashboard  |
                     +----------------------+
                                |
           +--------------------+--------------------+
           |                    |                    |
           v                    v                    v
 +------------------+  +------------------+  +------------------+
 |   Select a Skill |  |  Course Browser  |  | Opportunity      |
 +------------------+  +------------------+  | Discovery        |
           |           |                  |  +------------------+
           |           v                  |           |
           |  +----------------------+   |           v
           |  | Search Free & Paid    |   |  +------------------+
           |  | Courses               |   |  | Find Relevant    |
           |  +----------------------+   |  | Internships,     |
           |           |                  |  | Competitions &   |
           |           v                  |  | Projects         |
           |  +----------------------+   |  +------------------+
           |  | Filter, Compare      |   |
           |  | & Save Courses       |   |
           |  +----------------------+   |
           |                              |
           v                              |
 +--------------------------+             |
 | Choose Learning Roadmap  |             |
 +--------------------------+             |
           |                              |
     +-----+---------+---------+          |
     |               |         |          |
     v               v         v          |
+------------+ +-----------+ +------------------+
|   Normal   | | Advanced  | | Smart Roadmap    |
|  Roadmap   | | Roadmap   | +------------------+
+------------+ +-----------+          |
     |               |                v
     |               |      +----------------------+
     |               |      | Assess Existing Skills|
     |               |      | & Identify Gaps      |
     |               |      +----------------------+
     |               |                |
     +-------+-------+----------------+
             |
             v
  +--------------------------+      +------------------+
  | Generate Learning Path   |<-----| Quick Build      |
  +--------------------------+      | Roadmap          |
             ^                      +------------------+
             |                               |
             |                               v
             |                    +----------------------+
             +--------------------| Choose Product Goal  |
                                  | & Essential Tech      |
                                  +----------------------+
             |
             v
  +--------------------------+
  |   Skill Level-Up Map      |
  +--------------------------+
             |
             v
  +--------------------------+
  | Worlds -> Levels         |
  | -> Sublevels              |
  +--------------------------+
             |
    +--------+-----------------------------------------------+
    |        |        |        |        |        |       |    |
    v        v        v        v        v        v       v    v
+--------+ +------+ +------+ +------+ +------+ +------+ +------+ +--------+
|Inter-  | |Quiz &| |Fill  | |Code  | |Bug   | |Build | |Predict| |Level   |
|active  | |Know- | |Missing| |Puzzles| |Hunt  | |from  | |Output | |Boss    |
|Learning| |ledge | |Code  | |      | |      | |Scratch| |      | |Missions|
+--------+ +------+ +------+ +------+ +------+ +------+ +------+ +--------+
    |        |        |        |        |        |       |       |
    +--------+--------+--------+--------+--------+-------+-------+
                                  |
                                  v
                      +--------------------------+
                      | Complete Required        |
                      | Activities               |
                      +--------------------------+
                                  |
                                  v
                      +--------------------------+
                      |  Requirements Passed?    |
                      +--------------------------+
                             /           \
                           NO             YES
                           |               |
                           v               v
                +----------------+  +------------------------+
                | Feedback, Hints|  | Save Progress, XP      |
                | & Retry        |  | & Unlock Next Level    |
                +----------------+  +------------------------+
                           |               |
                           +----->         |
                                           v
                              +--------------------------+
                              | Update Skill Passport    |
                              +--------------------------+
                                           |
                                           v
                              +--------------------------+
                              | Automatically Update     |
                              | Profile & Portfolio      |
                              +--------------------------+
                                           |
                                           v
                              +--------------------------+
                              | Preview & Share Skill    |
                              | Passport                 |
                              +--------------------------+


                   SEPARATE PROJECT ZONE
                   (Accessible at any time)

                     +----------------------+
                     | Separate Project Zone|
                     +----------------------+
                                |
                                v
                     +----------------------+
                     | Choose a Complete    |
                     | Project               |
                     +----------------------+
                                |
                                v
                     +----------------------+
                     | Build, Test &         |
                     | Complete Project     |
                     +----------------------+
                                |
                                v
                     +----------------------+
                     | Save Project         |
                     | & Evidence           |
                     +----------------------+
                                |
                                +-----------> Update Skill Passport


                   OPTIONAL LEARNING RESOURCES

                     +----------------------+
                     | YouTube Videos        |
                     | Courses & Articles    |
                     | Documentation         |
                     +----------------------+

                     Resources can be skipped.
                     They do not block missions
                     or level progression.






