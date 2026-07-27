# Dependency Policy

## Addition Criteria
Every new dependency must be thoroughly reviewed for:
- License compatibility (prefer MIT, Apache 2.0).
- Active maintenance status.
- Bundle size impact.
- Security history.
- Alternative lighter or native options.

## Restrictions
- Avoid packages with known unpatched security issues.
- Avoid abandoned or loosely maintained packages.
- Document the specific rationale for every added dependency in PR descriptions.

## Maintenance
- Regular audit schedule (e.g., monthly).
- No automatic version bumps without developer review and testing.
