# Contributor Guidelines

## Getting Started
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server

## Branch Naming Conventions
- `feat/feature-name`
- `fix/bug-name`
- `docs/doc-name`
- `chore/chore-name`

## Commit Message Format
Use Conventional Commits (e.g., `feat: add new tool`, `fix: resolve crash`).

## Code Quality Gates
Run `npm run check` before submitting code. This runs:
1. `validate:catalog`
2. `lint`
3. `typecheck`
4. `build`

## PR Process
Submit a Pull Request with a clear description of the changes and wait for reviews.

## Security
- NEVER commit secrets.
- Use `.env.local` for local secrets.
- Use `.env.example` for placeholders.

## Dependency Policy
No new dependency without a license and maintenance review.
