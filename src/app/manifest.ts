import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "blankcollar.ventures",
    short_name: "blankcollar.ventures",
    description:
      "We make founders fundable for the AI era — knowledge, AI operations, upskilling, and warm intros to the VCs we work with.",
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
