# Production Checks

Run these before deployment:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

CI (`.github/workflows/ci.yml`) runs the same commands on every pull request.

Manual checks:

- sign in with email and password
- import a pasted resume
- open the imported resume in builder
- switch all templates
- export using browser print
- ask the living agent about imported resume details
- run ATS analyzer
- run JD matcher
- open trust score
- open skill graph
