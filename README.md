# ViviMail

An AI-powered email client. _(Early development.)_

## Tech Stack

- **Frontend:** React + TypeScript, React Router 8 (SPA mode), Vite, Tailwind, shadcn/ui
- **Backend (planned):** Hono, tRPC, Drizzle, PostgreSQL, Better Auth
- **Tooling:** pnpm workspaces, Turborepo, ESLint, Prettier, Vitest + Testing Library, gitleaks
- **Hosting (planned):** AWS (S3 + CloudFront, Lambda, RDS)

## Setup

Requirements: Node 22 (`nvm use`), pnpm 10 (`corepack enable`), [gitleaks](https://github.com/gitleaks/gitleaks) (`brew install gitleaks`).

```bash
git clone https://github.com/vive12345/ViviMail.git
cd ViviMail
pnpm install
cp .env.example .env
pnpm dev
```

Fill in the values in `.env`, and never commit it. Then open http://localhost:5173. The demo inbox is at `/mail/inbox`, with fake data.

## Commands

Run these from the repo root. Turborepo runs each one in every app.

| Command              | What it does                                                                                          |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| `pnpm dev`           | Start the dev server (http://localhost:5173)                                                          |
| `pnpm build`         | Production build                                                                                      |
| `pnpm lint`          | ESLint (warnings fail too)                                                                            |
| `pnpm typecheck`     | Generate route types and run TypeScript                                                               |
| `pnpm test`          | Run all tests once                                                                                    |
| `pnpm test:coverage` | Tests plus coverage table; fails below 70%                                                            |
| `pnpm format`        | Rewrite files with Prettier                                                                           |
| `pnpm format:check`  | Check formatting without changing files                                                               |
| `pnpm fix`           | Auto-fix formatting and lint problems                                                                 |
| `pnpm check`         | **Everything CI checks:** format → lint, typecheck, tests with coverage, build → gitleaks secret scan |

Before every commit:

```bash
pnpm fix
pnpm check
```

If `pnpm check` passes, CI will pass.

### Tests and coverage

- Test files sit next to the code they test: `mail.ts` → `mail.test.ts`.
- Watch mode while coding: `pnpm --filter @vivimail/frontend test:watch`.
- HTML coverage report: after `pnpm test:coverage`, run `open apps/frontend/coverage/index.html`. Green lines were run by a test; red lines weren't.
- Every feature PR includes its tests. CI fails if coverage drops below 70%.

## Contributing

### Branches

| Branch           | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `main`           | Production-ready code. No direct pushes.      |
| `develop`        | Integration branch; feature work merges here. |
| `feature/<name>` | New features                                  |
| `bugfix/<name>`  | Bug fixes                                     |
| `hotfix/<name>`  | Urgent production fixes, branched from `main` |

Flow: `feature/*` → PR → `develop` → PR → `main`

### Commit messages

`type(scope): short description` with types `feat`, `fix`, `refactor`, `docs`, `test` or `chore`.

Example: `feat(mail): add inbox search`

### Pull requests

- Use the PR template.
- Include tests for new code, and run `pnpm check` before pushing.
- 1 approval and passing CI are required before merge.
- `feature/*` → `develop`: **Squash and merge**. `develop` → `main` releases: **Create a merge commit**.
- Link the issue with `Closes #<number>`.

## License

_TBD_
