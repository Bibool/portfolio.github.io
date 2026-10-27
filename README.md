# Abdallah “Bib” Boutrif — Portfolio

A static portfolio for GitHub Pages: overview, professional work, Unreal Engine plugins, and Voidstar. No runtime framework, package dependencies, or Jekyll installation required.

## Edit and preview

Requires Node.js 18 or newer. No `npm install` needed.

```sh
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:4173/portfolio.github.io/. The preview supports the production subdirectory as well as the root. Stop the preview with Ctrl+C.

- `source/*.html`: page content. Edit these, then rebuild.
- `scripts/build.mjs`: shared header, footer, page titles, metadata, and sitemap generation.
- `assets/css/main.css`: design and responsive layouts.
- `assets/js/main.js`: mobile navigation, project filters, and host migration illustration.
- Root `*.html`: generated, committed output served by GitHub Pages.
- `assets/resume.pdf`: downloadable résumé retained from the original portfolio.

All essential content and links work without JavaScript. The menu collapses only when JavaScript is available. Reduced-motion preferences are respected.

## GitHub Pages

Keep Pages configured to deploy from this repository’s publishing branch, folder `/ (root)`. Commit the generated root HTML alongside source edits. The `.nojekyll` marker makes Pages serve the files directly. All navigation and assets use relative paths, so the site works at `https://bibool.github.io/portfolio.github.io/` without routing rewrites or a server build.

No deployment or push is performed by the build or preview commands.

## Content and image sources

Professional credits, roles, and performance figures were retained from the previous repository content. Contributions are grouped by studio when the original portfolio did not assign them to a specific title. Voidstar’s current name and single-player/multiplayer scope follow the owner’s brief; technical foundations come from the previous personal-project description.

Plugin descriptions are based on their public documentation:

- https://github.com/Bibool/RageSettings
- https://github.com/Bibool/RageHostMigration
- https://github.com/Bibool/Rage-String-Table-Tools

The String Table Tools screenshot comes from that repository’s `Images/StringTableToolWindow.png`. Dune and Commandos images are Steam library artwork from the respective games; Icarus artwork is the Games Press image linked by the previous portfolio. Game artwork remains the property of its respective owners and is used to identify credited projects.

`assets/images/orbital.svg` is an original decorative orbital illustration, explicitly labelled as conceptual rather than gameplay. The settings panel is an illustrative interface study; the host migration panel is an interactive architecture sketch. Replace these with actual captures when desired. No obsolete Wix content is used.

Google Fonts supplies DM Sans and Space Grotesk, with local system fallbacks when unavailable.
