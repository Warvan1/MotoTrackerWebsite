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
        background: "var(--background-color)",
        text: "var(--text-color)",
        textButton: "var(--text-button-color)",
        primary: "var(--primary-color)",
        primaryContainer: "var(--primary-container-color)",
        primaryContrast: "var(--primary-contrast-color)",
        secondary: "var(--secondary-color)",
        secondaryContainer: "var(--secondary-container-color)",
        secondaryContrast: "var(--secondary-contrast-color)",
        tertiary: "var(--tertiary-color)",
        tertiaryContainer: "var(--tertiary-container-color)",
        tertiaryContrast: "var(--tertiary-contrast-color)",
        error: "var(--error-color)",
        errorContainer: "var(--error-container-color)",
        errorContrast: "var(--error-contrast-color)",
      },
    },
  },
  darkMode: ['class', '.night'],
  plugins: [],
};
export default config;
