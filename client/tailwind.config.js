/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#16181c",
        border: "#2a2d33",
        muted: "#8b909a",
        accent: "#76b900",
        "accent-dim": "#5a8c00",
        danger: "#e5484d",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
