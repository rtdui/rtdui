import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import rtdui from "@rtdui/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,jsx,js}",
    "../packages/code-highlight/**/*.{ts,tsx,jsx,js}",
    "../packages/core/**/*.{ts,tsx,jsx,js}",
    "../packages/datatable/**/*.{ts,tsx,jsx,js}",
    "../packages/dialogs/**/*.{ts,tsx,jsx,js}",
    "../packages/editor/**/*.{ts,tsx,jsx,js}",
    "../packages/notifications/**/*.{ts,tsx,jsx,js}",
    "../packages/qr-code/**/*.{ts,tsx,jsx,js}",
    "./node_modules/@rtdui/code-highlight/**/*.{ts,tsx,jsx,js,mjs,cjs}",
    "./node_modules/@rtdui/core/**/*.{ts,tsx,jsx,js,mjs,cjs}",
    "./node_modules/@rtdui/datatable/**/*.{ts,tsx,jsx,js,mjs,cjs}",
    "./node_modules/@rtdui/dialogs/**/*.{ts,tsx,jsx,js,mjs,cjs}",
    "./node_modules/@rtdui/editor/**/*.{ts,tsx,jsx,js,mjs,cjs}",
    "./node_modules/@rtdui/notifications/**/*.{ts,tsx,jsx,js,mjs,cjs}",
    "./node_modules/@rtdui/qr-code/**/*.{ts,tsx,jsx,js,mjs,cjs}",
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
