// Shared JSON-LD @graph for the entity-merge SEO rollout.
//
// CRITICAL: the @id and url strings here are the cross-site identity anchors.
// They MUST be byte-identical to the same strings on every other Blank Collar
// property (theblankcollar.com, blankcollar.ai, blankcollar.university), or
// Google/Bing/AI engines will not merge the cluster into one entity. For that
// reason they are HARDCODED to the canonical www host and are NOT derived from
// the env-based `siteUrl` (which can resolve to a *.vercel.app preview host).
//
// The same @graph is rendered on both the en (`/`) and de (`/de`) layouts.

const CANONICAL_URL = "https://www.blankcollar.vc";

const PERSON_ID = "https://www.kristiankabashi.com/#person";
const ORG_ID = "https://www.theblankcollar.com/#org";
const VC_ORG_ID = "https://www.blankcollar.vc/#org";
const VC_WEBSITE_ID = "https://www.blankcollar.vc/#website";

const vcDescription =
  "Pre-seed VC for the AI era. Knowledge + agentic OS for every founder we back, plus up to CHF 50'000 in capital. Switzerland-based, global.";

// Person sameAs — Kristian (personal + shared @theblankcollar handles). §1 verbatim.
const personSameAs = [
  "https://www.linkedin.com/in/kristiankabashi/",
  "https://x.com/theblankcollar",
  "https://www.instagram.com/theblankcollar/",
  "https://www.facebook.com/theblankcollar",
  "https://www.youtube.com/@theblankcollar",
  "https://www.tiktok.com/@theblankcollar",
  "https://medium.com/@theblankcollar",
  "https://github.com/theblankcollar",
  "https://www.crunchbase.com/person/kristian-kabashi",
  "https://www.amazon.com/Blank-Collar-Equation-manifesto-future-ebook/dp/B0CGYXPPKX",
  "https://www.forbes.com/councils/forbesbusinesscouncil/2023/04/17/embracing-the-blank-collar-a-new-paradigm-for-success-in-the-future-of-work/",
];

// Org sameAs — The Blank Collar (brand handles + ventures). §1 verbatim.
const orgSameAs = [
  "https://www.linkedin.com/company/theblankcollar",
  "https://x.com/theblankcollar",
  "https://www.instagram.com/theblankcollar/",
  "https://www.facebook.com/theblankcollar",
  "https://www.youtube.com/@theblankcollar",
  "https://www.tiktok.com/@theblankcollar",
  "https://medium.com/@theblankcollar",
  "https://github.com/theblankcollar",
  "https://www.blankcollar.ai",
  "https://www.blankcollar.university",
  "https://www.blankcollar.vc",
];

/**
 * Build the JSON-LD @graph for blankcollar.vc.
 *
 * The graph is identical across languages except the WebSite node carries the
 * language hint. The bilingual site declares inLanguage ["en","de"] regardless,
 * so both layouts pass the same value — `lang` is accepted for clarity/future.
 */
export function buildSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      // Venture node — blankcollar.vc (§3)
      {
        "@type": "Organization",
        "@id": VC_ORG_ID,
        name: "blankcollar.vc",
        alternateName: ["blankcollar VC", "Blank Collar VC"],
        url: CANONICAL_URL,
        logo: `${CANONICAL_URL}/icon`,
        description: vcDescription,
        slogan: "Capital. Knowledge. Agentic OS.",
        areaServed: "Worldwide",
        foundingLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressCountry: "CH",
          },
        },
        knowsAbout: [
          "Pre-seed venture capital",
          "AI-native startups",
          "Agentic OS",
          "Founder enablement",
        ],
        parentOrganization: { "@id": ORG_ID },
        founder: { "@id": PERSON_ID },
      },
      // WebSite node (§3) — bilingual
      {
        "@type": "WebSite",
        "@id": VC_WEBSITE_ID,
        url: CANONICAL_URL,
        name: "blankcollar.vc",
        description: vcDescription,
        inLanguage: ["en", "de"],
        publisher: { "@id": VC_ORG_ID },
      },
      // TBC Org anchor (§2) — verbatim
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "The Blank Collar",
        alternateName: "TBC",
        url: "https://www.theblankcollar.com",
        slogan: "Work is for bots. Life is for humans.",
        founder: { "@id": PERSON_ID },
        sameAs: orgSameAs,
      },
      // Person anchor (§2) — verbatim
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Kristian Kabashi",
        url: "https://www.kristiankabashi.com",
        jobTitle: "Founder",
        worksFor: { "@id": ORG_ID },
        sameAs: personSameAs,
      },
    ],
  };
}

/** Pre-serialized JSON for embedding in a <script type="application/ld+json">. */
export const siteSchemaJson = JSON.stringify(buildSiteSchema());
