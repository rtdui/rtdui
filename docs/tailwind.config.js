import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import rtdui from "@rtdui/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,jsx,js}",
    "../packages/**/*.{ts,tsx}",
    "./node_modules/@rtdui/**/*.mjs",
  ],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui, rtdui],
  /** daisyUI config (optional) */
  daisyui: {
    themes: true,
    logs: false, //禁用日志
  },
};
