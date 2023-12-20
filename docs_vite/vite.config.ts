import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkBreaks from "remark-breaks";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [
          [remarkToc as any, { heading: "toc|table[ -]of[ -]contents|目录?" }], // 指定特定的标题文本: toc或Table of contents或目录
          remarkGfm as any,
          remarkFrontmatter,
          remarkBreaks,
          remarkMath as any,
        ],
        rehypePlugins: [rehypeSlug as any, rehypePrism, rehypeKatex],
      }),
    },
    react() as any,
  ],
  server: {
    host: "0.0.0.0",
    open: true,
  },
  ssr: {
    noExternal: [/^qrcode.react/, /^@rtdui\/qr-code/],
  },
});
