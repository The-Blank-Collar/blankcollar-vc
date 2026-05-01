import type { MetadataRoute } from "next";

const siteUrl = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
})();

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${siteUrl}/`,
          de: `${siteUrl}/de`,
        },
      },
    },
    {
      url: `${siteUrl}/de`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteUrl}/`,
          de: `${siteUrl}/de`,
        },
      },
    },
    {
      url: `${siteUrl}/apply`,
      lastModified,
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
      lastModified,
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
