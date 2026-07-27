# OmniFexa

**Every Tool. One Workspace.**

## Status
Foundation and engineering documentation established

## Overview
Brief product description — mobile-first, privacy-first online tools platform with Result Workspace.

## Tech Stack
| Technology | Version |
| --- | --- |
| Next.js | 16 |
| React | 19 |
| TypeScript | strict |
| Tailwind CSS | v4 |
| ESLint | latest |
| npm | latest |
| Node.js | 24 LTS |

## Project Structure
- `src/app` - Routes
- `src/config` - Site config
- `src/data` - Tool catalog JSON
- `src/lib/tools` - Catalog types and loader
- `.agents/rules/` - Agent specific rules and context
- `docs/` - Detailed documentation

## Available Scripts

```bash
# Start development server (Turbopack)
npm run dev

# Build
npm run build

# Start production server
npm run start

# Lint
npm run lint

# Typecheck
npm run typecheck

# Validate Catalog
npm run validate:catalog

# Run all quality gates
npm run check
```

## Documentation
Please refer to the `docs/` folder for all key documents.

## Security

> **⚠️ Never commit secrets, API keys, tokens, or credentials to this repository.**
>
> Use `.env.local` for local secrets. It is listed in `.gitignore` and will not be tracked.
>
> If you need to document required environment variables, use `.env.example` with placeholder values only.

## License
[Placeholder for future decision]
