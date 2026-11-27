# blankcollar.ventures

The startup guide of the blankcollar family: a free, educational one-pager that
shows people starting a company how to use the Blank Collar Framework.
It is not a fund and not a paid service. There is no application form, no
signup and nothing for sale. Every call to action leads to the free material
on the sister sites (theblankcollar.com, blankcollar.ai, blankcollar.university).

Live at **www.blankcollar.ventures**, hosted on Vercel.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://motion.dev) for animations
- [Lenis](https://lenis.darkroom.engineering/) for smooth scroll
- Roboto + Roboto Mono via `next/font`

Bilingual (English / Swiss German) with full content parity. No backend, no
form handler and no environment variables are needed.

## Develop

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Routes:

| URL | What |
|---|---|
| `/` | English guide |
| `/de` | German guide |
| `/apply`, `/de/apply` | Removed 2026-11-27. Permanent redirect to `/` and `/de` |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Auto-generated robots |
| `/llms.txt` | Plain-text summary for AI crawlers |

## Copy rules

All page text lives in `src/lib/dict.ts` (EN and DE). The header comment in
that file states the positioning. Do not reintroduce fund, application,
portfolio or investor-introduction language, and state only facts that can be
checked on the sister sites.

## SEO

The site ships:

- **`<title>` / `<description>`** per route (EN + DE)
- **JSON-LD Organization schema** on `/` and `/de` with brand name,
  slogan, logo, sameAs links to `theblankcollar.com` + `blankcollar.ai`,
  and `inLanguage` on the DE block
- **`hreflang` alternates** so Google knows `/` and `/de` are language
  variants of each other
- **`/sitemap.xml`** with hreflang annotations on every URL
- **`/robots.txt`** allowing all crawlers and pointing at `/sitemap.xml`
- **OG / Twitter cards** as static PNGs (`src/app/opengraph-image.png`,
  `src/app/de/opengraph-image.png`)

After deploy, submit `/sitemap.xml` to
[Google Search Console](https://search.google.com/search-console) to
get indexed faster.

## Image strategy

Apart from the two social cards, the site ships no raster image files: every visual is
either inline SVG or a dynamically-generated PNG (favicons + OG cards).
This keeps the bundle small and the social-card content always in sync
with the copy.

### When you add raster images later

Always use Next.js's `<Image>` component:

```tsx
import Image from "next/image";

<Image
  src="/images/example.png"
  alt="Example"
  width={120}
  height={40}
  priority={false}    // true for above-the-fold logos only
/>
```

Next will automatically:

- Serve **AVIF** to browsers that support it (~30 to 50% smaller than WebP)
- Fall back to **WebP**, then the original format
- Generate responsive `srcset` based on `deviceSizes` in `next.config.ts`
- Cache optimised variants for 1 year (`minimumCacheTTL`)

### When pulling from external sources

Add the host to `next.config.ts → images.remotePatterns` first:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "cdn.example.com", pathname: "/**" },
  ],
}
```

### Generated assets are pre-cached

`/icon`, `/apple-icon`, `/opengraph-image`, `/twitter-image`, `/de/opengraph-image`,
`/de/twitter-image` are all built statically (verified in `next build` output)
and served with `Cache-Control: public, max-age=31536000, immutable`. The cache-
busting hash on the URL means content changes still propagate correctly.

## Accessibility

- Keyboard skip-to-content link
- Visible focus rings on all interactive elements (`focus-visible`)
- Semantic landmarks (`<main>`, `<header>`, `<footer>`, `<nav>`)
- `prefers-reduced-motion` respected: marquee + dot-pulse pause, all
  animations clamp to instant
- All decorative SVGs marked `aria-hidden`

## Structure

```
src/
  app/
    layout.tsx              # root metadata + JSON-LD
    page.tsx                # / (English, LangProvider lang="en")
    de/
      layout.tsx            # German metadata
      page.tsx              # /de (German)
    opengraph-image.png     # 1200x630 EN social card
    de/opengraph-image.png  # 1200x630 DE social card
    icon.tsx                # 64x64 favicon
    apple-icon.tsx          # 180x180 iOS home icon
    sitemap.ts              # /sitemap.xml
    robots.ts               # /robots.txt
  components/
    Site.tsx                # the page composition (lang-aware)
    StackDiagram.tsx        # the four layers
    FoundersSection.tsx     # who wrote it
    InvestmentTiers.tsx     # "who it's for" cards (name is historical)
    FounderToolkit.tsx      # eight mental models
    ConstellationGraphic.tsx # knowledge + agents picture
    ProcessFlow.tsx         # five steps
    ComparisonMatrix.tsx    # vs the alternatives
    LangSwitch.tsx          # EN / DE toggle
  lib/
    dict.ts                 # all bilingual content
    lang.tsx                # LangContext + useDict + Swiss number formatter
    siteSchema.ts           # JSON-LD graph (identity anchors shared with the sister sites)
```
