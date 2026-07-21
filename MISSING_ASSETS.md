# Missing Assets

Assets referenced by the build that are not yet supplied. Per the brief (§9),
missing logos render a text-mark fallback — do not generate substitute logos.

## Present

- `public/logo/afaq-green.svg` — supplied (for light backgrounds)
- `public/logo/afaq-white.svg` — supplied (for dark backgrounds)

## Needed from client

### Client & partner logos — `public/logos/clients/*.svg`
For the "Trusted By" marquee (§5.2). Needed as SVG or high-res mono PNG:
Riyadh Metro / RCRC, KAFD, SWCC, Ministry of Defense, Saudi Electricity Company,
MEWA, Riyadh Airports, SAR, PIF, ROSHN, Diriyah, Qiddiya, NEOM, MODON, MBC,
Almarai, NADEC, King Saud University, Misk, Trimble, Esri, LG, Absen, Daktronics,
World Defense Show.

### Background textures — `public/textures/`
- `topo.svg` — topographic contours (3–8% opacity overlays)
- `grid.svg` — coordinate grid
- `terrain.svg` — wireframe terrain (Numbers section background)

### Project photography — `public/images/`
Real project photos: KAFD survey, SWCC field work, SEC control rooms,
Riyadh Front LED façade, Al Shabab scoreboard steel, etc.
Until supplied, placeholders live in `public/placeholders/` with correct aspect
ratios and descriptive filenames.

### Hero visual — `public/images/hero-*`
Full-bleed smart-city / geospatial render for §5.1.
