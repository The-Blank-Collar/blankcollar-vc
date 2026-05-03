import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "blankcollar.vc",
    short_name: "blankcollar.vc",
    description:
      "Pre-seed VC for the AI era. Knowledge + agentic OS for every founder, plus up to CHF 50'000 in capital.",
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
