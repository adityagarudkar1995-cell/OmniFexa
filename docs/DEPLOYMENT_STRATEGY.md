# Deployment Strategy

## Target Platforms
- **Source Code**: GitHub
- **Hosting**: Hostinger

## Environments
- **Development**: Local environment.
- **Staging**: Preview deployments for PRs.
- **Production**: Main live environment.

## CI/CD Pipeline
GitHub Actions configured for automated checks on every PR:
- Linting
- Typechecking
- Build generation
- Automated tests

Deployment pipeline: Push to main → CI checks pass → Build (`next build`) → Deploy to Hostinger.

## Build Output
- Uses `next build` for static/SSR output depending on the route.

## Operational Concerns
- **Rollback strategy**: Standardized procedure for reverting the deployment artifact.
- **Environment variables**: Managed securely in Hostinger, mirrored with `.env.example` locally.
- **Domain/DNS**: Setup notes documented separately.
