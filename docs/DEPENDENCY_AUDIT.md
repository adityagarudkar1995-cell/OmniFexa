# Dependency Audit

Detailed analysis of current npm audit findings. There are 3 advisory clusters, all HIGH severity:

## Advisory 1: brace-expansion <=5.0.7 (GHSA-mh99-v99m-4gvg)
- **Package**: brace-expansion
- **Severity**: HIGH — DoS via unbounded expansion causing OOM crash
- **Dependency path**: eslint → @eslint/config-array → minimatch → brace-expansion; also eslint → @eslint/eslintrc → minimatch → brace-expansion; also eslint-config-next → eslint-plugin-import/jsx-a11y/react → minimatch → brace-expansion
- **Direct or transitive**: TRANSITIVE (deep in eslint chain)
- **Production runtime or dev-only**: DEVELOPMENT-ONLY (eslint is a devDependency)
- **Currently installed**: brace-expansion within minimatch 2.0.0 - 10.0.2 range
- **Fixed version**: brace-expansion >5.0.7 — requires eslint >=10.8.0 which is a breaking change from current eslint 9.x (eslint-config-next 16.2.12 depends on eslint ^9)
- **Reachability**: NOT reachable in production runtime. ESLint only runs during development linting. A malicious glob pattern would need to be injected into ESLint configuration, which is developer-controlled.
- **Recommended action**: MONITOR. Wait for eslint-config-next to support ESLint 10. Do NOT run `npm audit fix --force`.
- **Evidence**: npm audit output, GHSA-mh99-v99m-4gvg advisory

## Advisory 2: postcss <=8.5.17 (3 CVEs)
- **Package**: postcss (bundled inside next)
- **Severity**: HIGH — XSS via unescaped `</style>` (GHSA-qx2v-qp2m-jg93), arbitrary file read via sourceMappingURL (GHSA-6g55-p6wh-862q), path traversal via source map auto-loading (GHSA-r28c-9q8g-f849)
- **Dependency path**: next → postcss (bundled internally in node_modules/next/node_modules/postcss)
- **Direct or transitive**: TRANSITIVE (bundled inside next package)
- **Production runtime or dev-only**: BUILD-TIME primarily. PostCSS processes CSS during build. The bundled version inside next is used during next build and next dev.
- **Currently installed**: postcss version bundled with next 16.2.12
- **Fixed version**: postcss >8.5.17 — requires next to update their bundled postcss. npm audit suggests downgrading to next@9.3.3 which is NOT viable.
- **Reachability**: PARTIALLY reachable. The XSS vulnerability requires an attacker to inject malicious CSS content that gets processed by PostCSS. In OmniFexa, CSS is developer-controlled, not user-supplied. The sourceMappingURL vulnerabilities require processing attacker-controlled CSS with source maps, which doesn't apply to our build pipeline.
- **Recommended action**: MONITOR. Wait for Next.js to update bundled postcss. Do NOT downgrade Next.js.
- **Evidence**: npm audit output, referenced GHSAs

## Advisory 3: sharp <0.35.0 (GHSA-f88m-g3jw-g9cj)
- **Package**: sharp (image processing library)
- **Severity**: HIGH — inherited vulnerabilities in libvips (CVE-2026-33327, CVE-2026-33328, CVE-2026-35590, CVE-2026-35591)
- **Dependency path**: next → sharp
- **Direct or transitive**: TRANSITIVE (dependency of next for image optimization)
- **Production runtime or dev-only**: PRODUCTION RUNTIME (next/image uses sharp for image optimization in production)
- **Currently installed**: sharp version that ships with next 16.2.12
- **Fixed version**: sharp >=0.35.0 — requires next to update their sharp dependency
- **Reachability**: POTENTIALLY reachable. sharp processes images served via next/image. If an attacker can cause the server to process a maliciously crafted image, the libvips vulnerabilities could be triggered. However, OmniFexa currently only serves static scaffold images (SVGs and favicon).
- **Recommended action**: MONITOR with elevated priority. When Next.js releases a version with sharp >=0.35.0, upgrade. In the meantime, avoid processing untrusted images through next/image optimization on the server.
- **Evidence**: npm audit output, GHSA-f88m-g3jw-g9cj

## NPM Outdated Analysis
- **@types/node**: Current 20.x, Latest 26.x — pinned to ^20 by create-next-app, safe to keep
- **eslint**: Current 9.x, Latest 10.x — breaking change, wait for eslint-config-next support
- **react/react-dom**: Current 19.2.4, Latest 19.2.8 — minor update available, safe but not urgent
- **typescript**: Current 5.x, Latest 7.x — major version, wait for Next.js compatibility
