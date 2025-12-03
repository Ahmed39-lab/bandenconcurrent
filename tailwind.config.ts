import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",          // app folder
    "./components/**/*.{ts,tsx,js,jsx}"    // components folder
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],  // Open Sans variable
      },
    },
  },
  plugins: [],
};

export default config;
