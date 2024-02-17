import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        gray: "#0A101A",
        gray20: "rgba(10, 16, 26, 0.2)",
        gray24: "rgba(10, 16, 26, 0.24)",
        gray60: "rgba(10, 16, 26, 0.6)",
        gray80: "rgba(10, 16, 26, 0.8)",
        grayThin: "#D8D9DA",
        squareGray: "#F7F7F7",
        orange: "#F59E0B",
        green: "#55C079",
        greenThin: "#E6F7F0",
        red: "#C0555B",
        redThin: "#F8E6E8",
        yellow: "#E0FF00",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config
