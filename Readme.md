# Karè Davy — Portfolio Website

A personal portfolio site for a Project and Program Manager, built as a static
site and hosted on GitHub Pages. The site presents a set of product and program
case studies as fully native HTML pages inside one shared design system, rather
than as linked PDFs or embeds.

This README is the running record of the build. It documents the starting point,
every change made so far in chronological order, the architecture those changes
produced, the conventions the project follows, and the items still open.

---

## Table of contents

1. [Tech stack](#1-tech-stack)
2. [Directory structure](#2-directory-structure)
3. [Design system](#3-design-system)
4. [Build timeline](#4-build-timeline)
5. [Security architecture](#5-security-architecture)
6. [Page and component reference](#6-page-and-component-reference)
7. [Project conventions](#7-project-conventions)
8. [Known open items](#8-known-open-items)

---

## 1. Tech stack

- **Markup:** hand-written HTML5, one file per page.
- **Styling:** plain CSS driven by custom properties (design tokens). No
  preprocessor, no framework, no build step.
- **Behavior:** a single vanilla JavaScript file. No bundler, no dependencies.
- **Typography:** Inter, with Fraunces used only inside the JamaicanFood mockup.
  Both are loaded from Google Fonts.
- **Hosting:** GitHub Pages, served as static files, on a custom domain with
  HTTPS enforced.

Because the host serves static files only, the site cannot set custom HTTP
response headers. That single constraint shapes the entire security approach in
section 5.

---

## 2. Directory structure

The deployed layout. Case study pages live one level down in `case-studies/`,
which is why they reference shared assets with a `../` prefix.

```
/
├── index.html                     Landing page
├── CNAME                          Custom domain record (GitHub Pages)
├── robots.txt
├── css/
│   ├── style.css                  Global design system + all shared components
│   └── jamaicanfood.css           Scoped styles for the JamaicanFood mockup
├── js/
│   └── main.js                    Scroll reveal, scroll spy, mobile nav toggle
├── assests/                       Image and document assets (folder name as-is)
│   ├── KareDavy_Senior_Program_Manager_Resume.pdf
│   ├── kare-davy.jpg              Hero portrait (to be added)
│   ├── JamaicanFood_Logo_1.png
│   ├── arx-logo.jpg
│   ├── triumph-brklyn-logo.png
│   ├── scharetg-pictures-logo.jpg
│   └── (company + project logos)
└── case-studies/
    ├── jamaicanfood.html
    ├── jdms.html
    ├── skunkworks-flywheel.html
    ├── strada.html
    └── victa.html
```

Note on the asset folder: it is spelled `assests` throughout the project. That
spelling is intentional and consistent, so links resolve correctly. Do not
"fix" it without renaming the folder and every reference together.

Note on working copies: an older template version of `index.html` has circulated
alongside the live page. The live landing page has the real Career at a Glance
section, real experience entries, and the real project cards. The template copy
has placeholder content (Project Alpha, Acme Corp). Always confirm you are
editing the live page, not the template snapshot.

---

## 3. Design system

All visual decisions trace back to a small set of tokens defined in
`css/style.css` under `:root`.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#fafafa` | Page background |
| `--bg-alt` | `#f4f4f5` | Alternate surface |
| `--surface` | `#ffffff` | Cards, panels, nav |
| `--border` | `#e4e4e7` | Hairline borders |
| `--text` | `#09090b` | Primary text |
| `--text-2` | `#71717a` | Secondary text |
| `--text-3` | `#a1a1aa` | Muted text, ticks, leaders |
| `--accent` | `#6366f1` | Indigo accent |
| `--accent-dim` | `#eef2ff` | Accent wash |
| `--radius` | `10px` | Standard corner radius |
| `--nav-h` | `64px` | Reference nav height |
| `--font` | Inter stack | Body and headings |
| `--transition` | `0.2s ease` | Standard transition |

Layout: content is capped by a `.container` at `960px` max width with `24px`
side padding. The theme is light only. The accent is used sparingly.

Shared component patterns established during the build and reused across pages:
section labels and titles, the scroll reveal animation (`.reveal` to `.visible`),
case study hero layouts, metadata grids, native HTML tables, pull quotes,
callout boxes (`.case-callout`), and previous/next pagination.

---

## 4. Build timeline

Changes are grouped into phases in the order they happened. Each phase lists
what changed and why.

### Phase 0 — Starting point

The project began from a generic portfolio template: a landing page with
placeholder projects and placeholder employment history, a global stylesheet
already organized around the token system above, and one JavaScript file
handling scroll reveal, scroll spy nav highlighting, and the mobile menu toggle.

### Phase 1 — Case study integration (June 10)

Goal: bring four case studies into the site as native pages rather than PDFs.

- Created the `case-studies/` directory.
- Built four standalone HTML pages, each reusing the existing nav, footer,
  scroll reveal system, and JavaScript without modification:
  - **Skunkworks** — internal accelerator proposal for enterprise tool adoption
    at American Express U.S. Consumer Marketing.
  - **JDMS** — drone-mapping startup moving from survey services to a geospatial
    data platform.
  - **JamaicanFood** — zero-to-one iOS recipe box builder for the Jamaican
    diaspora.
  - **VICTA** — self-initiated veteran reintegration community proposal.
- Appended case study styles to `style.css` using the existing tokens: hero
  layouts, metadata grids, tables, pull quotes, callout boxes, and prev/next
  pagination.
- Replaced the placeholder project cards on the landing page with four real
  cards, each linking out with a "Read case study" call to action, and removed
  the fake GitHub and live demo buttons.
- Fixed a pre-existing `hhttps://` typo in the contact section.

Two items were flagged for follow up at this point: the hero resume button
referenced a missing file, and the experience timeline still held template
placeholder jobs.

### Phase 2 — Context sections (June 18)

Goal: give every case study an opening Context section that frames why the work
exists and what larger effort it represents.

- Wrote a Context section for all five case studies, including **Strada** (a
  vertically integrated motorcycle lifestyle brand in concept phase), which was
  added as the fifth case study page.
- Each Context section was placed as the first `.case-section` and built from
  the existing `case-section`, `reveal`, and `case-callout` classes, so no core
  files were touched.
- Each section was grounded in content already on the page rather than invented
  framing, and differentiated from whatever section followed it.
- Flagged two adjacency concerns for review: VICTA places Context directly
  before an existing Background section, and Skunkworks places it before an
  existing Overview section, in both cases putting two scene-setting blocks back
  to back.

### Phase 3 — Companies section (June 18)

Goal: add a logo wall of past employers to the landing page.

- Added a "Companies I've Worked For" section after the Career at a Glance
  section, using the existing section label, title, and reveal patterns.
- Added `.companies` styles to `style.css`: a centered flex-wrap grid of uniform
  tiles, a subtle hover lift, a reduced-motion fallback, and a mobile breakpoint.
- Used full-color logos in uniform tiles rather than grayscale-on-hover, because
  two logos have baked-in backgrounds that turn muddy when desaturated.
- Optimized assets along the way: cropped letterbox bars from one logo, and
  trimmed and downscaled another from roughly 477 KB to 65 KB.

### Phase 4 — Custom domain on GitHub Pages (June 19)

Goal: serve the finished site on a custom domain.

- Verified domain ownership in GitHub via a DNS TXT record.
- Configured DNS at the registrar: apex A records to the GitHub Pages addresses
  (185.199.108.153 through 185.199.111.153), the matching IPv6 AAAA records, and
  a CNAME for the `www` subdomain.
- Set the custom domain in repository Pages settings and enabled HTTPS once DNS
  propagated.
- Noted the recurring gotcha that a build process must not overwrite the `CNAME`
  file, and that the `www` form is more resilient to future IP changes than the
  apex.

### Phase 5 — Security hardening (June 19)

Goal: bring the site up to modern front-end security practices without breaking
anything. See section 5 for the resulting architecture.

- Audited the whole site against eight requested protections and mapped each to
  what actually applies on a static, no-input GitHub Pages site.
- Confirmed the cross-site scripting surface is effectively nil: no `innerHTML`,
  `eval`, `document.write`, no forms, no rendering of untrusted input.
- Confirmed all external links already carry `rel="noopener noreferrer"`, that
  there are no iframes to sandbox, and that there are no CDN scripts, so
  Subresource Integrity has nothing to apply to. The only external origin is
  Google Fonts.
- Authored a strict Content Security Policy delivered through a `<meta>` tag
  (the host cannot set headers), plus a referrer policy meta tag.
- Established the clickjacking position: `X-Frame-Options` is header only and
  `frame-ancestors` is ignored inside a meta CSP, so on this host a JavaScript
  frame-buster is the only available defense, and it is optional given there are
  no authenticated or state-changing actions.

### Phase 6 — JamaicanFood CSP refactor (June 19)

Goal: make the most style-heavy page compatible with the strict CSP.

- The JamaicanFood page carried an embedded `<style>` block plus 47 inline
  `style=` attributes (10 of which set CSS custom properties for per-stage
  theming). A strict `style-src 'self'` would have blocked all of it.
- Moved the embedded `<style>` block out to `css/jamaicanfood.css`, linked from
  the page with the correct `../css/jamaicanfood.css` path.
- Extracted all 47 inline attributes into classes: stage accent modifiers
  (`stage--green` and so on), palette swatches (`sw-*`), mode tiles (`mi--*`),
  component modifiers (`statusbar--light`, `btn-ghost--invert`, `line--promo`,
  `field-label`, and others), and a small set of spacing and font-size utilities.
- Raised the new rules to the needed specificity with a doubled `.jf-mockup`
  prefix so they win over deep base selectors, and kept the block last in the
  file so source order resolves ties. The result renders identically with zero
  inline styles, so the page now runs the same strict CSP as the others.

### Phase 7 — Hero redesign (June 19)

Goal: make the landing hero a two-column layout with an annotated design style.

- Converted `.hero__inner` (used only on the landing page) into a two-column
  grid: text on the left, a framed portrait on the right.
- Built the annotated media: a framed image, a dashed selection outline, a small
  `fig. 01` spec tag, and three annotation callouts with accent-colored leader
  lines and anchor dots. The callout text is drawn from the bio
  (community-first, data-driven platforms, cross-functional delivery).
- Kept the whole feature class-based with no inline styles, so it stays
  compatible with `style-src 'self'`.
- Added a stacking breakpoint at 860px that collapses to one column, caps the
  image width, and hides the annotations and dashed box for a clean mobile hero.
- Fixed two bugs found in the hero markup: a corrupted LinkedIn SVG path that
  would not render, and an `outlook.com.com` email typo.

### Phase 8 — Navigation animation and scroll fix (June 19)

Goal: add an entrance animation to a new floating pill navigation.

- The floating nav (centered, rounded, blurred, animated entrance) had a missing
  closing brace on its `@keyframes` block. Because the nav sits near the top of
  the stylesheet, the unterminated block corrupted the rules that followed and
  broke page scrolling.
- Closed the `@keyframes` block, which restored scrolling.
- Restored two things dropped from the original nav rule: `z-index` (so the fixed
  bar is not covered by later content) and the `-webkit-` backdrop-filter prefix
  for Safari.
- Noted that the existing `.nav.scrolled` state now only changes a border color
  the pill no longer has, and that `scroll-padding-top` should be bumped to about
  90px to match the lower floating bar.

---

## 5. Security architecture

The site is static and served by a host that cannot set HTTP response headers.
Everything below works within that constraint.

### Content Security Policy

Delivered per page through a `<meta http-equiv="Content-Security-Policy">` tag.
After the JamaicanFood refactor, every page runs the same strict policy:

```
default-src 'self';
script-src 'self';
style-src 'self' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self';
connect-src 'self';
object-src 'none';
frame-src 'none';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
upgrade-insecure-requests
```

No `'unsafe-inline'` anywhere, for scripts or styles. This is why the project
bans inline `style=` attributes and inline event handlers: they would require
loosening this policy. `frame-ancestors` is included for correctness but is
ignored inside a meta tag, so it only takes effect if the site later moves to a
host that supports real headers.

### Supporting measures

- **Referrer policy:** a `<meta name="referrer" content="strict-origin-when-cross-origin">`
  tag limits referrer leakage on outbound links.
- **External links:** every `target="_blank"` link carries
  `rel="noopener noreferrer"`.
- **Font and resource loading:** locked to `'self'` plus the two Google Fonts
  origins through `style-src` and `font-src`.
- **Clickjacking:** not enforceable declaratively on this host. An optional
  JavaScript frame-buster is the only available control and is low priority given
  the site has no authenticated or state-changing actions.

### What does not apply here

- **Subresource Integrity:** there are no CDN-hosted scripts or stylesheets.
  Pinning SRI on the Google Fonts stylesheet is not recommended, since the served
  CSS varies and a pinned hash would eventually break.
- **Iframe sandboxing:** there are no iframes. The recommended pattern is on file
  for whenever one is added.

### If the site moves off GitHub Pages

Real headers (`X-Frame-Options`, `X-Content-Type-Options: nosniff`, HSTS, and a
header-based CSP with working `frame-ancestors`) become available on hosts like
Netlify, Cloudflare Pages, or Vercel through a `_headers` file. The HTML needs no
changes to take advantage of that.

---

## 6. Page and component reference

| Page | Path | Notes |
|---|---|---|
| Landing | `index.html` | Hero, Career at a Glance, Companies, Projects grid, Experience, Skills, Contact |
| JamaicanFood | `case-studies/jamaicanfood.html` | Uses `css/jamaicanfood.css`; fully class-based, strict CSP |
| JDMS | `case-studies/jdms.html` | Strict CSP, head swap only |
| Skunkworks | `case-studies/skunkworks-flywheel.html` | Strict CSP, head swap only |
| Strada | `case-studies/strada.html` | Strict CSP, head swap only |
| VICTA | `case-studies/victa.html` | Strict CSP, head swap only |

`js/main.js` provides three behaviors used site-wide: scroll reveal via an
IntersectionObserver that adds `.visible` to `.reveal` elements, a scroll spy
that toggles `.scrolled` on the nav and `.active` on the current section link,
and the mobile burger menu toggle.

---

## 7. Project conventions

These are the rules the build has followed and should keep following.

- **No inline styles, no inline event handlers, no inline scripts.** Required by
  the strict CSP. Anything visual goes into a class; anything behavioral goes
  into `main.js` or a same-origin script file.
- **No em dashes** in any content or documentation.
- **Deliver focused changes.** Work is handed back as the specific section or
  file that changed, with structural flags noted briefly, rather than full-file
  rewrites that could overwrite live work.
- **Ground content in what already exists** on the page rather than inventing
  framing.
- **Read before writing.** Existing files are read first so new work fits the
  established structure and does not duplicate adjacent content.
- **Reuse the token system.** New components use the `:root` variables and the
  existing section, reveal, and container patterns.
- **Keep the `assests` folder name as-is** unless renaming it and every reference
  together.

---

## 8. Known open items

Tracked so nothing gets lost.

- **Hero portrait asset.** `assests/kare-davy.jpg` needs to be added. Once the
  real image is in, the three annotation anchor positions may need nudging to
  land on the intended spots. The frame uses a 4:5 crop; adjust if the image is
  landscape.
- **Apply the strict CSP head to every page.** The JamaicanFood page is done.
  The strict `<head>` block (CSP plus referrer policy) should be present on the
  landing page and the other four case studies.
- **Experience timeline.** Template placeholder jobs from the starting point were
  flagged for replacement with real work history. Confirm the live page reflects
  real entries.
- **index.html template vs live divergence.** Reconcile the older template copy
  with the live landing page so edits always target the live version.
- **Context section adjacency.** Review the VICTA (before Background) and
  Skunkworks (before Overview) pages where two scene-setting sections sit back to
  back.
- **Navigation polish.** The floating nav's `.scrolled` state currently changes a
  border the pill no longer has; give it a visible effect or retire it. Bump
  `scroll-padding-top` to about 90px so anchored sections clear the lower bar.
- **Self-hosting fonts (optional upgrade).** Moving Inter and Fraunces to local
  files would drop both Google Fonts origins from the CSP, remove a third-party
  request, and tighten font loading control.
- **True security headers (optional).** Available only if the site migrates to a
  host that supports a `_headers` file.

---

*Last updated: June 19, 2026.*