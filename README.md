# blankcollar.vc — One-pager

The pre-seed VC arm of blankcollar — built for the AI era.
This is the marketing site at **www.blankcollar.vc**, hosted on Vercel.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://motion.dev) for animations
- [Resend](https://resend.com) for transactional email
- [Lenis](https://lenis.darkroom.engineering/) for smooth scroll
- Helvetica Neue + Roboto Mono via `next/font`

Bilingual (English / Swiss-German) with full content parity.

## Develop

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Routes:

| URL | What |
|---|---|
| `/` | English landing page |
| `/de` | German landing page |
| `/apply` | English application form (5–7 minutes) |
| `/de/apply` | German application form |
| `/api/apply` | POST endpoint that emails applications |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Auto-generated robots |
| `/opengraph-image` · `/de/opengraph-image` | Generated 1200×630 social cards |

## Deploy

Vercel auto-deploys every push to `main`. The production domain is
**www.blankcollar.vc**.

### Environment variables

Add these in **Vercel → Project → Settings → Environment Variables**:

| Var | Required | What |
|---|---|---|
| `RESEND_API_KEY` | Yes (in production) | API key from [resend.com](https://resend.com). Without it, the form runs in mock mode and just logs submissions. |
| `APPLY_TO_EMAIL` | No | Where applications are sent. Defaults to `hey@theblankcollar.com`. |
| `APPLY_FROM_EMAIL` | No | The "from" address. Defaults to `blankcollar.vc <onboarding@resend.dev>` (Resend's shared sandbox domain). Once you verify your own domain in Resend, set this to `blankcollar.vc <apply@blankcollar.vc>`. |
| `NEXT_PUBLIC_SITE_URL` | No | Forces canonical / OG URLs to a specific origin (e.g. `https://www.blankcollar.vc`). Auto-resolves from `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL` if absent. |

## Setting up Resend (one-time, ~10 minutes)

The application form sends two emails on every submission:

1. **Internal** — application content + pitch-deck attachment to
   `hey@theblankcollar.com` (or `APPLY_TO_EMAIL`)
2. **Founder** — a localised confirmation back to the founder

Both go through Resend.

### 1. Create an account + API key

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day, 3 000/month — plenty for a VC application form)
2. Go to **API Keys** → **Create API Key** → name it `blankcollar-vc-prod` → grant **Sending access** only (least privilege)
3. Copy the key (`re_...`) and save it in Vercel as `RESEND_API_KEY`

That's enough to get the form working — emails will go out from
`onboarding@resend.dev`.

### 2. Verify your own domain (recommended)

Sending from `onboarding@resend.dev` works but looks unprofessional in
inboxes. Verify `blankcollar.vc` so you can send from
`apply@blankcollar.vc`.

1. In Resend → **Domains** → **Add Domain** → enter `blankcollar.vc`
2. Resend gives you 3 DNS records to add. They look like:
   - **MX** record on `send.blankcollar.vc` → `feedback-smtp.eu-west-1.amazonses.com`
   - **TXT** record on `send.blankcollar.vc` → SPF (`v=spf1 include:amazonses.com ~all`)
   - **TXT** record on `resend._domainkey.blankcollar.vc` → DKIM public key
3. Add all three in your DNS provider (Vercel DNS if you've moved the
   nameservers there, otherwise Squarespace)
4. Wait 5–30 minutes, then click **Verify DNS Records** in Resend
5. Once green, set `APPLY_FROM_EMAIL` in Vercel to:
   ```
   blankcollar.vc <apply@blankcollar.vc>
   ```
6. Redeploy — done. Both emails now come from the verified domain

### 3. (Optional) Set up DMARC

After domain verification, add a DMARC record to protect against
spoofing:

- **TXT** on `_dmarc.blankcollar.vc` → `v=DMARC1; p=quarantine; rua=mailto:dmarc@blankcollar.vc`

Start with `p=quarantine`, monitor for a few weeks via the rua reports,
then move to `p=reject` once you're confident.

## SEO

The site ships:

- **`<title>` / `<description>`** per route (EN + DE)
- **JSON-LD Organization schema** on `/` and `/de` with brand name,
  slogan, logo, sameAs links to `theblankcollar.com` + `blankcollar.ai`,
  and `inLanguage` on the DE block
- **`hreflang` alternates** so Google knows `/` and `/de` are language
  variants of each other
- **`/sitemap.xml`** with hreflang annotations on every URL
- **`/robots.txt`** allowing all crawlers, blocking `/api/`, pointing
  at `/sitemap.xml`
- **`noindex`** on `/apply` and `/de/apply` (transactional pages, not
  SERP targets)
- **OG / Twitter cards** generated dynamically via `@vercel/og`

After deploy, submit `/sitemap.xml` to
[Google Search Console](https://search.google.com/search-console) to
get indexed faster.

## Image strategy

The site ships **zero raster image files** by design — every visual is
either inline SVG or a dynamically-generated PNG (favicons + OG cards).
This keeps the bundle small and the social-card content always in sync
with the copy.

### When you add raster images later

Always use Next.js's `<Image>` component:

```tsx
import Image from "next/image";

<Image
  src="/portfolio/numarics-logo.png"
  alt="Numarics"
  width={120}
  height={40}
  priority={false}    // true for above-the-fold logos only
/>
```

Next will automatically:

- Serve **AVIF** to browsers that support it (~30–50% smaller than WebP)
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
- ARIA on the application progress bar
- `prefers-reduced-motion` respected — marquee + dot-pulse pause, all
  animations clamp to instant
- All decorative SVGs marked `aria-hidden`
- Form errors announced inline next to the action button

## Structure

```
src/
  app/
    layout.tsx              # root metadata + EN JSON-LD
    page.tsx                # / — English landing (LangProvider lang="en")
    apply/                  # English application
    de/
      layout.tsx            # German metadata + DE JSON-LD
      page.tsx              # /de — German landing
      apply/                # German application
    api/apply/route.ts      # POST handler — Resend integration
    opengraph-image.tsx     # 1200x630 EN social card
    de/opengraph-image.tsx  # 1200x630 DE social card
    icon.tsx                # 64x64 favicon
    apple-icon.tsx          # 180x180 iOS home icon
    sitemap.ts              # /sitemap.xml
    robots.ts               # /robots.txt
  components/
    Site.tsx                # the landing-page composition (lang-aware)
    ApplyContent.tsx        # the apply-page chrome
    apply/
      ApplicationForm.tsx   # 14-step wizard, card-driven
      CardGroup.tsx         # accessible card-radio component
      Inputs.tsx            # Field, Input, Textarea, FileDrop, RadioGroup
      types.ts              # form data types
    StackDiagram.tsx        # 02 — three-layer diagram
    InvestmentTiers.tsx     # 04 — two-tier card grid
    FounderToolkit.tsx      # 05 — eight-tool grid
    ConstellationGraphic.tsx # 06 — knowledge + agents constellation
    ProcessFlow.tsx         # 07 — five-step timeline
    ComparisonMatrix.tsx    # 08 — vs traditional table
    Portfolio.tsx           # 09 — portfolio rows
    NetworkGraphic.tsx      # 10 — co-investor rings
    LangSwitch.tsx          # EN / DE toggle
    Site sub-sections inline in Site.tsx
  lib/
    dict.ts                 # all bilingual content
    lang.tsx                # LangContext + useDict + Swiss number formatter
```
