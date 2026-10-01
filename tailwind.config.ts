import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B0C",
          soft: "#151517",
        },
        graphite: "#1D1D20",
        surface: {
          DEFAULT: "#FBF9F4",
          dim: "#F2EEE3",
        },
        gold: {
          DEFAULT: "#C9A24B",
          bright: "#E4C777",
          dim: "#8C7233",
        },
        mist: "#7A7A7E",
        line: {
          dark: "#2A2A2D",
          light: "#E4DFD1",
        },
      },
      fontFamily: {
        display: [
          "Arial Narrow",
          "Helvetica Neue Condensed",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        wideish: "0.08em",
        platey: "0.15em",
      },
      maxWidth: {
        content: "1400px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
