# feagi-docs

Source for the FEAGI documentation site at [brainsforrobots.com/docs](https://brainsforrobots.com/docs).

Built with [Docusaurus 3](https://docusaurus.io). Content for each section is pulled
from the relevant source repo at build time via `scripts/sync-sources.mjs`.

## Structure

| Section | Route | Source |
|---|---|---|
| Brain Builder | `/brain-builder` | `feagi/brain-visualizer` guides + authored content here |
| SDK & Integrations | `/sdk` | `feagi/embodiment-controllers`, `feagi/feagi-mcp` + authored content here |
| Contributing | `/contributing` | `feagi/feagi-core` docs + authored content here |
| API Reference | `/feagi/api-docs` | Auto-generated from `feagi/feagi-core` OpenAPI spec |

## Local development

### Prerequisites

- Node.js 18+
- The FEAGI-2.0 monorepo cloned locally (source content is auto-resolved from sibling directories)

### Setup

```bash
npm install
node scripts/sync-sources.mjs   # pulls content from sibling repos
npm start
```

The site runs at `http://localhost:3000/docs/`.

### Adding content

- Authored pages live directly under `docs/<section>/`
- Synced content (Brain Visualizer guides, embodiment READMEs, feagi-core docs) is
  generated at build time and git-ignored. Edit those files in their source repos.
- After editing a sidebar (`sidebars/<section>.ts`), restart the dev server.

## Deployment

Merging to `main` triggers the GitHub Actions workflow which:

1. Checks out all source repos
2. Runs `scripts/sync-sources.mjs` to assemble the full doc tree
3. Builds the Docusaurus static site
4. Deploys to GitHub Pages

## Content that lives here vs. in source repos

| Content | Lives in |
|---|---|
| Brain Visualizer UI guides | `feagi/brain-visualizer` |
| feagi-core architecture docs | `feagi/feagi-core` |
| Embodiment connector READMEs | `feagi/embodiment-controllers` |
| MCP server docs | `feagi/feagi-mcp` |
| Concept explanations, SDK quickstarts, intro pages | This repo (`feagi-docs`) |
