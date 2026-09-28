# The Period Purse

One repo, two apps. The mobile app is TypeScript and Expo, and it builds for both iOS and Android. The API is a small Node server.

## Structure

- `apps/mobile` — Expo app (SDK 57, React Native 0.86). Routes live in `src/app`.
- `apps/api` — Express server. Entry point is `src/index.js` (`GET /health`).
- `package.json` — npm workspaces for `apps/*`.

## Run

Use Node 22 (`nvm use 22`) from the repo root.

- `npm run dev:server` — API on port 3000
- `npm run ios --workspace mobile` — iOS
- `npm run android --workspace mobile` — Android
