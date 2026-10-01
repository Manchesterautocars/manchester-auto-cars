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
          DEFAULT: "#0A0A0B",
          soft: "#141416",
        },
        graphite: "#1D1D20",
        surface: {
          DEFAULT: "#F7F7F5",
          dim: "#EFEFEC",
        },
        gold: {
          DEFAULT: "#E5B93F",
          bright: "#F0CB65",
          dim: "#A8801F",
        },
        mist: "#7A7A7E",
        line: {
          dark: "#2A2A2D",
          light: "#E4DFD1",
        },
      },
      fontFamily: {
        // Inter is the closest match to the mockup's typeface (identified
        // from a raster screenshot, so this is an approximation).
        display: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        plate: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
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
