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

## Run locally

### 1. Install Node.js

Use Node.js **22.12 or newer** and npm.

### 2. Install dependencies

From the repository root:

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env`, then fill in the values you need. Keep `.env` private; it is ignored by Git.

- `GEMINI_API_KEY` and `OPENAI_API_KEY` are **server-only** keys used by the backend. You can leave either blank if you do not have that provider configured; some AI endpoints have fallback behaviour.
- `VITE_FIREBASE_*` values must come from a Firebase Web App that you control. They are browser configuration values, not a place to store Gemini or OpenAI secrets.
- The app can use local/demo flows without Firebase credentials, but Google sign-in and cloud-saved progress require Firebase to be configured.

### 4. Configure Firebase (for cloud features)

1. Create or select your own Firebase project.
2. Register a Web App and copy its configuration values into the `VITE_FIREBASE_*` fields in `.env`.
3. Enable Google as a sign-in provider in Firebase Authentication and add your local/deployed domain to Authorized domains.
4. Configure Firestore and review `firebase/firestore.rules` before deploying them. The rules allow users to read their own records and allow an individual public Skill Passport to be read by its document ID; broad user-list queries are disabled.

Do not reuse the previous exported Firebase project's configuration for a public demo unless you own and intend to share that project.

### 5. Start the application

```bash
npm run dev
```

Open `http://localhost:3000`. The Express server hosts the Vite development frontend and the `/api/*` endpoints together.

## Common commands

| Command | What it does |
|---|---|
| `npm run dev` | Starts the Express server with the Vite development frontend |
| `npm run build` | Builds the frontend into the root `dist/` folder |
| `npm start` | Starts Express in production mode and serves the built frontend |
| `npm run lint` | Runs TypeScript type checking |
| `npm run preview` | Previews the Vite frontend only; API routes are not included in this preview server |

Build before running the production server:

```bash
npm run build
npm start
```

Bun users can alternatively run `bun install` using the included `bun.lock`; npm users can use `npm install`.

The `npm start` script sets `NODE_ENV=production` automatically. On your host, make sure you run `npm run build` during the build/deploy step before starting the server.

## Backend API endpoints

- `GET /api/ai-provider-status` — reports the configured AI provider status.
- `POST /api/generate-resources` — generates learning resources for a skill sublevel.
- `POST /api/openai/deep-dive` — generates a deeper explanation for a roadmap node.
- `POST /api/openai/generate-flowchart` — generates a custom skill roadmap/flowchart.

AI-generated content depends on valid server-side provider configuration. Check the terminal logs and the provider status endpoint if generation falls back to curated content.

## Before pushing to GitHub

See [`docs/GITHUB-UPLOAD-GUIDE.md`](docs/GITHUB-UPLOAD-GUIDE.md) for step-by-step upload instructions.

- Confirm that `.env` is not staged; only `.env.example` should be committed.
- Never commit real API keys, OAuth client secrets, passwords, or service-account JSON files.
- Use a Firebase project you control and keep its Firestore rules restrictive. A Firebase web API key is not a server secret, but project configuration and security rules still need proper restrictions.
- The project-specific Firebase configuration from the AI Studio export was removed and replaced with environment variables.
- `docs/reference-images/` contains design/reference screenshots, not runtime dependencies.
- Add a `LICENSE` only after deciding which license you want to apply to this project and its included assets.

## Current implementation notes

- Several curriculum/course/opportunity datasets are kept as TypeScript files in `frontend/src/data/`.
- The Express routes currently live together in `backend/server.ts`. They can be split into `backend/routes/` later if the API grows.
- The original AI Studio scratch/cache directory was excluded from the GitHub-ready package because it contained generated temporary media and duplicate assets.
