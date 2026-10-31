# ViviMail

An AI-powered email client. _(Early development.)_

## Tech Stack

- **Frontend:** React + TypeScript, React Router 7, Vite, Tailwind, shadcn/ui
- **Backend (planned):** Hono, tRPC, Drizzle, PostgreSQL, Better Auth
- **Tooling:** pnpm workspaces, Turborepo, Vitest
- **Hosting (planned):** AWS (S3 + CloudFront, Lambda, RDS)

## Setup

_Coming in phase 1 once the monorepo is set up._

```bash
cp .env.example .env    # fill in values, never commit .env
```

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
- 1 approval and passing CI are required before merge.
- Link the issue with `Closes #<number>`.

## License

_TBD_
