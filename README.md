# Minimal Calendar + Quadrant App (MVP)


This repo contains the UI and a Worker API example for a minimal calendar + four-quadrant app designed for Cloudflare Pages + Workers + D1.


### Quick flow to deploy
1. Create a new GitHub repository in your account.
2. Copy the files from this project into that repo, preserving paths.
3. In Cloudflare Dashboard -> Pages -> Create Project -> Connect to your GitHub repo -> Deploy (use the default build command `npm run build`, dist `dist`).
4. In Cloudflare Dashboard -> Workers -> Create a worker and paste `worker/worker.js`. Bind a D1 database to the worker namespace `DB`.
5. In Pages -> Settings -> Functions & Workers -> Attach the worker as `/_api/*` route OR call Worker via a custom domain route. Alternatively use Pages Functions; here we keep API in Workers.


After you finish the fork and deployment steps, tell me and I'll guide you to wire D1 and test signup/login and tasks.
