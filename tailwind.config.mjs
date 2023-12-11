/**
 * 该配置文件用于VSCode的Tailwind CSS IntelliSense扩展使用
 * 如果子目录下存在tailwind.config.{cjs,mjs.js}, 则Tailwind CSS IntelliSense扩展会优先使用子目录的配置文件. 否则使用该配置文件.
 */
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [".packages/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
};
