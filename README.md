# Nordiska Solutions — Astro

A static, multipage Astro implementation of the approved `nordiska-concept-03.html` design.

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

- 20 pages: Home, About, Services, 8 service details, Industries, 5 industry details, Locations, Contact, Privacy.
- `src/styles/approved.css` preserves the mockup's complete original stylesheet, including its responsive and reduced-motion rules.
- `src/styles/pages.css` extends those tokens and patterns for the new pages.
- `src/scripts/home.js` retains the original orbit hero and expanding industry gallery logic.
- `src/data/` holds editable service, industry, about, and image content.
- Images and fonts retain direct external URLs. The supplied embedded logo is extracted losslessly to `public/nordiska-logo.png`.
- Site menus and detail cards use page links instead of mockup dialogs. Contact links carry service, industry and location context in query parameters.

## Contact

No recipient or form service was supplied. The contact form validates the enquiry and downloads a text copy; it explicitly states that nothing has been sent. It does not store personal information. Connect an approved submission endpoint and replace the interim privacy wording before enabling online enquiries.

See `docs/content-review.md` for the source mapping and remaining client content decisions.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` checks and publishes each push to `main`.
In the repository's **Settings → Pages**, choose **GitHub Actions** as the source.
Then commit and push the deployment setup. The site URL is:

https://samithw.github.io/nordiska2/

Local development retains root URLs. GitHub Actions builds use `/nordiska2/`,
with internal links and the logo/favicon prefixed through `src/utils/paths.ts`.
If moving to a custom domain later, update `site` and use `/` as the deployment base.
