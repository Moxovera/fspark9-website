# fspark9 site rebuild · Claude Code brief v4

September 2026. Repo: `Moxovera/fspark9-website` (checked at commit `fd1c65d`). This version replaces v1 and v2. It is written against the actual code and Mehmet's decisions of 23 September 2026:

- Everything is built on staging first and goes live in one step.
- Sanity is done last, in one simple pass, with no complex migration.
- `/book` is removed.
- The About page is About everywhere.
- There is no Google Analytics. The Search Console tag stays, so the site is indexed properly.
- The Spark episode page has its own board.

Read this file, then the repo's own `CLAUDE.md` and `FSPARK9-DURUM.md`. Everything in `CLAUDE.md` still applies unless this brief says otherwise in section 2. Work autonomously. Stop only if the repo contradicts this brief in a way you cannot resolve.

## Staging first, Sanity last, then one launch

Nothing in this rebuild touches production until the whole site is done. Then it goes live in one step.

**Code**

- All work happens on the `staging` branch, which already exists and today equals `main`.
- Open feature branches from `staging` and merge back into it, one section per commit as usual.
- Never push to `main` during the rebuild.
- Vercel gives the `staging` branch its own preview URL. Every check in section 14 runs there.

**Content while building: static files first, Sanity last**

- New pages read their copy from typed files in `src/content/` (`en.ts`, `tr.ts`, `services.ts`, `work.ts`, `about.ts`, `spark.ts`). The props interfaces live in `src/types/content.ts`.
  - This is the pattern the repo already uses. Components only see the `types/content.ts` interfaces, so moving the source to Sanity later changes only `page.tsx`, not the components.
- Staging reads only existing Sanity documents: legal blocks, case screens and images, Spark episodes, and `calLink`. It writes nothing to Sanity and changes no schema.
  - The live site keeps working untouched, and no staging dataset is needed.
- Add no new schema and run no seed while pages are being built.

**Sanity, as the last step before launch** (section 6)

1. Add the new schema types and fields. This is additive only: nothing is renamed or removed yet, so the live site and its Studio keep working.
2. Run one seed script. It writes the new documents from the same `src/content` files with `createOrReplace`, and patches new fields onto existing documents. None of it is visible on the live site, because the live code does not query these types or fields.
3. Switch the staging pages from the static files to Sanity queries, one page at a time, and check each against the same boards.
4. Drift check: `src/content` and Sanity match.

**Launch day, in this order**

1. Export a production backup: `npx sanity dataset export production backups/production-YYYY-MM-DD.tar.gz`. Do not commit it.
2. Apply the content changes that would show on the old site if done earlier (listed in 6.3): the Privacy and Cookies text, Bó's `publishedAt`, and the Sector reports format.
3. Merge `staging` into `main`.
4. Check the live site with the section 14 list.
5. In Search Console, submit the sitemap and ask for indexing of the home, service, work and Spark pages (section 11).

**After launch** (a separate, small commit, once the new site has run a few days):

- Delete the old schema types and fields, old documents and unused image assets (6.4).
- Keep the backup for at least a month.

**Staging hygiene**

- Preview deployments stay out of search engines. Vercel sends `X-Robots-Tag: noindex` on preview URLs; confirm it is there.
- Canonical URLs always point to `https://fspark9.com`, never to the preview host.
- Test bookings on staging reach the real calendar. Cancel them right after.
- `/locked` is not touched in this rebuild (section 1).

## 0. Inputs

1. **Design boards: `fspark9-design-boards-v2.zip`**
   - Contents: `boards/*.dc.html` (the source of every artboard) and `screens/*.png` (full page screenshots at 1440 and 375).
   - Unzip it into `_design/v2/`. It becomes the design source of truth, the way `_design/fspark9 Site.dc.html` was for v1.
   - Keep the old file in `_design/v1/` for reference.
   - Where to compare: at 1440 and 375, the boards win on any visual detail. At 768, build a sensible middle and check it.
2. **Copy: `fspark9-site-copy-v2.md`.** The only source of text. Never write copy.
3. **Brand: `fspark9-brandbook-v3.md`.**
4. **Logo: `fspark9-logo-v2.zip`.** Wordmark and symbol as SVG in Ink and Paper, PNGs, `favicon.ico`, `icon.svg` and `apple-icon.png` for `src/app/`. Use the files.
5. **Legal update: `fspark9-legal-update-v2.md`.** The new Privacy and Cookies blocks.
6. **OG images: `fspark9-og-en-v1.png` and `fspark9-og-tr-v1.png`** (1200 × 630). `og/render.tsx` draws the same layout, and these PNGs are the reference.

Put the four md files, the two OG images and the unzipped logo pack in `_design/v2/` next to the boards.

## 1. What already works and must keep working

Do not rebuild these. Keep their logic and only restyle them.

- **Stack:** Next.js 15.5 (pinned, do not upgrade to 16), App Router, TypeScript, Tailwind v4 CSS first (`@theme inline` in `globals.css`), next-intl 4, next-sanity 11, Sanity 4, Studio embedded at `/studio`.
- **i18n:**
  - `localePrefix: 'as-needed'`, so EN lives at the root (`/work`) and TR under `/tr` (`/tr/work`).
  - There is no `/en` prefix. Every URL in v1 of this brief that started with `/en` was wrong.
  - Localised pathnames live in `src/i18n/routing.ts`.
- **Three root layouts, each with its own `<html><body>`:**
  - `src/app/[locale]/layout.tsx`
  - `src/app/global-not-found.tsx` (needs `experimental.globalNotFound`)
  - `src/app/(locked)/layout.tsx`

  Anything that must exist on every page is added to each root it belongs to. Section 9 says which roots get what.
- **`/locked/[client]`:** leave it completely untouched. It has its own CSS tokens (`locked-report.css`), its own gate and its own noindex headers. It imports `fraunces`, `cabin` and `ibmPlexMono` from `src/lib/fonts.ts`, so those three exports must stay. Prove it is untouched with a before and after screenshot of `/locked/fuzul`.
- **Sanity pattern:**
  - Bilingual fields are objects `{ en, tr }` (`localeString`, `localeText`, `localeSlug`).
  - GROQ picks the language with `select($locale == "tr" => coalesce(x.tr, x.en), x.en)`.
  - Every query has a `toX()` mapper that turns `null` into safe defaults and returns an interface from `src/types/content.ts`.
  - Types come from `npm run typegen` (`sanity.types` into `src/sanity/types.ts`).
  - Fetching goes through `sanityFetch` with 60 second revalidation and tags.
  - Keep all of this.
- **Content mirrors:**
  - `src/content/en.ts` and `tr.ts` mirror Sanity.
  - `seed-*.ts` scripts write them into Sanity, and `check-spark-drift.ts` compares them field by field.
  - Keep the mirror rule and extend it (section 6.5).
- **Pages that stay static in `src/content/`:** `/thank-you` and the 404. This is a deliberate decision in `CLAUDE.md`, so do not move them into Sanity. `calLink` comes from `siteSettings`. The `/book` page is removed (section 3).
- **Booking:**
  - `BookingProvider` plus `useBooking` open `BookingOverlay`.
  - `CalEmbed` is a small client leaf. It listens to `bookingSuccessfulV2` and redirects to `/thank-you`.
  - Cal.com must never load before the visitor clicks Book a call (the privacy text promises this, see 8.2).
- **Spark:**
  - Formats and episodes come from Sanity with slugs per locale (`the-last-day` and `son-gun`, episode `01-bo`).
  - `SparkAltSlugContext` plus `SparkAltSlugRegistrar` keep the language switch working on those pages.
  - Day counts are computed by `computeDayCount` from `launchDate` and `closureDate`. They are never typed in.
  - Episode 01 has interactive blocks (The Call, The Estimate, The Weigh, The Signal, The Second Opinion, The Allocation, Scorecard). Their state lives in `localStorage` under `fspark9.lastday.v2`, via `useLastDayState`. Keep all of it working.
- **SEO:**
  - `toMetadata()` in `src/lib/metadata.ts` builds canonical, hreflang (`en`, `tr`, `x-default`), Open Graph and Twitter tags.
  - `sitemap.ts` and `robots.ts` exist.
  - The Organization JSON-LD is in the locale layout.
  - Search Console verification is `verification.google` in the locale layout.
  - The OG image is rendered by `src/app/og/render.tsx` and uploaded to Sanity by `npm run upload-og-image`.
- **Headers and redirects in `next.config.ts`:** the `/locked` noindex headers, the `/legal` to `/impressum` redirects, and the SVG image config with its CSP. Keep all of them.
- **Other working pieces to keep:**
  - `HomeScrollMemory`, which restores the home scroll position with `sessionStorage`.
  - The shared reveal system: `useReveal`, `Reveal` and the `html.js` class script.
  - `Marquee`: reuse it for the Spark ticker.
  - `LocaleSwitcher`.

## 2. House rules from `CLAUDE.md` that this build must follow

These override anything in the boards.

- **Motion:** no animation libraries (no framer-motion, GSAP or AOS) and no CSS in JS. `styled-components` stays in `package.json` only because Sanity Studio needs it.
- **Colours:** no hard coded hex in components. Every colour is a CSS variable in `globals.css`, bound in `@theme inline`.
- **Icons:** no Unicode arrows or symbols in text (→ ← ↓ ↗ ×).
  - Every arrow, chevron and close mark is inline SVG: 24 × 24 viewBox, `stroke="currentColor"`, `strokeWidth="1.8"`, round caps and joins.
  - The boards use text glyphs for speed. Convert every one of them.
  - This includes `GoButton`, `BackLink`, "Show all ↓", the booking close button, and the 404 link text in `src/content/not-found.ts`, where the trailing arrow must be removed.
- **Components and data:**
  - Components take props and never contain text.
  - Every prop type lives in `src/types/content.ts`. `any` is banned.
- **Server and client:**
  - Server Components by default.
  - `'use client'` goes on the smallest part that needs it, such as the dial hover, the ticker, the header scroll state, menus, and the booking window.
- **Effects:** every `useEffect` that adds a listener, observer or loop cleans it up.
- **Sticky:** no `transform`, `filter`, `perspective`, `will-change` or `overflow: hidden` on any ancestor of a sticky element. The header is sticky now, so do not wrap page sections that contain sticky parts in `Reveal`.
- **Tailwind quirk:** `max-[Npx]:` compiles to "below N", so write the real threshold.
- **Images:** anything using `next/image` gets tested with `npm run build && npm run start`, not only `dev`.
- **Fonts:** every font comes from `next/font/google`, which self hosts them. Never load a Google Fonts `<link>`. The boards use one only for preview. The legal pages promise that nothing loads from Google Fonts.
- **Pace:** one section per request, one commit per section (`feat(section): opening`).
  - Run `npm run build` and `npm run lint` before every commit.
  - Push, then check the Vercel preview.
- **Three passes per section (A structure, B style, C motion):**
  - Pass B uses Playwright against `_design/v2/boards/*.dc.html`.
  - It compares computed styles, as `CLAUDE.md` describes.
- **Checklist:** the section checklist in `CLAUDE.md` applies to every section, including the separate check of every absolute and fixed element at 375, 768 and 1440.
- **Copy:** no dashes in visible copy (section 14 has the check). Do not "improve" the design.

## 3. Routes

EN at the root, TR under `/tr`. Add the new entries to `routing.ts` pathnames.

| Page | EN | TR | Status |
|---|---|---|---|
| Home | `/` | `/tr` | rebuild |
| Services index | `/services` | `/tr/services` | rebuild as a short index (section 7.6) |
| Service page ×4 | `/services/[slug]` | `/tr/services/[slug]` | **new** |
| Work | `/work` | `/tr/work` | rebuild |
| Case | `/work/[slug]` (`insha`, `ruut`) | same | rebuild |
| About | `/about` | `/tr/about` | **renamed** from `/story`, with 301s from `/story` and `/tr/story` |
| Spark | `/spark` | `/tr/spark` | rebuild |
| Format page | `/spark/[formatSlug]` (`the-last-day`, `sector-reports`) | `/tr/spark/[formatSlug]` (`son-gun`, `sektor-raporlari`) | rebuild |
| Episode | `/spark/[formatSlug]/[episodeSlug]` (`the-last-day/01-bo`) | `/tr/spark/son-gun/01-bo` | restyle only (section 7.7) |
| Book | `/book` | `/tr/book` | **removed**. 301 to `/?book=1` and `/tr?book=1`, which opens the booking window |
| Thank you | `/thank-you` | `/tr/thank-you` | rebuild (board ThankYou) |
| Legal ×4 | `/impressum`, `/terms`, `/privacy`, `/cookies` | `/tr/impressum`, `/tr/kullanim-sartlari`, `/tr/gizlilik`, `/tr/cerezler` | restyle. Text unchanged except Privacy and Cookies (8.2) |
| 404 | `global-not-found.tsx` and `[locale]/not-found.tsx` | | rebuild (board NotFound) |
| Locked | `/locked/*` | | untouched |

Service slugs, the same in both languages, following the case study pattern:

- `zero-to-live`
- `product-strategy`
- `embedded-finance`
- `expansion-gtm`

**Old names go.** Nothing named after the old site stays in code, Sanity or URLs:

- **About:** the route, folder (`app/[locale]/about`), content file (`src/content/about.ts`), type (`AboutPage`), queries (`ABOUT_PAGE_QUERY`, `ABOUT_PAGE_SEO_QUERY`), mapper (`toAboutPage`), Sanity document type (`aboutPage`), nav link and every internal link use About. After the rename, `grep -rni "story" src` returns nothing, except inside `/locked`.
- **Next step:** `subpageCta`, `SubpageClosingCta` and `ClosingCta` become `nextStep` and `NextStep`.
- **Book page:** `src/content/book.ts`, the `BookPage` type, the `/book` folder and the `/book` sitemap entry are deleted. Every internal link that pointed to `/book` becomes a `BookingCta` that opens the window.
- **Booking deep link:** `BookingProvider` opens the window when the URL has `?book=1`, then removes the parameter with `router.replace`. This is the visitor's own click on a link, so the Cal.com promise still holds. It keeps old links in emails and on LinkedIn working.
- **Legal:** `/impressum` keeps its route, because Impressum is the legal term in Germany. The visible label is "Imprint".

The old service keys (`proposition-blueprint`, `partner-selection`, `market-expansion`, `experience-build`) were never routes, so they need no redirects.

## 4. Tokens and fonts

**Colours.** In `globals.css`, replace the navy, bronze and ivory tokens with these:

```css
:root {
  --paper: #F3F1EB;
  --ink: #17150F;
  --white: #FFFFFF;
  --stone: #5E594F;    /* secondary text */
  --rule: #D8D3C8;     /* lines, empty slices, never text */
  --flare: #FFC629;    /* ninth slice, one accent, never text on Paper */
  --dust: #A39D90;     /* small labels on Ink only */
  --inkrule: #3A362D;  /* lines on Ink */
  --ring: #4A453B;     /* hero ring outline */
}
@theme inline {
  --color-paper: var(--paper);
  --color-ink: var(--ink);
  /* ...and the rest, one line each */
  --font-display: var(--font-epilogue);
  --font-sans: var(--font-hanken);
  --font-mono: var(--font-spline-mono);
}
```

- Remove the old off brand `color-mix` notes that belong to the old sections.
- Keep the reveal CSS block, then change its values to `translateY(16px)` and `.4s` (section 10).

**Fonts.** In `src/lib/fonts.ts`:

- Add `Epilogue` (700, 800), `Hanken_Grotesk` (400, 500, 700) and `Spline_Sans_Mono` (500).
- Use `subsets: ["latin", "latin-ext"]`. Turkish needs `latin-ext`.
- Keep the three existing exports for `/locked`.

**Old tokens.** A token mapping for any component you restyle rather than rebuild (the episode page, the legal blocks):

| old | new |
|---|---|
| `navy` (dark ground) | `ink` |
| `ivory` (light ground) | `paper` |
| `charcoal` (text) | `ink` |
| `muted` | `stone` |
| `bronze` accents, rules, hovers | `ink` (rules and hovers). Never `flare`, unless it is the one Flare element of that view |
| rounded corners, pills, shadows | removed (square corners, no shadows) |

## 5. Global chrome

- **Header:**
  - Dark over the Ink opening and light (Paper) after 80px of scroll. Sticky on every page.
  - Desktop contents: Logo · Services (menu button) · Work · About · Spark · EN/TR · Book a call.
  - Mobile contents: Logo · burger.
  - Keep `HeaderFrame`'s current logic for scroll state and extend it.
- **Services menu:** it lists the four `servicePage` documents with their small dials. It opens on click and keyboard, and on hover after 120ms.
  - `aria-expanded` on the button.
  - Closes on Escape, on an outside click and on route change.
- **MobileNav:** a full screen Ink sheet (board MobileMenu), with a focus trap and Escape to close.
- **MobileBookingBar:** keep it. On mobile the header shows no booking button, so this bar is the booking entry point.
  - It shows below 900px: a Paper bar with a Rule top line and the Flare cut button at full width.
  - Hide it while the booking window or the mobile menu is open.
- **Footer:** Logo · email · LinkedIn · Imprint · © year fspark9.
  - The footer links only to Imprint (TR Künye). Privacy, Cookies and Terms of use are reached through `LegalTabs` on the legal pages.
  - Its data comes from `siteSettings.footer` (`email`, `linkedin`, `legalLinks` with the one Imprint link, `copyright`).
  - The old `tagline`, `nine`, `signature`, `nav` and `legal` fields are no longer rendered, and are deleted after launch (see 6.4).
- **NextStep:** the Ink close block on every page except legal, `/thank-you` and the 404. Its data comes from `siteSettings.nextStep` (6.1).

## 6. Sanity

### 6.1 Schema changes

Every text field is `localeString` or `localeText` unless noted. Reuse fields that already exist wherever the meaning matches. Only add what is missing.

**`siteSettings`** (singleton)

| field | status | notes |
|---|---|---|
| `seo`, `logo` | keep | upload the new logo with `npm run upload-logo` |
| `nav` | keep | links for Work, About (`/about`) and Spark. Services is rendered from `servicePage` documents |
| `servicesMenuLabel` | new | "Services" |
| `booking` | keep | `calLink` = `mburakdikmen/quick-chat`, `title` = "Book a call", `meta1` = "Free · 30 minutes". `body` and `meta2` stay but are unused |
| `nextStep` | new, replaces `subpageCta` | `label`, `headlineLead`, `headlineCut` (the word that gets the Flare cut), `steps` (array of 2 `localeString`), `ctaLabel` |
| `footer` | keep | `email`, `linkedin`, `legalLinks` (only Imprint), `copyright` are used. `tagline`, `nine`, `signature`, `nav` and `legal` are removed |

**`homePage`** (singleton): replace the section fields with these.

- `opening`: `eyebrow`, `headlineSentences` (array of `localeString`, one sentence per line), `cutWord`, `intro`, `secondaryLinkLabel`.
- `startWhereYouAre`: `label`, `heading`, `items` (3 × `title`, `text`).
- `fourServices`: `label`, `heading`, `intro`, `services` (4 references to `servicePage`, ordered).
- `work`: `label`, `heading`, `featured` (a `caseStudy` reference), `cases` (references), `also` (array of `name` string plus `line`).
- `withMe`: `label`, `heading`, `text`, `points` (4 × `title`, `text`), `portrait` (image with alt).
- `spark`: `label`, `heading`, `text`, `linkLabel`. The cards are queried from episodes.

**`servicePage`** (new document, ×4).

- Do not name it `service`: that name is already taken by an object type.
- `slug` is a string with the same uniqueness validation as `caseStudy`.
- Other fields: `order`, `name`, `shortLine` (the row and menu line), `audience`.
- `slices`: `number[]`, validated as integers 1 to 8 with no duplicates. The ninth slice is never stored because it is always on.
- `opening`: `label`, `heading`, `intro`.
- `steps`: array of `title`, `line`, `slices` (`number[]`).
- `keep`: array of `localeString`. Plus `seo`.

**`servicesPage`** (singleton): keep `seo` and `hero`. It drives the `/services` index.

**`workPage`** (singleton): keep `seo` and `hero`. Add `lead`.

**`caseStudy`**: keep the document and its slugs. Map the new design onto it as follows.

| design | field |
|---|---|
| one line | `subtitle` (keep) |
| market | `location` (keep) |
| Where they were stuck, lead and body | `problemHeading` (keep, holds the label), add `problemLead`, `problem` (keep, body) |
| What we did, bullets | `actions[]` (keep). Render `description` as the bullet text |
| What happened, lead and body | `deliveredHeading` (keep, label), add `deliveredLead`, `delivered` (keep, body) |
| service tags and slices | add `services` (references to `servicePage`). The slices shown are the union of their slices. `tags` stays as a fallback |
| proof on Work | add `proof` (`value` string, `label`) |
| three figures | add `figures` (array of `value` string plus `label`, validation exactly 3) |
| sources | add `sources` (string array) |
| screens | `screens[]` (keep) |
| no longer used | `coverImage`, `logo`, `detailEyebrow`, `detailIntro`, `body` |

**`aboutPage`** (new singleton, replaces `storyPage`):

- `hero`: `label`, `headlineSentences`, `cutWord`.
- `pair`: 2 × `label`, `lead`, `body`.
- `result`: `label`, `lead`, `body`.
- `whyNine`: `label`, `text`.
- Move the About copy into it, then delete the `storyPage` document and its schema.

**`legalPage`**: no schema change. `hero.title` is the H1. The blocks render with the new `LegalBlocks` styles. Do not touch the text in the blocks.

**`sparkSection`** (singleton):

- `hero`: `title` = "Spark", `intro` = headline.
- `tickerTail`: new field, "Numbered and dated".
- `homeModule`: new, holding `label`, `heading`, `text`, `linkLabel`.
- `homeLinkLabel` and `comingSoonLabel` are no longer rendered.

**`sparkFormat`**:

- Keep: `number`, `name`, `slug`, `status` (`live` or `preparing`), `orderRank`, `seo`, `hero`, and every episode page label (`recordLabel`, `callLabel`, day labels, scorecard labels and so on).
- Change the meaning of `subjectLine`: it is now the description line.
- Add:
  - `openLabel` ("Open The Last Day")
  - `readLabel` ("Read")
  - `comingLabel` ("Coming next" or "In preparation")
  - `aboutLines` (array of 3 `localeString`)
  - `showAllLabel` ("Show all")
  - `allIssuesLabel` ("All issues")
- `statusLine*`, `whatIsInside` and `hookLabel` are no longer rendered.

**`sparkEpisode`**:

- Extend `status` to `published`, `coming` or `draft`.
- A `coming` episode behaves like this:
  - It is listed as a row in Stone with no link.
  - It has no page, and a request for its URL returns 404.
  - It is left out of the sitemap and out of every count.
- The row line comes from `hook`. The title comes from `subject`.

### 6.2 Data to create or change

- **Four `servicePage` documents.** Copy comes from the site copy file, slices from its slice map:
  - Zero to Live: 1 to 8
  - Product & Strategy: 1, 2, 4, 5, 6
  - Embedded Finance: 2, 4, 5, 6
  - Expansion & GTM: 3, 4, 7, 8
- **insha:**
  - `figures`: 300%+ · user growth through 2020; 40,000+ · users in Germany; 6 months · to live.
  - `proof`: 40,000+ · users in Germany.
  - `sources`: FinTech Futures, Finextra, EU‑Startups.
  - `services`: Zero to Live.
- **RUUT:**
  - `proof`: UK · live today.
  - `services`: Zero to Live, Expansion & GTM.
  - `sources`: FinTech Futures, UKTN, Tech.eu.
- **Bó episode:** `publishedAt` = the day the new site goes live.
- **Nuri:** a new `sparkEpisode` with `number` 2, `subject` "Nuri", `hook` "Formerly Bitwala.", `status: coming` and no blocks.
- **Sector reports:** a `sparkFormat` with `number` 2, name "Sector reports" / "Sektör raporları", slug `sector-reports` / `sektor-raporlari`, `status: preparing`. It gets one `sparkEpisode` with `number` 1, `subject` "Sector reports", `status: coming`.

### 6.3 The Sanity pass, step by step

This is done once, at the end of staging (see Staging first, Sanity last).

1. **Schema, additive only:** add `servicePage`, `aboutPage`, the new fields on `siteSettings`, `homePage`, `workPage`, `caseStudy`, `sparkSection`, `sparkFormat`, and the `coming` status on `sparkEpisode`. Run `npm run typegen`.
2. **One seed script, `src/scripts/seed-v3.ts`** (`npm run seed:v3`, run with `SANITY_API_WRITE_TOKEN` from `.env.local`; the token never goes to Vercel):
   - `createOrReplace` for `servicePage` ×4, `aboutPage`, and the new `homePage` fields. Build them from `src/content`, the same objects the staging pages already render.
   - `patch` (set only the new fields) on `caseStudy` ×2, `sparkSection`, `sparkFormat` (The Last Day), and `siteSettings`. Images, screens and episode blocks are never touched.
   - Create Nuri (`status: coming`). The live site only lists `published` episodes, so it stays invisible there.
3. **Wiring:** switch each staging page from `src/content` to its GROQ query and `toX()` mapper, one page per commit.
4. **Launch day only,** because these would show on the old site if done earlier:
   - the Privacy and Cookies blocks (`fspark9-legal-update-v2.md`)
   - Bó's `publishedAt` = the launch date
   - the Sector reports `sparkFormat` and its `coming` episode (the old Spark hub lists every format)

### 6.4 Cleanup after launch

Once the new site has run a few days, delete everything the new site does not use. The goal is that Sanity holds only what the site shows.

- **Schema objects:** `framework`, `proofStrip`, `familiar*`, `comparison*`, `approach*`, `audience*`, `testimonial*`, `mediaSection`/`mediaItem`, `process*`, `faq*`, `closingCta`, the old home `hero`, `subpageCta`, `storyMedia`, `prose*`.
- **Documents:** `storyPage`, and any document whose type is no longer in the schema.
- **Fields:**
  - `caseStudy`: `coverImage`, `logo`, `detailEyebrow`, `detailIntro`, `body`
  - `sparkSection`: `homeLinkLabel`, `comingSoonLabel`
  - `sparkFormat`: `statusLineSingular`, `statusLinePlural`, `whatIsInside`, `hookLabel`
  - the old `footer` fields
  - `siteSettings.subpageCta`
  - the old `homePage` section fields
- **How:**
  - One script, `src/scripts/cleanup-v3.ts`, unsets the fields and deletes the documents.
  - It prints what it will delete and runs only with `--confirm`.
  - Then remove the schema definitions and run `npm run typegen`.
- **Assets:** delete every `sanity.imageAsset` with no references (`*[_type == "sanity.imageAsset" && count(*[references(^._id)]) == 0]`), which includes the old logo and OG image. List them first.
- **Code:** delete the section components, queries and mappers that nothing imports any more.

### 6.5 Drift check

Rename `check-spark-drift.ts` to `check-drift.ts` and extend it. It must compare, field by field, every Sanity field that has a mirror in `src/content/*.ts`:

- `siteSettings`
- `homePage`
- `servicePage` ×4
- `workPage`
- `caseStudy` ×2
- `aboutPage`
- `sparkSection`
- `sparkFormat` ×2
- `legalPage` ×4 (so the Privacy and Cookies update in 8.2 cannot drift)

Keep the npm alias `check:spark-drift` pointing at it and add `check:drift`. It must exit non zero on any difference.

## 7. Pages and components

Visual detail is in the boards. This section covers structure, data and behaviour.

### 7.1 Brand pieces (`src/components/brand/`)

**`Logo`**: from the SVG files, with tones `ink` and `paper`. The 9 keeps its Flare slice in both.

**`Dial`**: nine ring slices of 40 degrees each, clockwise from twelve o'clock.

- Props: `lit: number[]` (1 to 8), `size`, `tone`.
- Slice 9 is always `flare`.
- Lit slices use `ink` (`paper` on Ink). Unlit slices use `rule` (`inkrule` on Ink).
- `aria-hidden`.
- Geometry for a 100 × 100 viewBox (outer radius 50, inner radius 33, gap 1.3):

```ts
const pt = (a: number, r: number) => `${50 + r * Math.sin(a)} ${50 - r * Math.cos(a)}`;
export function slicePath(i: number, R = 50, r = 33, g = 1.3): string {
  const a0 = ((i - 1) * 40 * Math.PI) / 180, a1 = (i * 40 * Math.PI) / 180;
  const dO = Math.asin(g / R), dI = Math.asin(g / r);
  return `M${pt(a0 + dO, R)} A${R} ${R} 0 0 1 ${pt(a1 - dO, R)} L${pt(a1 - dI, r)} A${r} ${r} 0 0 0 ${pt(a0 + dI, r)} Z`;
}
```

**`RingOutline`**: the hero ring.

- Eight outlined slices (`--ring`, stroke 0.6, inner radius 35) plus slice 9 filled `flare`.
- Size: 700px on desktop, 420px on mobile.

**`Portrait`**: a round black and white image (`grayscale(1)`, `object-position: 50% 20%`).

- In the hero it sits exactly in the ring's inner hole on the same centre: 466px on desktop, 278px on mobile.
- In What you get with me: 400px on desktop, 200px on mobile.
- Use `next/image` with `priority` in the hero only.

**`CutWord`**: a Flare block with a slanted right edge behind one word, using `clip-path: polygon(0 0,100% 0,calc(100% - .32em) 100%,0 100%)`.

**`CutButton`**: Flare with an 18px slanted edge. It is Ink in the light header. It uses `BookingCta` internally, so every instance opens the booking window.

**`GoButton`**: a square Ink box with a Paper SVG arrow. Sizes 64, 48, 44 and 40. `aria-hidden`, because the row link carries the label.

**`BackLink`**: mono, SVG arrow, min height 44px. It links one level up: Home, Work or Spark.

**`Label`**: mono, 12px, uppercase, +0.08em tracking.

### 7.2 Home (`/`)

Sections in order:

1. **Opening:** Ink, `RingOutline` plus `Portrait`, headline sentences each on its own line, `CutWord`.
2. **Start where you are.**
3. **Four services:** `ServiceRows` plus `ServiceDial`.
   - Resting state: slices 1 to 8 lit.
   - Hover or focus on a row: only that service's slices are lit, and the other rows dim to 0.4.
   - On touch, the first tap lights the row and the second tap navigates.
   - This is the only client part of the section.
4. **Work:** insha featured, RUUT row, Turkcell and Albaraka strip.
5. **What you get with me.**
6. **Spark:** the latest three published or coming episodes as cards (two on mobile).
7. **NextStep.**

Keep `HomeScrollMemory`.

### 7.3 Service page (`/services/[slug]`)

- `generateStaticParams` comes from the `servicePage` slugs.
- Sections: opening with a `Dial` for the service's slices · `StepTiles` (each step's own `Dial`) · What you keep · NextStep.

### 7.4 Work and case

**Work** (`/work`): opening · lead · `CaseRow` per case. Each row has its name, one line, service tags, proof, "Read the case" and a `GoButton`. The whole row is one link. There is no Also strip on this page.

**Case** (`/work/[slug]`):

- Opening with `PhonePair` (screens) on the right on desktop.
- `MarkerFigures`: one Flare cut block, 64px slant on desktop and 36px on mobile, figures in Ink with 1px Ink dividers. They stack on mobile.
- `PairAndResult`: two White cards (2px Ink top rule), then the result card. The result card has a 4px Ink top rule and a full `Dial`. Bullets are 7px Ink squares.
- Sources line.
- Next case row.
- NextStep.

### 7.5 About (`/about`)

Opening (ring and portrait, like home) · `PairAndResult` (Who I am, Why I do this, then How I work) · `WhyNineLine` (2px rule, label and one sentence, no dial) · NextStep.

### 7.6 Services index (`/services`)

There is no board for this page. Build it from existing parts:

- the page opening pattern, with `servicesPage.hero`
- the home Four services block (`ServiceRows` plus `ServiceDial`, each row linking to its page)
- NextStep

This keeps the menu's "Services" target alive and gives search engines one page listing all four.

### 7.7 Spark

**Spark** (`/spark`):

- Opening: the big word, the headline, and `SparkTicker` (reuse `Marquee`).
- The ticker items are the latest episodes plus `tickerTail`, separated by a Dust slash. There is no Flare in the ticker.
- `FormatBlock` per format:
  - Big number: solid when `live`, 2px outline when `preparing`.
  - Name, description and open link.
  - `IssueRow`s: at most 3. If there are more, show "All N issues" linking to the format page.

**Format page** (`/spark/[formatSlug]`):

- `SparkSubnav` under the header: Spark · 01 The Last Day · 02 Sector reports, with the current one underlined.
- Opening with a big outline number.
- `EpisodeList`, newest first. Each row: Nº, subject, hook, days, date, `GoButton`.
  - `coming` rows are in Stone with no link.
  - It shows 10 rows, then a "Show all N episodes" button that expands the list in place (a client leaf).
- About this format: 3 lines.
- NextStep.

**Episode page** (`/spark/[formatSlug]/[episodeSlug]`): boards Episode and EpisodeM.

The content, block order, mechanics and `localStorage` keys (`fspark9.lastday.v2`) stay exactly as they are. Only the presentation changes.

- **Chrome:** `SparkSubnav`, then `BackLink` (← The Last Day).
- **Opening (Ink):**
  - label "The Last Day · Nº 01", the subject huge, and the meta line (parent · country · launch to closure date) in Dust
  - on the right, the day count as a big outline number with "days open, launch to closure"
  - All of it comes from `parent`, `country`, `launchDate`, `closureDate` and `computeDayCount`.
- **Ruler (White):**
  - one line from day 0 to the closure day, with a tick for every block date
  - labels only on the events that have a Record heading, as room allows. On mobile: first, middle and last.
  - The closure tick is the one Flare element of this view.
  - Anything after closure (the regulator's letter) is shown after the line as "Then, a year later · Day 573 · …".
- **Standfirst (Paper):** `standfirst` in Epilogue 700 36px, then a mono line: Built from the public record · Evidence taken · Last checked.
- **Body:**
  - Desktop: a sticky day clock in the left two columns. It is the existing `EpisodeClock`: day number, date, a progress bar out of the closure day, and "of 156".
  - The blocks sit in columns 4 to 11. On mobile the clock is a thin sticky bar under the header.
- **Records:** White, 2px Ink top.
  - Top row: "Record" and "Day 070 · 5 Feb 2020".
  - Then the heading, the body, an optional quote (Epilogue 700, attribution in mono) and a source link (mono, underlined, SVG external arrow).
- **fspark9 notes:** no card. A 1px Rule top, then a small full `Dial` with "fspark9 · Note" and the day, and the body in Epilogue 700 22px.
- **Mechanics** (Call, Estimate, Weigh, Signal, Second Opinion, Allocation): White, 4px Ink top.
  - Top row: the mechanic name and the day. Then the prompt in Epilogue 800.
  - Options are square `button`s with a 2px Ink border and `aria-pressed`. Chosen: Ink fill. The others dim to 45% after a choice.
  - The result line is mono with a small Ink square ("Your call matches the record.", "The record went the other way.", "Your reading, not scored.").
  - The reading comes under a 1px Rule.
  - The Estimate shows the real figure big (11,413).
  - The Second Opinion shows its two readings side by side on desktop.
  - The Allocation has two big numbers, a track with a square Ink thumb (a real `input type="range"` styled square), and an Ink `CutButton` "Lock in this split".
- **Scorecard:** White, 4px Ink top.
  - label "After the last day", heading "Your scorecard"
  - rows: mechanic · answer · status. "Not answered yet." is in Stone.
  - the cross episode count as a big figure, a "Share your pattern" outline button, and the privacy line in mono
- **Next in The Last Day:** the next episode's row. If it is `coming`, show it in Stone with no link.
- **Close:** NextStep.
- **States in the boards:** some mechanics are drawn answered and some not, to show both states. The live page starts with every mechanic unanswered, unless `localStorage` has answers.

### 7.8 Thank you, legal, 404

There is no `/book` page. Every Book a call, wherever it is, opens the booking window (8.1).

**`/thank-you`** (board ThankYou):

- Text from `src/content/thank-you.ts`, split into two paragraphs as in the board.
- Two link rows with `GoButton`, pointing to `/about` and `/work`. Update the hrefs in `thank-you.ts`.
- A full `Dial` on the side. `noindex`, as today.

**Legal ×4** (boards Legal):

- Light header, `BackLink`, `LegalTabs` (four real links, the current one bold with a 2px underline), H1, then the blocks.
- The footer is shown and NextStep is not.
- `LegalBlocks` keeps all seven block types (div, heading, subheading, bold, field, list, table). Only the styles change.

**404:**

- `global-not-found.tsx` (board NotFound) cannot know the locale. It stays chromeless, as decided before, and shows both languages.
  - EN headline, then the TR line in Dust.
  - Two links: "Take me to the homepage" (`/`) and "Ana sayfaya dön" (`/tr`, `lang="tr"`).
  - This fixes the known "404 is always English" limitation without guessing the language.
  - Next to the text: a `Dial` with nothing lit, only the Flare slice.
- `[locale]/not-found.tsx` (reached through `notFound()` inside the locale tree, for example an unknown case slug) knows the locale. It renders the same main block in one language, inside the normal header and footer.
- Both are `noindex`.

### 7.9 Components to delete once nothing uses them

In `sections/`: `Framework`, `ProofStrip`, `Familiar`, `Comparison`, `Approach*`, `Audience*`, `Testimonial*`, `Media*`, `Process*`, `Faq*`, `ClosingCta`, `Story`, `CaseStudies`, `CaseCard`, `Services*`, `SparkHome`, `Hero`.

Also delete:

- `subpages/ServicesDetail*`, `SubpageClosingCta`, `SubpageHero`, `ProseBlock`, `LinkGrid`, if they have no remaining use
- `app/[locale]/book/`, `app/[locale]/story/` (moved to `about/`), `components/booking/BookingCta`'s `/book` fallback href
- `effects/CanvasField*` and `effects/StickyStack`

Keep `effects/Marquee`, `ui/Reveal`, `ui/HomeScrollMemory` and everything under `booking/`, `chrome/`, `spark/` and `locked/`.

In `public/assets/`:

- Remove the old logo files once the new ones are in: `fspark9-logo/*`, `lockup-reversed.svg`, `symbol-reversed.svg`.
- Keep `bank-logos/`, which `/locked` uses.
- Keep the insha and RUUT screenshots and `portrait.jpg`.

## 8. Booking, privacy and the legal texts

### 8.1 Booking window

- **Structure:** keep `BookingProvider`, `useBooking`, `BookingOverlay` and `CalEmbed`. Restyle the overlay to the Booking boards:
  - White window, 1000px wide
  - Title bar: small `Dial`, "Book a call", "Free · 30 minutes", SVG close button
  - 2px Ink rule under the title bar
  - Footer line "Scheduling by cal.com" and the time zone
  - Full screen sheet on mobile
- **Accessibility:** `role="dialog"`, `aria-modal`, focus trap, Escape closes, focus returns to the opener, scroll lock.
- **Cal.com config:** the `CalEmbed` config gets `layout: "month_view"`, `theme: "light"`, brand colour `#17150F` (the one allowed hex, because it is a third party config value, not a style).

### 8.2 The legal texts

Imprint and Terms stay word for word. Privacy and Cookies are updated with the new site, as written in `fspark9-legal-update-v2.md`:

- The booking tool now loads when the visitor clicks Book a call, instead of behind a placeholder.
- Vercel Web Analytics and Speed Insights are described. They are already installed today, but the current text says "No analytics".
- The Last updated date becomes the launch date.

The texts change in `src/content/legal/*.ts` and in the `legalPage` documents together, and the drift check covers them.

The build must keep every remaining promise in those texts true:

- self hosted fonts
- Cal.com only after a click
- no advertising or social media scripts
- no analytics cookies (section 9)

Also check which language cookie the site really sets (`NEXT_LOCALE` from next-intl, while the table says `lang`), and write the real name into the Cookies table.

## 9. Analytics and measurement

- **No Google Analytics.** None exists today and none is added. There is no cookie banner either.
- **Vercel Web Analytics and Speed Insights** (cookieless) stay in all three root layouts, exactly as today. The Privacy text now describes them (8.2).
- **Search Console:**
  - The verification tag stays in the locale layout's `generateMetadata`.
  - Move the token into `src/lib/site.ts` as a constant. The rendered meta tag must stay identical, or the property loses verification.
- **Custom events:** none. The project is on the Vercel Hobby plan, which does not support them. Page views are counted automatically.

## 10. Motion

Use the existing reveal system for section entry, and CSS for everything else. There are two small hooks (in-view already exists in `useReveal`, and a count up). There is no library.

- **Reveal:** change it to `translateY(16px)`, `.4s`, easing `cubic-bezier(0.2,0.7,0.2,1)`.
- **Header:** background and colour transition over 240ms at 80px of scroll. Use a passive listener throttled with rAF, or an IntersectionObserver sentinel at the top.
- **Menus:** the Services menu fades and moves 4px, 160ms. The mobile sheet slides from the right, 240ms. The booking overlay takes 160ms, the window rises 12px in 220ms, and the mobile sheet slides up in 260ms.
- **Hover:**
  - Row background moves from Paper to White.
  - `GoButton` arrow moves 4px right.
  - Link underline grows from the left.
  - All 160ms.
  - The `FormatBlock` number rises 6px in 240ms.
- **Hero ring, on load:** the eight outlines draw one after another with `stroke-dashoffset` (60ms stagger, 480ms each). Then the Flare slice scales from 0.92 to 1 over 240ms. The portrait fades in with the first slice.
- **CutWord:** a clip-path wipe from the left, 500ms, starting 200ms after the headline.
- **Dials in view:** `StepTiles` fill their slices with an 80ms stagger. The result `Dial` fills with a 40ms stagger, slice 9 last.
- **MarkerFigures in view:** the block wipes in over 600ms, then the numbers count up over 900ms. `+`, `%` and "months" stay fixed.
- **Ticker:** `Marquee`, 40 seconds per loop, pauses on hover and focus.
- **`prefers-reduced-motion: reduce`:** every item above becomes instant, the ticker is a static line, and figures show their final values. `Marquee` and the reveal CSS already handle their part.

## 11. SEO and indexing

The aim is for every page to be indexed properly on launch day, in both languages.

- **Titles and descriptions:** every page's EN and TR title and description are in the site copy file, section 6c. Use them as written.
  - Update `DEFAULT_TITLE` and `DEFAULT_DESCRIPTION` in `metadata.ts` to the home page pair.
  - Thank you and both 404s are `noindex`.
- **Canonical and hreflang:** keep `toMetadata()`: canonical per locale, `en`, `tr` and `x-default` alternates, all on `https://fspark9.com`, with no trailing slash differences.
- **Structured data** (JSON-LD, built from the same data, nothing typed twice):
  - every page: `Organization` (exists) and `BreadcrumbList`
  - About: `Person`
  - service pages: `Service`
  - case pages and episode pages: `Article`

  The site copy file, section 6c, lists the fields. Validate each template with Google's Rich Results Test on the staging URL.
- **Sitemap:**
  - Add `/services/[slug]` ×4, `/services`, `/about` and the format pages.
  - Remove `/story` and `/book`.
  - Filter out `coming` episodes. Keep `/thank-you` out.
  - Add `lastModified` from each document's `_updatedAt`, or `lastCheckedAt` for episodes.
- **Redirects:** 301 from `/story` and `/tr/story` to `/about` and `/tr/about`, and from `/book` and `/tr/book` to `/?book=1` and `/tr?book=1`. Keep the `/legal` redirects.
- **OG image:** redraw `src/app/og/render.tsx` in the new brand (Ink ground, Paper wordmark from the logo files, one Flare slice, the home title line), then run `npm run upload-og-image` on launch day.
- **Icons:** replace `src/app/icon.svg` and `favicon.ico` with files from the logo zip and add an `apple-icon.png`. The JSON-LD logo fallback path points to a file that exists.
- **Robots:** `robots.ts` is unchanged (allow all, disallow `/studio`, sitemap link). Preview URLs stay noindex through Vercel's header.
- **Performance:** the hero portrait is the LCP element. Use `next/image` with `priority` and the right `sizes`. Fonts use `display: swap` with preload. Target LCP under 2.5s on mobile.
- **After launch in Search Console:**
  - submit `https://fspark9.com/sitemap.xml`
  - use URL Inspection to request indexing of the home page, the four service pages, `/work`, `/about` and `/spark`, in EN and TR
  - check the Pages report after a week for "Duplicate without user selected canonical" or "Alternate page with proper canonical" issues, and fix them

## 12. Accessibility

- **Semantics:**
  - One `<h1>` per page, and headings in order.
  - Real `<a>` and `<button>` elements. Rows that navigate are one `<a>`.
- **Focus:** a visible ring on every control, 2px `ink` with a 2px offset (`paper` on Ink). Never remove it.
- **Size and contrast:**
  - 44px minimum target.
  - Text at 4.5:1 or better. Dust only on Ink, and only for small labels.
- **Language:** the TR text on the 404 page carries `lang="tr"`, and `<html lang>` follows the locale.
- **Reduced motion:** as in section 10.

## 13. Order of work

Follow `CLAUDE.md`: one section per request, passes A, B and C, and a commit after each.

1. **Groundwork:**
   - tokens, fonts, icon set, `Dial`, `RingOutline`, `Logo`, `CutButton`, `GoButton`, `BackLink`, `Label`
   - header, footer, mobile nav, `MobileBookingBar`
   - Proves nothing on `/locked` changed.
2. **Content files:** the new `src/content` files and `types/content.ts` interfaces, filled from the site copy file.
3. **Home,** section by section.
4. **Service pages and the `/services` index.**
5. **Work and cases.**
6. **About.**
7. **Spark, then format pages, then the episode page** (boards Episode and EpisodeM).
8. **`/thank-you`, legal (with the 8.2 text update), both 404s, the `/book` and `/story` redirects.**
9. **Booking overlay restyle.**
10. **SEO pass:** OG image, icons, sitemap, metadata defaults.
11. **The Sanity pass** (6.3): additive schema, one seed, wiring, drift check.
12. **Launch** (see Staging first).
13. **Cleanup after launch** (6.4).
14. **Update `CLAUDE.md` and `FSPARK9-DURUM.md`** with the new tokens, fonts, components, decisions and checks. Replace the navy and bronze notes.

## 14. Checks before any pass is called done

On the Vercel preview URL, never localhost only:

- **Viewports:** every page on EN (root) and `/tr` at 375, 768 and 1440, with no horizontal scroll, no overlap and no clipping. Every absolute and fixed element is checked separately.
- **Build:** `npm run build` and `npm run lint` are clean. `npm run build && npm run start` for any section with images.
- **Design:** a Playwright computed style comparison against `_design/v2/boards`.
- **Booking:**
  - every Book a call opens the window
  - Escape closes it and focus returns to the opener
  - a test booking lands on `/thank-you`
  - no page loads anything from cal.com before the click (check the network tab)
  - `/book`, `/tr/book` and any URL with `?book=1` open the window
- **Language switch:** it works on the service pages, the format pages and the episode page.
- **Dials:** slice 9 is Flare on every one, and no other Flare appears twice in one view.
- **Scores:** Lighthouse Accessibility 95 or higher on every template, and Performance 90 or higher on mobile Home.
- **No dashes in visible copy.** This must return nothing:
  `grep -rnP '—|–| - ' src/content src/components src/app --include=*.ts --include=*.tsx | grep -v '^\S*:\s*//' | grep -v 'className'`
  Run the same check on a Sanity export.
- **Glyphs:** no Unicode arrows in `src/content` or `src/components`. `grep -rnP '[\x{2190}-\x{21FF}\x{00D7}]'` returns nothing.
- **Drift:** `npm run check:drift` exits 0.
- **Legal:** the rendered text of the four legal pages, in both languages, is identical to production before the rebuild (diff the extracted text).
- **Third parties:** apart from Vercel's own scripts, nothing loads from another host before a click. The only allowed host after a click is Cal.com.
- **SEO:** every page has its title and description from section 6c. Canonical and hreflang are correct. JSON-LD passes the Rich Results Test. The sitemap lists the new URLs.
- **404s:** `/does-not-exist`, `/tr/does-not-exist` and `/work/unknown` all render the right 404, with Vercel Analytics present.
- **Locked:** `/locked/fuzul` looks and behaves exactly as before.
- **Old names:** `grep -rniE "story|subpageCta|closingCta|/book" src` returns nothing outside `/locked` and the redirects in `next.config.ts`.
- **Sanity (after cleanup):** the dataset holds only document types that exist in the new schema, and no unreferenced image assets.
- **Redirects:** `/story`, `/tr/story`, `/book` and `/tr/book` return 301 to the right place.

## 15. Open items for Mehmet

1. The launch date. It becomes Bó's `publishedAt`, the Last updated date on Privacy and Cookies, and the Evidence taken date.
