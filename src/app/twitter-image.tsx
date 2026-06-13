import { ImageResponse } from "next/og";

export const alt = "blankcollar.ventures — Knowledge. AI. Access.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same composition as the OG card — Twitter just renders this if present.
export { default } from "./opengraph-image";
