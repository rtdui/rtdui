/**
 * 该文件存在的目的是为VSCode的Tailwind CSS IntelliSense
 */
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import rtdui from "@rtdui/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./docs-site/app/**/*.{tsx,ts,jsx.js}",
    "./packages/*/src/**/*.{ts,tsx}",
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
