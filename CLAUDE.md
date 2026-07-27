# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 15 app (App Router, React 19, Tailwind CSS) that displays and serves downloads for Ableton Live plugins (Max for Live devices and Racks). Plugin metadata lives in `data/plugins.yaml`; README content and release data are synced from GitHub repos and cached in `/cache/` (inside the Docker container).

## Commands

- **Dev server:** `make devup` (runs in Docker with Turbopack on port 3200)
- **Production:** `make prod` (builds and runs in Docker on port 3225)
- **Lint:** `npm run lint`
- **Sync GitHub data:** `make sync` (or `make devsync` in dev) — pulls releases, READMEs, and builds category .zip files
- **Update docs:** `make docs` — refreshes plugin repo docs

Development uses a VSCode DevContainer. See `make help` for all targets.

## Architecture

- **`data/plugins.yaml`** — Source of truth for all plugin metadata (title, key, category, repo URL, image, description, Discord links). The `key` field is used throughout as the plugin identifier.
- **`lib/dataUtils.ts`** — Reads `plugins.yaml`, resolves cached release/README data from `/cache/<key>/`. Categories have a fixed sort order defined in `categorySortOrder`.
- **`lib/scriptUtils.ts`** — GitHub API integration (Octokit) for cloning repos, fetching releases, building zip files.
- **`scripts/syncGithub.ts`** — CLI script that iterates all plugins, clones/pulls repos, fetches latest releases, writes `release.json`, and builds per-category zip bundles.
- **`app/page.tsx`** — Homepage listing all plugins grouped by category.
- **`app/[...slug]/page.tsx`** — Dynamic catch-all route for individual plugin pages. Renders README or docs markdown (via `react-markdown` with `rehype-raw`). Relative links in markdown are rewritten to route through the app.
- **`app/version/[slug]/route.ts`** — API route for version info.
- **`index.d.ts`** — Shared types (`PluginMeta`, `HeadingType`).
- **`components/`** — UI components (PluginTile, DownloadButton, DocPages, etc.).

All pages use `export const dynamic = 'force-dynamic'` (no static generation).

## Key Patterns

- Plugin cache lives at `/cache/<key>/` containing `release.json`, `README.md`, and optional `docs/` directory. This path is inside the Docker container, not in the repo.
- Adding a new plugin: add an entry to `data/plugins.yaml` then run `sync`.
- Styling uses Tailwind with `prose-invert` typography plugin for markdown content.
