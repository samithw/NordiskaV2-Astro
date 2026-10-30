# Locations network preview: source and editorial notes

Source read: `/Users/samithw/01_ActiveProjects/WebProjects/NordiskaSolutions/Assets/Brief/nordiska-content.txt` (182 lines), plus the existing Locations page.

- The original source lists Finland, Malaysia, India, Vietnam, Philippines and UAE.
- It specifically states that the first overseas office opened in Malaysia in 2017.
- Company background provides cleantech, water, wastewater and process expertise; market entry, channel development and commercial execution supply the supporting themes.
- Partner-search text names Southeast Asia and UAE among its markets and describes distributors, agents, EPC contractors and strategic partners.
- The source supplies no dedicated country descriptions for India, Vietnam or the Philippines. Their preview paragraphs are editorial expansions of the existing location summaries and the company-wide offer, framed as topics for discussion rather than confirmed local capabilities.
- No extra addresses, named representatives, local case studies or office status are asserted. Photos illustrate the countries; they do not show Nordiska premises. Image credits and source links are displayed with each photo. Flags load from FlagCDN.

Preview content is isolated in `src/data/locationPreview.ts`; original pages and shared map coordinates are unchanged.

The revised map uses a locally generated SVG silhouette from Natural Earth's public-domain 1:110m land polygons (`ne_110m_land.geojson`, https://github.com/nvkelso/natural-earth-vector). Equirectangular projection; Antarctica omitted. Country-level pin coordinates are defined only in the preview and projected with the same transform as the land. Flags inside the pins are circular crops of the country flags; pin tips retain the country-level positions. The current preview uses `nordiska-eastern-land.svg`: whole Natural Earth land polygons are selected to exclude the Americas, Greenland and Antarctica without cutting the remaining coastlines. Desktop frames the complete eastern land silhouette; mobile uses a softly feathered organic SVG mask for the closer regional view. Pin tips retain their coordinates. Country labels align beside the flag-circle centres, with responsive placement for India and Vietnam to avoid neighbouring pins.
