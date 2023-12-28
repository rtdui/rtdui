import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkBreaks from "remark-breaks";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const common = {
    plugins: [
      {
        enforce: "pre",
        ...mdx({
          remarkPlugins: [
            [
              remarkToc as any,
              { heading: "toc|table[ -]of[ -]contents|目录?" },
            ], // 指定特定的标题文本: toc或Table of contents或目录
            remarkGfm as any,
            remarkFrontmatter, // 只是让mdx识别markdown中的frontmatter
            remarkMdxFrontmatter, // 必须依赖remarkFrontmatter, 将frontmatter metadata转换到mdx模块的export
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
  };

  if (command === "serve") {
    return {
      ...common,
      resolve: {
        alias: {
          "@rtdui/code-highlight": path.resolve(
            "../packages/code-highlight/src"
          ),
          "@rtdui/core": path.resolve("../packages/core/src"),
          "@rtdui/datatable": path.resolve("../packages/datatable/src"),
          "@rtdui/dialogs": path.resolve("../packages/dialogs/src"),
          "@rtdui/editor": path.resolve("../packages/editor/src"),
          "@rtdui/hooks": path.resolve("../packages/hooks/src"),
          "@rtdui/notifications": path.resolve("../packages/notifications/src"),
          "@rtdui/qr-code": path.resolve("../packages/qr-code/src"),
          "@rtdui/spotlight": path.resolve("../packages/spotlight/src"),
        },
      },
    };
  } else {
    // command === 'build'
    return { ...common };
  }
});
