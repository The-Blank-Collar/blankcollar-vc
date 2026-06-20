import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "blankcollar.ventures",
    short_name: "blankcollar.ventures",
    description:
      "We back AI startups and help them win: the Blank Collar framework, operator experience, AI operations, and upskilling. For founders and VCs.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E1320",
    theme_color: "#0E1320",
    orientation: "portrait",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
