# Contributing to Silicon AI

Thanks for considering contributing. Here’s how to get started.

## How to contribute

- **Bug reports** — Open an [issue](https://github.com/alexbieber/silicon-ai/issues) with the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md). Include steps to reproduce, environment (OS, Node version), and what you expected.
- **Feature ideas** — Open an [issue](https://github.com/alexbieber/silicon-ai/issues) with the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).
- **Code changes** — Open a pull request. Use the [PR template](.github/PULL_REQUEST_TEMPLATE.md) and keep the diff focused.

## Development setup

```bash
git clone https://github.com/alexbieber/silicon-ai.git
cd silicon-ai
npm install
cp .env.example .env
# Set NVAPI_KEY in .env
npm run build
npm start
```

- **Frontend:** Run `npm run dev:client` (with the server running) for hot reload at http://localhost:5173.
- **Backend:** Use `npm run dev` for server auto-restart.

## Code style

- Follow existing patterns in the repo.
- React/TypeScript: keep components small and typed.
- No secrets or credentials in code or commits.

## README / docs

- To show a screenshot on the main README, add **`docs/screenshot.png`** (e.g. 800×450 or 1200×630) with a capture of the running app.

## Questions

Open a [GitHub Discussion](https://github.com/alexbieber/silicon-ai/discussions) or an issue and we’ll respond when we can.
