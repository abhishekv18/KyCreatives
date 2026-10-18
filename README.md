# KY Creatives website

Frontend for kycreatives.com. React 19 + Vite, React Router, GSAP/ScrollTrigger and Lenis for motion, Lucide icons. No backend.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build locally
npm run lint
```

Hosting: it's a single-page app, so every route must fall back to `index.html`. `public/_redirects` (Netlify) and `vercel.json` (Vercel) already do this; on other hosts, add the equivalent rewrite.

## Where things live

| What | Where |
| --- | --- |
| Brand tokens (colours, type scale, spacing, radii) | `src/styles/tokens.css` |
| Company facts, contact details, social links | `src/data/site.js` |
| Service content (offerings, deliverables, FAQs) | `src/data/services.js` |
| Portfolio projects | `src/data/projects.js` |
| Testimonials | `src/data/testimonials.js` |
| Motion system (scroll reveals, parallax) | `src/lib/motion.js` |
| Smooth scroll (Lenis, desktop pointers only) | `src/lib/smooth.js` |
| Pages | `src/pages/`, with home sections in `src/pages/home/` |

Content changes go in `src/data/`, not the components.

### Colour roles and page rhythm
Every section declares `data-tone="dark"` or `"light"`, and the header reads it to keep its contrast. Roles (defined in `src/styles/tokens.css`):
- **Ink:** stage for the hero, work and footer.
- **Cloud:** reading surface.
- **Violet:** actions and the process story.
- **Flame:** the closing CTA and D2C.
- **Aqua/Cyan:** software and technical accents.
- **Cobalt, Orange, Magenta:** project and service stages.

Text on each field follows the guideline pairings: White on Ink/Violet, Ink on Flame/Orange/Cyan/Cobalt/Magenta.

Each service page sets its own hero field through `ServiceHero theme=` and an accent through its `svcpage--*` wrapper.

### Artwork
`src/components/art/Art.jsx` holds the original SVG artwork:
- **Ribbons:** gradient bands in Flame, Dusk and Aqua.
- **Blueprint:** a fine grid.
- **Arcs:** signal rings.
- **Stroke** and **QuoteMark.**

Everything is built from the official palette and is decorative (`aria-hidden`). The flame mark is never used as decoration. The logo always sits on a white plate on dark or colour fields, and is never rotated.

### Motion conventions
Add attributes to markup instead of writing new GSAP code:
`data-reveal="up|fade|clip|wipe"`, `data-stagger` (children rise in turn), `data-parallax="8"`, `data-draw` on SVG paths (drawn in on view), `data-draw-scrub` on a container (drawing follows scroll), and `<SplitHeading lines={[...]} />` for art-directed headlines. Reveals animate opacity only (never `visibility`), so content below the fold stays reachable by keyboard. All motion is turned off under `prefers-reduced-motion`, which also skips the intro loader. The loader runs once per browser session and can never block for more than 3.5 s.

## Brand compliance
- Colours, gradients (Flame = Magenta→Orange, Dusk = Violet→Cobalt, Aqua = Cyan→Cobalt) and type follow the KY Creatives Brand Guidelines 2026.
- The logo (`public/brand/ky-creatives-logo.png`) and flame icon (`public/brand/ky-flame-icon.png`) are the original files from kycreatives.com, unaltered. On dark backgrounds the logo sits on a white card, as the guidelines require.
- Fonts are self-hosted through @fontsource: Libre Baskerville 400, DM Sans 400/500/700, JetBrains Mono 400.

## Images
- `public/images/work/*-portfolio.webp`: cropped from KY Creatives' own portfolio mockups on kycreatives.com/website-designing/.
- `*-site`, `*-wide`, `*-long`, `m-*.webp`: screenshots of the live client sites, captured October 2026 (`scripts/prepare-images.py` regenerates the crops). The Decorshed, Pets Way and Pink Dinosaur credit KY Creatives in their footers.
- Product, app, portal, campaign and brand compositions are CSS illustrations (`src/components/visuals/Visuals.jsx`) and are labelled "Concept" wherever they appear.

## Needs review by KY Creatives
1. **Privacy Policy**: carried over from the current site. Confirm it is still accurate and add an effective date.
2. **Terms & Conditions**: the maintenance-plan terms are carried over. The "Use of this website" section is a new draft. Project, payment and refund terms are not covered.
3. **Portfolio**: 12 of the 21 portfolio sites responded when checked. Sites that did not respond are shown without a live link. MaaCubs and Dudle Fashion were left out because their sites do not credit KY Creatives and they are not in the published portfolio.
4. **Mobile Apps and Portals** show concept screens only. Add real projects to `src/data/projects.js` when they can be published.
5. **Contact form**: there is no backend. The form validates, then opens the visitor's email app with a pre-filled message to info@kycreatives.com, and tells them nothing has been sent until they press send. To receive submissions directly, connect a form service later.
