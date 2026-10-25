# Code audit and follow-up checklist

This is a practical review of the exported project before publishing it to GitHub. It is not a full security audit or a guarantee that every feature works in production.

## What the app contains

- A React + TypeScript interface for learning roadmaps, practice activities, course discovery, projects, opportunities, user profiles, and a Skill Passport.
- An Express server which serves the app and exposes four AI-related API endpoints.
- Firebase Authentication and Firestore integration for signed-in users, with local-storage state used by demo/guest flows.
- Built-in curriculum and sample content in `frontend/src/data/`.

## Changes made for this GitHub-ready copy

- Split the app into `frontend/`, `backend/`, `firebase/`, `docs/`, and `scripts/`.
- Moved the hero illustration to `frontend/public/images/` and changed its reference to a URL that Vite includes in production builds.
- Moved unused AI Studio screenshot assets to `docs/reference-images/` and preserved the original build prompt in `docs/MASTER-BUILD-PROMPT.md`.
- Excluded `.aistudio/` temporary working files and duplicate media from this package.
- Removed the exported project's hard-coded Firebase configuration. The app now reads Firebase web configuration from `VITE_FIREBASE_*` environment variables.
- Corrected Firestore update rules to compare against `resource.data` instead of the unsupported `existing()` expression.
- Disabled broad listing of `/users` documents while keeping direct reads governed by owner/public-portfolio rules.
- Added README, architecture, setup, and GitHub publishing instructions.

## Important checks before a public deployment

1. **Protect the AI endpoints.** The four `/api/*` endpoints currently do not require sign-in and do not have rate limiting. A public deployment could be called repeatedly by other people and consume your Gemini/OpenAI quota. Add a suitable rate limit, request validation, and—if appropriate—authentication before deploying with paid API keys.
2. **Configure Firebase deliberately.** Use your own Firebase project, enable only the required sign-in providers, review the Firestore rules, and restrict the project/API usage as appropriate. The browser Firebase config is client-visible by design; the Gemini and OpenAI API keys must remain server-only.
3. **Choose a single product name.** The interface says SkillMate, while project metadata and several prompts say SkillBridge. Standardize the public name so the repository, UI, title, and documentation agree.
4. **Run a real build and type check.** Dependencies were not installed in this review environment because package installation timed out. A TypeScript syntax parse and JSON validation succeeded, but `npm run build` and `npm run lint` have not been verified here. After downloading the repository, run `npm install`, `npm run lint`, and `npm run build` and fix any dependency/type/build errors before release.
5. **Decide on a license.** The source has some generated-file license annotations, but the repository did not include a complete root license file. Add one only after deciding how the source and included assets may be reused.

## What is not a secret

Firebase Web App settings commonly appear in browser code, so the configuration fields are not server secrets. They still identify a project, and access must be controlled by Firebase Authentication, restrictive Firestore rules, and appropriate API restrictions. Never put a Gemini or OpenAI secret in a `VITE_` variable because Vite exposes `VITE_` values to browser code.
