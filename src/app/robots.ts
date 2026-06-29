import type { MetadataRoute } from "next";

// Canonical host for the entity-merge rollout. Hardcoded to www so the robots
// sitemap directive is stable regardless of the deploy URL. (No `host:`
// directive: only Yandex honors it; Google and Bing ignore it.)
const BASE = "https://www.blankcollar.ventures";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "Bingbot",
          "DuckDuckBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
