# blankcollar.vc — One-pager

A different kind of pre-seed VC: capital + operators + agentic OS.

This is the marketing site for **www.blankcollar.vc**, hosted on Vercel.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://motion.dev) for animations
- Inter + Instrument Serif via `next/font`

Built following the Build $10K Websites With One Line of Code methodology
(Claude Code + Framer Motion + design-system intelligence).

## Develop

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Deploy

Push to the connected branch and Vercel will pick it up automatically.
The production domain is **www.blankcollar.vc**.

### Environment variables (for the application form)

| Var | Required | What |
|---|---|---|
| `RESEND_API_KEY` | Yes (in production) | API key from [resend.com](https://resend.com). Without it, the form runs in mock mode and just logs submissions. |
| `APPLY_TO_EMAIL` | No | Where applications are sent. Defaults to `hey@theblankcollar.com`. |
| `APPLY_FROM_EMAIL` | No | The "from" address. Defaults to `blankcollar.vc <onboarding@resend.dev>`. Once you verify a domain in Resend, set this to e.g. `apply@blankcollar.vc`. |

Add these in **Vercel → Project → Settings → Environment Variables**.

## Structure

```
src/app/
  layout.tsx     # fonts, metadata
  page.tsx       # the one-pager (hero, thesis, offer, stack, cta, footer)
  globals.css    # Tailwind + grain + marquee + gradient mesh
```
