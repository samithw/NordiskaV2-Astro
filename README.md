# Nordiska Solutions — Astro

A static, multipage Astro site with the redesigned main version at `/`, the previous full site at `/classic/`, and retained design experiments at `/preview/`.

The client-facing homepage comparison gallery is at `/concepts/`. It presents four selected concepts; three additional concepts remain available by direct URL for internal reference. All concepts share the current homepage below the hero and Nordiska Advantage sections. Previous hero-preview URLs redirect to their corresponding concept pages.

## Run

```sh
npm install
npm run dev
```

```sh
npm run check
npm run build
npm run preview
```

The production site is generated in `dist/` and can be served by any static host. No hosting account or domain is assumed.

## Structure

- Two complete sets of 20 pages: Home, About, Services, 8 service details, Industries, 5 industry details, Locations, Contact, Privacy.
- Main and Classic have isolated components, layouts, scripts and styles, with shared company data and public assets. See `docs/site-versions.md` for ownership and URL mapping.
- `src/styles/main/` and `src/scripts/main/` support the promoted preview designs.
- `src/styles/classic/` and `src/scripts/classic/` preserve the original design and interactions.
- Unversioned components, styles and scripts support the retained experimental previews.
- `src/data/` holds editable service, industry, about, and image content.
- Images and fonts retain direct external URLs. The supplied embedded logo is extracted losslessly to `public/nordiska-logo.png`.
- Site menus and detail cards use page links instead of mockup dialogs. Contact links carry service, industry and location context in query parameters.

## Contact

The Contact page provides the supplied global telephone number and email address. The form validates the enquiry and downloads a text copy; it explicitly states that nothing has been sent. It does not store personal information. Connect an approved submission endpoint and replace the interim privacy wording before enabling online enquiries.

See `docs/content-review.md` for the source mapping and remaining client content decisions.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` checks and publishes each push to `main`.
In the repository's **Settings → Pages**, choose **GitHub Actions** as the source.
Then commit and push the deployment setup. The site URL is:

https://samithw.github.io/nordiska2/

Local development retains root URLs. GitHub Actions builds use `/nordiska2/`,
with internal links and the logo/favicon prefixed through `src/utils/paths.ts`.
If moving to a custom domain later, update `site` and use `/` as the deployment base.
