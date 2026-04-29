import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Helvetica Neue"',
          "Helvetica",
          "var(--font-roboto)",
          "Arial",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#0E1320",
          soft: "#15192A",
        },
        bone: {
          DEFAULT: "#F4F1EA",
          soft: "#EDE8DD",
        },
        accent: {
          DEFAULT: "#E8FF5C",
        },
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter2: "-0.025em",
      },
      fontSize: {
        "display-xl": ["clamp(64px, 12vw, 200px)", { lineHeight: "0.92", letterSpacing: "-0.045em" }],
        "display-lg": ["clamp(48px, 8vw, 128px)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-md": ["clamp(36px, 5.5vw, 88px)", { lineHeight: "1.0", letterSpacing: "-0.035em" }],
      },
    },
  },
  plugins: [],
};

export default config;
