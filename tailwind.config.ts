import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "#ef4444": "#ef4444",
        "#fb923c": "#fb923c",
        "#a3e635": "#a3e635",
        "#2dd4bf": "#2dd4bf",
        "#c084fc": "#c084fc",
        "#f472b6": "#f472b6",
        "#3b82f6": "#3b82f6",
        "#fde047": "#fde047",
        "#22c55e": "#22c55e",
        "#22d3ee": "#22d3ee",
      },
    },
  },
  daisyui: {
    themes: ["corporate"],
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
};
export default config;
