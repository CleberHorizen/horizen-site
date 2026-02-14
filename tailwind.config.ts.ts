import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#F27A0A",
          dark: "#3A3A3A",
          light: "#F4F4F5",
          muted: "#6B7280"
        }
      }
    }
  },
  plugins: []
};

export default config;