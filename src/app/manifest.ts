import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "blankcollar.ventures",
    short_name: "blankcollar.ventures",
    description:
      "A free guide to the Blank Collar Framework for people starting a company. It isn't a fund and nothing is for sale.",
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
