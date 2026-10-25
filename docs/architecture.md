# Architecture overview

## Request flow

```text
Browser
  └─ React UI (frontend/src)
       ├─ Firebase Authentication / Firestore (optional cloud persistence)
       └─ HTTP requests to /api/*
            └─ Express server (backend/server.ts)
                 ├─ OpenAI, when configured
                 ├─ Gemini fallback, when configured
                 └─ curated fallback responses for supported AI routes
```

## Main frontend areas

- `components/`: the dashboard, roadmap views, course browser, project area, profile, opportunities, and Skill Passport.
- `components/activities/`: individual interactive exercises such as quizzes, bug hunts, code puzzles, fill-in-code, build challenges, and output prediction.
- `context/`: React context for user authentication/profile and progress state.
- `data/`: built-in curriculum, skill, course, opportunity, and project definitions.
- `lib/`: Firebase initialization and helpers.
- `types/`: shared TypeScript interfaces and activity data types.

## Backend routes

`backend/server.ts` serves the Vite frontend in development and the compiled `dist/` output in production. It also defines the AI-related Express endpoints listed in the root README. API keys are read from server environment variables and must not be exposed through `VITE_` variables.

## Firebase data

`firebase/firestore.rules` documents access rules for profiles, progress, project submissions, saved courses, and the test connection document. Read and understand these rules before deploying them to a real Firebase project. If your project uses a named Firestore database instead of `(default)`, configure `VITE_FIREBASE_DATABASE_ID` and deploy the rules to that same database.
