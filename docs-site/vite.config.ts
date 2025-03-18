import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { reactRouter } from "@react-router/dev/vite";
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
import rehypeShiki from "@shikijs/rehype";
import {
	transformerNotationDiff,
	transformerNotationErrorLevel,
	transformerNotationFocus,
	transformerNotationHighlight,
	transformerNotationWordHighlight,
	// transformerRemoveLineBreak,
	transformerRemoveNotationEscape,
	transformerMetaHighlight,
	transformerMetaWordHighlight,
	transformerCompactLineOptions,
} from "@shikijs/transformers";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import type { ShikiTransformer } from "@shikijs/types";

function transformerAddLangDataAttr(): ShikiTransformer {
	return {
		name: "@rtdui/shiki/transformers:add-lang-class",
		pre(hast) {
			hast.properties["data-language"] = this.options.lang;
		},
	};
}

const basicShikiTransformers = [
	transformerNotationDiff(),
	transformerNotationErrorLevel(),
	transformerNotationFocus(),
	transformerNotationHighlight(),
	transformerNotationWordHighlight(),
	// transformerRemoveLineBreak(),
	transformerRemoveNotationEscape(),
	transformerMetaHighlight(),
	transformerMetaWordHighlight(),
	transformerCompactLineOptions(),
	transformerColorizedBrackets(),
	transformerAddLangDataAttr(),
];

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
				[
					rehypeShiki,
					{
						// themes: {
						// 	light: "one-light",
						// 	dark: "one-dark-pro",
						// },
						theme: "one-dark-pro",
						transformers: basicShikiTransformers,
					},
				],
				rehypeSlug, // 为Headings生成id特性
				[rehypeKatex, { output: "html" }], // 只输出html,默认为"htmlAndMathml", 注意需要导入katex的css样式
			],
		}),
		tailwindcss(),
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
