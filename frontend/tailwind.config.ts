import type { Config } from "tailwindcss";

/**
 * Tailwind theme tokens aligned with `.cursor/rules/frontend-rule.mdc`
 * (soft organic palette: warm neutrals, terracotta, sage).
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F2",
        parchment: "#F3EBE0",
        sand: "#E8DDD0",
        terracotta: "#C17B5A",
        "terracotta-deep": "#9E6246",
        sage: "#8FAF8A",
        "sage-muted": "#A8C4A3",
        ink: "#3D3429",
        "ink-soft": "#5C5249",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.08)",
        lift: "0 8px 28px rgba(61, 52, 41, 0.12)",
      },
      borderRadius: {
        bubble: "20px",
        panel: "24px",
      },
      fontFamily: {
        display: ["var(--font-caveat)", "cursive"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "dot-pulse": {
          "0%, 80%, 100%": { opacity: "0.35", transform: "scale(0.85)" },
          "40%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.45s ease-out forwards",
        "dot-pulse": "dot-pulse 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
