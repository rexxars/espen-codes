# espen-codes

My personal website, digital garden, blog, and project archive at [espen.codes](https://espen.codes/).

## Stack

- Astro with strict TypeScript
- Cloudflare Workers with Static Assets
- Sanity for posts, structured projects, reflections, résumé data, and the embedded Studio
- React islands only where a page needs browser state (`/countdown` and `/map`)

Cloudflare Workers is the deployment target rather than Cloudflare Pages. Routes are static by default and built to HTML, while pages and API endpoints that explicitly set `prerender = false` run in the same Worker. This keeps the Next-style colocated route experience without a second backend project.

## Commands

```sh
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm preview
pnpm deploy
```

Copy `.dev.vars.example` to `.dev.vars` and add `DIARY_API_TOKEN` to load and update the
private activity data used by `/map`. Add `HEALTH_AUTO_EXPORT_TOKEN` as a separate random bearer
token for workout imports. Add both values as Cloudflare Worker secrets in production.

For local Studio access, add `http://localhost:3333` to the Sanity project's CORS origins.

## Routes and rendering

- `/`, `/projects/*`, `/blog/*`, `/resume`, `/bread`, `/kokos`, and `/countdown` are statically generated.
- `/map` is rendered by the Worker because it reads a private Sanity dataset on every page request.
- `/api/health/workouts` accepts authenticated Health Auto Export workout JSON and writes routes to
  the diary dataset.
- `/api/spacer` is an Astro API route running in the Worker.
- `/studio/*` embeds Sanity Studio and uses its browser-history routes through the Worker.
- `/layouts/default` and `/layouts/minimal` preview the available presentation shells.

The old Strava importer is intentionally not part of this migration. New activity routes are sent
from Health Auto Export to `/api/health/workouts` using an `Authorization: Bearer <token>` header.
Configure the automation for workouts, JSON export version 2, route data enabled, and batch
requests enabled. Workout metrics can remain disabled because the map importer only uses the route,
name, start time, and distance.

## Swappable presentations

Content fetching lives in `src/content`, reusable content rendering in `src/components`, and visual choices in `src/presentations`. Routes select a presentation through `getPresentation()` and wrap page views in that presentation's `Shell`.

To add a layout:

1. Create `src/presentations/<name>/Shell.astro`.
2. Create a manifest that spreads `defaultPresentation` and replaces `Shell` and any page views you want to change.
3. Register it in `src/presentations/index.ts`.
4. Preview it at `/layouts/<name>`.
5. Set `ACTIVE_PRESENTATION` in `src/constants.ts` when it is ready to become the site-wide layout.

This allows a layout to be only a new shell and theme, or a full replacement of individual home, project, blog, and résumé views, without changing queries or route behavior.

## Content model

Projects keep the legacy fields so the existing dataset builds immediately, while adding:

- `kind`: software, 3D model, electronics, woodworking, or other
- `status` and an optional dated status note
- start, release, and completion dates
- logo, cover image, gallery, Portable Text body, links, and structured artifacts
- inline dated reflection entries on each project for retrospectives and later reassessments

Portable Text supports prose, lists, links, images with captions, code blocks, and typed embeds. Provider statistics can later be populated from the structured artifact records without coupling external API responses to the authored project document.
