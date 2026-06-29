import type { MetadataRoute } from "next";

const siteUrl = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
})();

// Stable per-route lastModified dates. We deliberately avoid `new Date()`:
// a build-time "now" makes every route look freshly edited on every deploy,
// which trains crawlers to ignore the signal. Bump a route's date here only
// when that route's content actually changes.
const HOME_LAST_MODIFIED = "2026-06-29";
const APPLY_LAST_MODIFIED = "2026-06-20";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: HOME_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: siteUrl,
          de: `${siteUrl}/de`,
        },
      },
    },
    {
      url: `${siteUrl}/de`,
      lastModified: HOME_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: siteUrl,
          de: `${siteUrl}/de`,
        },
      },
    },
    {
      url: `${siteUrl}/apply`,
      lastModified: APPLY_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/apply`,
          de: `${siteUrl}/de/apply`,
        },
      },
    },
    {
      url: `${siteUrl}/de/apply`,
      lastModified: APPLY_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/apply`,
          de: `${siteUrl}/de/apply`,
        },
      },
    },
  ];
}
