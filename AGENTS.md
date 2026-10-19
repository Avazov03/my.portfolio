<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design

Read `DESIGN.md` before any UI work. The home hero (`src/components/home/`) is the fixed base of the design; new pages and sections follow its tokens, type and composition rules. The taste-skill lint flags the stage gradient, the gold CTA shadow, the indicator glow, the photo drop shadow and Poppins: these are the brand exceptions listed in `DESIGN.md` §7, keep them.
