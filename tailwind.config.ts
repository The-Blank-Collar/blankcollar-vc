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
        pink: {
          DEFAULT: "#FA2BB8",
        },
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter2: "-0.025em",
      },
      fontSize: {
        "display-xl": ["clamp(44px, 7.6vw, 112px)", { lineHeight: "0.96", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(40px, 6.5vw, 96px)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(32px, 4.8vw, 72px)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
      },
    },
  },
  plugins: [],
};

export default config;
