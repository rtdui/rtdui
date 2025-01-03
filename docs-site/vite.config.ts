import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import nesting from "tailwindcss/nesting";
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
import { rehypeCodeBlockDataLanguage } from "./app/src/mdx-plugin/rehype-code-block-data-language";

export default defineConfig({
	css: {
		postcss: {
			plugins: [nesting, tailwindcss, autoprefixer],
		},
	},
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
				rehypeCodeBlockDataLanguage, // 为代码块的pre元素添加data-language特性, 便于CSS中获取语言值.
				[rehypePrismPlus, { ignoreMissing: true }], // 注意需要手动生成PrismPlus的css样式并导入
				[rehypeKatex, { output: "html" }], // 只输出html,默认为"htmlAndMathml", 注意需要导入katex的css样式
			],
		}),
		reactRouter(),
		tsconfigPaths({ projects: ["./tsconfig.json"] }),
	],
	ssr: {
		noExternal: [/^qrcode.react/, /^@rtdui\/qr-code/],
	},
	server: { host: "0.0.0.0" },
	// 临时解决@tabler/icons-react v3.19 引入的dynamic import导致Vite创建大量chunk
	resolve: {
		alias: {
			// /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
			"@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
		},
	},
});

// export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
//   return {
//     preserveSymlinks: true,
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
//             route(undefined, "routes/_layout.tsx", { id: `demos` }, () => {
//               demoRoutes.forEach((d) => {
//                 route(`components/${d.route}`, d.file);
//               });
//             });
//           });
//         },
//       }),
//       tsconfigPaths({ projects: ["./tsconfig.json"] }),
//     ],
//     ssr: {
//       noExternal: [/^qrcode.react/, /^@rtdui\/qr-code/],
//     },
//     server: { host: "0.0.0.0" },
//   };
// });
