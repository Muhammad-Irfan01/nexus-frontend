import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0B1020",
          secondary: "#121826",
          card: "#171F33",
        },
        accent: {
          primary: "#7C5CFC",
          secondary: "#5EEAD4",
          highlight: "#22D3EE",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
        },
        system: {
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      borderRadius: {
        'nexus': '16px',
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;