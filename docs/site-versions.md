# Main and Classic site versions

The current design lives at `/`. The previous complete site is preserved at `/classic/`. Existing `/preview/` experiments remain available.

| Page | Main | Classic |
| --- | --- | --- |
| Home | `/` | `/classic/` |
| About | `/about/` | `/classic/about/` |
| Services | `/services/` | `/classic/services/` |
| Service details | `/services/<slug>/` | `/classic/services/<slug>/` |
| Industries | `/industries/` | `/classic/industries/` |
| Industry details | `/industries/<slug>/` | `/classic/industries/<slug>/` |
| Locations | `/locations/` | `/classic/locations/` |
| Contact | `/contact/` | `/classic/contact/` |
| Privacy | `/privacy/` | `/classic/privacy/` |

## Source ownership

- `src/pages/`: main-version route files.
- `src/pages/classic/`: archived route files, including dynamic detail routes.
- `src/pages/preview/`: retained experiments; their Original comparison links point to Classic.
- `src/layouts/MainLayout.astro` and `MainHomeLayout.astro`: main page shell and orbit homepage shell.
- `src/layouts/ClassicLayout.astro`: archived shell.
- `src/components/main/`, `src/scripts/main/`, `src/styles/main/`: main-version design and behaviour.
- `src/components/classic/`, `src/scripts/classic/`, `src/styles/classic/`: original design and behaviour.
- Existing unversioned components, styles and layouts continue to support the experimental previews.
- `src/data/` and `public/`: shared company content and static assets. Editing shared content affects both versions.

Main navigation and content links stay on main routes. Classic uses `src/utils/classicPaths.ts` to prefix page links with `/classic/` without moving images, fonts or script assets. Footer links explicitly allow switching between the two homepages.

## Promoted designs

The main homepage comes from Signal Story, Services from Services Journey, Industries from the expanded Industries Explorer and Locations from Locations Network. Contact retains the approved welcoming global-contact section above the form. About, Privacy and detail-page content carry forward with the main typography and contact treatment, ready for subsequent refinement.

Promoted pages have no preview comparison bars or preview noindex flag. Classic pages remain available for comparison and carry noindex metadata.

## Deployment

Both versions are built and deployed together by the existing workflow. Local URLs start at `/`; GitHub Pages adds `/nordiska2/` to both versions, giving `/nordiska2/` and `/nordiska2/classic/`.

Keep the two URL helpers separate: main and preview code use `paths.ts`; Classic code uses `classicPaths.ts`. Preserve Classic styles and components when continuing work on the main version.
