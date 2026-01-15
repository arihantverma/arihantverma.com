# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a **pnpm + Turborepo monorepo** for arihantverma.com with two packages:

- **`packages/astro`** (`@arihantverma/site`) — The current Astro site with Cloudflare Workers adapter. This is where new development happens.
- **`packages/v1-eleventy`** (`@arihantverma/v1-eleventy`) — Archived Eleventy site, served at `/v1/*`. Frozen, no changes expected.

### URL Structure
- `/` — New Astro site
- `/v1/*` — Archived Eleventy site (static)
- Legacy URLs (`/posts/*`, `/about`, `/tags/*`, etc.) redirect to `/v1/*` via Cloudflare edge redirects

### Deployment
- **Platform**: Cloudflare Workers with Static Assets
- **Redirects**: Handled at edge via `packages/astro/public/_redirects` (not in Worker)
- **Local dev**: Uses wrangler with Miniflare for production parity

## Commands

```bash
# Development
pnpm dev                    # Run both dev servers (separate ports)
pnpm dev:combined           # Build v1 → copy to public/v1 → run Astro dev (both at :4321)

# Build & Preview
pnpm build                  # Build both packages
pnpm preview                # Build + copy v1 to dist + run wrangler dev

# Type checking
pnpm typecheck              # Run TypeScript type check (Astro package)

# Single package
pnpm --filter=@arihantverma/site dev
pnpm --filter=@arihantverma/site typecheck
pnpm --filter=@arihantverma/v1-eleventy build
```

## Key Files

- `packages/astro/public/_redirects` — Cloudflare edge redirects (static before dynamic/splat rules)
- `packages/astro/plugins/` — Custom Vite plugins (e.g., `serve-v1-directory-index.js` for dev mode)
- `packages/v1-eleventy/eleventy.config.js` — Eleventy config with `pathPrefix: "/v1/"`

## Important Patterns

### v1 Site Integration
The archived v1 site must be copied into the Astro output:
- **Dev**: Copied to `packages/astro/public/v1/` (served by Vite)
- **Build**: Copied to `packages/astro/dist/v1/` (served by Workers)

The Eleventy site uses `pathPrefix: "/v1/"` so all internal URLs and assets are prefixed correctly.

### Adding Redirects
Edit `packages/astro/public/_redirects`. Static redirects must come before dynamic (splat) rules for performance. Format:
```
/old-path  /new-path  301
/wildcard/*  /dest/:splat  301
```
