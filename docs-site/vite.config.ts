import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypePrismPlus from "rehype-prism-plus";
import path from "node:path";
import fs from "fs-extra";

const routes = fs.readdirSync(path.resolve("app/src/demos")).map((d) => ({
  route: d,
  file: `src/demos/${d}/doc.mdx`,
}));

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkFrontmatter, // 只是让mdx识别markdown中的frontmatter
        remarkMdxFrontmatter, // 必须依赖remarkFrontmatter, 将frontmatter metadata转换到mdx模块的export
        remarkGfm,
        remarkToc, // 指定特定的标题文本: toc或Table of contents或contents
        remarkBreaks,
        remarkMath,
      ],
      rehypePlugins: [
        rehypeSlug, // 为Headings生成id特性
        [rehypePrismPlus, { ignoreMissing: true }], // 注意需要手动生成PrismPlus的css样式并导入
        [rehypeKatex, { output: "html" }], // 只输出html,默认为"htmlAndMathml", 注意需要导入katex的css样式
      ],
    }),
    remix({
      ssr: false,
      routes(defineRoutes) {
        return defineRoutes((route) => {
          routes.forEach((d) => {
            route(
              "/components/*",
              "routes/_layout.tsx",
              { id: d.route },
              () => {
                route(`${d.route}`, d.file);
              }
            );
          });
        });
      },
    }),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
  ],
  ssr: {
    noExternal: [/^qrcode.react/, /^@rtdui\/qr-code/],
  },
});

// export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
//   return {
//     plugins: [
//       mdx({
//         remarkPlugins: [
//           remarkFrontmatter, // 只是让mdx识别markdown中的frontmatter
//           remarkMdxFrontmatter, // 必须依赖remarkFrontmatter, 将frontmatter metadata转换到mdx模块的export
//           remarkGfm,
//           remarkToc, // 指定特定的标题文本: toc或Table of contents或contents
//           remarkBreaks,
//           remarkMath,
//         ],
//         rehypePlugins: [
//           rehypeSlug, // 为Headings生成id特性
//           [rehypePrismPlus, { ignoreMissing: true }], // 注意需要手动生成PrismPlus的css样式并导入
//           [rehypeKatex, { output: "html" }], // 只输出html,默认为"htmlAndMathml", 注意需要导入katex的css样式
//         ],
//       }),
//       remix({
//         ssr: false,
//         routes(defineRoutes) {
//           return defineRoutes((route) => {
//             routes.forEach((d) => {
//               route(
//                 "/components/*",
//                 "routes/_layout.tsx",
//                 { id: d.route },
//                 () => {
//                   route(`${d.route}`, d.file);
//                 }
//               );
//             });
//           });
//         },
//       }),
//       command === "serve"
//         ? tsconfigPaths({ projects: ["./tsconfig.json"] })
//         : undefined,
//     ],
//     ssr: {
//       noExternal: [/^qrcode.react/, /^@rtdui\/qr-code/],
//     },
//   };
// });
