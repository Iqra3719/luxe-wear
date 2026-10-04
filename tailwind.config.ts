import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF6EE",
        beige: "#E9DCC3",
        "beige-deep": "#DCC9A0",
        charcoal: "#211D19",
        ink: "#2E2820",
        gold: "#A9803F",
        "gold-soft": "#C9A668",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "luxe-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(169,128,63,0.45)" },
          "50%": { boxShadow: "0 0 0 12px rgba(169,128,63,0)" },
        },
      },
      animation: {
        "luxe-pulse": "luxe-pulse 2.2s ease-out infinite",
      },
      letterSpacing: {
        tracked: "0.08em",
      },
      borderRadius: {
        sm: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
