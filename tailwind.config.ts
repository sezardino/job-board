import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/libs/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: { thumbnail: "42 / 9" },
      container: {
        padding: "16px",
        center: true,
      },
      gridTemplateColumns: {
        "main-cards": "repeat(auto-fit, minmax(120px, 1fr))",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
