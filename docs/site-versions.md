# Main and Classic site versions

The current design lives at `/`. The previous complete site is preserved at `/classic/`. Homepage explorations are presented at `/concepts/`; their previous `/preview/` URLs redirect to the descriptive concept URLs. Other page experiments remain under `/preview/`.

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
- `src/pages/concepts/`: client-facing homepage gallery and seven named concepts. Only the hero and Nordiska Advantage vary. The remainder uses `components/main/HomeContent.astro`, also used by the main homepage.
- `src/layouts/MainLayout.astro` and `MainHomeLayout.astro`: main page shell and orbit homepage shell.
- `src/layouts/ClassicLayout.astro`: archived shell.
- `src/components/main/`, `src/scripts/main/`, `src/styles/main/`: main-version design and behaviour.
- `src/components/classic/`, `src/scripts/classic/`, `src/styles/classic/`: original design and behaviour.
- Existing unversioned components, styles and layouts continue to support the experimental previews.
- `src/data/` and `public/`: shared company content and static assets. Editing shared content affects both versions.

Main navigation and content links stay on main routes. Classic uses `src/utils/classicPaths.ts` to prefix page links with `/classic/` without moving images, fonts or script assets. Footer links explicitly allow switching between the two homepages.

## Promoted designs

The main homepage now comes from Cleantech Growth (including the edited Nordiska jacket photograph), Services from Services Journey, Industries from the expanded Industries Explorer and Locations from Locations Network. Contact retains the approved welcoming global-contact section above the form. About, Privacy and detail-page content carry forward with the main typography and contact treatment, ready for subsequent refinement.

Promoted pages have no preview comparison bars or preview noindex flag. Classic pages remain available for comparison and carry noindex metadata.

## Deployment

Both versions are built and deployed together by the existing workflow. Local URLs start at `/`; GitHub Pages adds `/nordiska2/` to both versions, giving `/nordiska2/` and `/nordiska2/classic/`.

Keep the two URL helpers separate: main and preview code use `paths.ts`; Classic code uses `classicPaths.ts`. Preserve Classic styles and components when continuing work on the main version.

Classic is frozen: modify its pages, components, scripts, styles or layout only when the user explicitly requests a Classic change.

Main service cards share `components/main/JourneyServiceCard.astro`, `styles/main/journey-service-card.css` and `data/main/serviceJourney.ts` across the Services overview and related-service sections. The main homepage uses the shared main Header and full-screen navigation controller. Its orbit behaviour is isolated in `scripts/main/cleantech-home.js`.

## Homepage concepts

The concept catalogue is `src/data/homeConcepts.ts`. Client-facing names and URLs are:

The client gallery and Previous/Next navigation show only Original Design, Immersive Photography, The Nordiska Story and Cleantech Growth, numbered 01–04. Visibility is controlled by each catalogue entry's `visible` flag. Service Explorer, Expertise in Motion and Brand Highlights remain available by direct URL for internal reference.

| Name | URL | Former URL |
| --- | --- | --- |
| Original Design | `/concepts/original-design/` | New comparison page |
| Immersive Photography | `/concepts/immersive-photography/` | `/preview/hero/` |
| Service Explorer | `/concepts/service-explorer/` | `/preview/signal/` |
| Expertise in Motion | `/concepts/expertise-in-motion/` | `/preview/signal-story/` |
| Brand Highlights | `/concepts/brand-highlights/` | `/preview/signal-highlights/` |
| The Nordiska Story | `/concepts/the-nordiska-story/` | `/preview/signal-narrative/` |
| Cleantech Growth | `/concepts/cleantech-growth/` | `/preview/signal-focused/` |

Original Design reuses the original opening and Advantage treatment above the current shared homepage content. It is distinct from the full preserved Classic site. Classic files are unchanged.

Update shared homepage content in `components/main/HomeContent.astro` and its imported main components. Concept-specific legacy hero scripts intentionally do not rewrite the shared industry section. The gallery uses actual captured hero screenshots in `public/concepts/`. Concept pages carry noindex metadata.
