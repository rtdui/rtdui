export default {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {}, // 如果不指定, 只要项目根目录存在`tailwind.config.{js,cjs,mjs}`文件, Remix也会自动将其包含.
    autoprefixer: {},
  },
};
