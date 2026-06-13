import type { NextConfig } from "next";

const ONE_YEAR = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Tree-shake framer-motion's barrel so importing `m`/hooks doesn't pull in
  // the full `motion` component graph.
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },

  // Permanent redirect for the legacy domain. The site moved from
  // blankcollar.vc → blankcollar.ventures (2026-06). As long as the old domain
  // stays attached to this Vercel project, any request to (www.)blankcollar.vc
  // is 308'd to the matching path on the new canonical host, preserving SEO
  // equity. If a platform-level redirect is also set in the Vercel dashboard,
  // this is a harmless belt-and-suspenders.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?blankcollar\\.vc" }],
        destination: "https://www.blankcollar.ventures/:path*",
        permanent: true,
      },
    ];
  },

  images: {
    // Modern formats first — AVIF (~30-50% smaller than WebP), WebP fallback,
    // browsers that support neither get the original.
    formats: ["image/avif", "image/webp"],
    // Keep optimized image cache around for a year. Re-deploys invalidate via
    // build hash, so this is safe.
    minimumCacheTTL: ONE_YEAR,
    // Default deviceSizes are fine for marketing — leaving Next's defaults.
    // SVGs from external sources are dangerous (XSS via <script>) — keep off.
    dangerouslyAllowSVG: false,
    // Lock image domains to a strict allowlist. Add to remotePatterns when
    // pulling images from a CDN / CMS later.
    remotePatterns: [],
  },

  // Cache headers for our generated assets. Vercel + browser will respect
  // these. The `?<hash>` cache-busting on og/icon URLs makes long max-ages safe.
  async headers() {
    return [
      {
        source: "/:path(opengraph-image|twitter-image|icon|apple-icon)",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${ONE_YEAR}, immutable`,
          },
        ],
      },
      {
        source: "/de/:path(opengraph-image|twitter-image)",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${ONE_YEAR}, immutable`,
          },
        ],
      },
      {
        // Static assets shipped by Next — already cached, just being explicit.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${ONE_YEAR}, immutable`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
