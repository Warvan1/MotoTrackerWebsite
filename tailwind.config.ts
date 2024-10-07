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
        background: "#000000",
        primary: "#415F91",
        primaryNight: "#AAC7FF",
        secondary: "#565F71",
        secondaryNight: "#BEC6DC"
      },
    },
  },
  plugins: [],
};
export default config;
