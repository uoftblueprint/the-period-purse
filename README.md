# The Period Purse

@PLs Please add more details here in the README!

## Structure

- `apps/mobile` — Expo app (SDK 57, React Native 0.86). Routes live in `src/app`.
- `apps/api` — Express server. Entry point is `src/index.js` (`GET /health`).
- `package.json` — npm workspaces for `apps/*`.

## Run

Use Node 22 (`nvm use 22`) from the repo root.

- `npm run dev:server` — API on port 3000
- `npm run ios --workspace mobile` — iOS
- `npm run android --workspace mobile` — Android
