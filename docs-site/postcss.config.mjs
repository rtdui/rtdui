export default {
  plugins: {
    "postcss-import": {}, // 扩展@import指令, 可以按Nodejs的模块解析逻辑查找并导入css文件.
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
