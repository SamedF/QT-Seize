/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090909",
        card: "#141414",
        border: "#2A2A2A",
        muted: "#A0A0A0",
        accent: "#FFFFFF",
      },
      borderRadius: {
        xl: "18px",
        "2xl": "24px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(255,255,255,.05)",
      },
    },
  },
  plugins: [],
};