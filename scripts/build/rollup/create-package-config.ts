import path from "node:path";
import fs from "fs-extra";
import type { RollupOptions, OutputOptions } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import { nodeExternals } from "rollup-plugin-node-externals";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import banner from "rollup-plugin-banner2";
// import alias, { Alias } from "@rollup/plugin-alias";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import esbuild from "rollup-plugin-esbuild";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
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
	transformerRemoveLineBreak,
	transformerRemoveNotationEscape,
	transformerMetaHighlight,
	transformerMetaWordHighlight,
	transformerCompactLineOptions,
} from "@shikijs/transformers";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import { transformerAddLangDataAttr } from "@rtdui/shiki-highlight";
import { ROLLUP_EXCLUDE_USE_CLIENT } from "./rollup-exclude-use-client";
// import { getPackagesList } from "../../packages/get-packages-list";

const basicShikiTransformers = [
	transformerNotationDiff(),
	transformerNotationErrorLevel(),
	transformerNotationFocus(),
	transformerNotationHighlight(),
	transformerNotationWordHighlight(),
	transformerRemoveLineBreak(),
	transformerRemoveNotationEscape(),
	transformerMetaHighlight(),
	transformerMetaWordHighlight(),
	transformerCompactLineOptions(),
	transformerColorizedBrackets(),
	transformerAddLangDataAttr(),
];

export async function createPackageConfig(
	packagePath: string,
): Promise<RollupOptions> {
	// const pkgList = getPackagesList();
	// const aliasEntries: Alias[] = pkgList.map((pkg) => ({
	//   find: new RegExp(`^${pkg.packageJson.name}`),
	//   replacement: path.resolve(pkg.path, "src"),
	// }));

	// 插件顺序是至关重要的
	const plugins = [
		// 注意: rollup-plugin-node-externals插件只会排除package.json中的依赖, 并不会处理依赖嵌套.
		// 因此如果没有在package.json中直接包含那些依赖并且也没有被rollup的external排除,则那些嵌套依赖在构建输出中创建node_modules目录并包含那些依赖.
		nodeExternals({
			devDeps: true,
			include: [/^[^.]|[^~]/], // 所有裸模块名
			exclude: [/\.css$/], //允许从依赖包中加载.css文件
			packagePath: path.join(packagePath, "./package.json"), //使用子包中的package.json文件
		}),
		nodeResolve({
			extensions: [
				".mjs",
				".js",
				".json",
				".node",
				"cjs",
				".ts",
				".tsx",
				".jsx",
			],
		}), //使用Nodejs的解析逻辑从`node_modules`定位模块
		commonjs(), //将导入的commonjs模块转化为ES模块
		esbuild({
			sourceMap: false,
			jsx: "automatic", // 自动使用React17引入的创建JSX元素的新方式
			tsconfig: path.resolve("./tsconfig.json"), //统一使用顶层的tsconfig.json配置文件
		}), //使用esbuild编译ts为ES模块
		json({ namedExports: false }), //将导入`.json`文件转化为ES模块
		// alias({ entries: aliasEntries }), //定义别名,这样在源码中可以使用包名,rollup编译时会从子包的实际路径解析依赖.
		replace({
			preventAssignment: true, //如果匹配的文本跟着=符,则不替换.
			values: { "process.env.NODE_ENV": `"production"` }, //将源码中的process.env.NODE_ENV替换为"production"
		}), //编译时替换文本.
		postcss({
			extract: true, // 在output.dir目录内,输出名为`<entry>.css`
			modules: {
				generateScopedName: "rtd_[name]_[local]_[hash:base64:6]", //自动支持css modules,并使用自定义方式生成范围名
			},
			minimize: true,
			config: {
				path: fs.existsSync(path.join(packagePath, "./postcss.config.js"))
					? path.join(packagePath, "./postcss.config.js")
					: path.resolve("./postcss.config.mjs"), // 优先使用子包中的postcss配置文件, 否则使用根目录下的postcss配置文件
				ctx: {},
			},
		}), // 无缝集成postcss
		mdx({
			remarkPlugins: [
				[remarkToc as any, { heading: "toc|table[ -]of[ -]contents|目录?" }], // 指定特定的标题文本: toc或Table of contents或目录
				remarkGfm as any,
				remarkFrontmatter,
				remarkBreaks,
				remarkMath as any,
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
				rehypeSlug as any,
				rehypeKatex,
			],
		}), // 支持导入mdx
		// 支持React v19
		banner((chunk) => {
			if (!ROLLUP_EXCLUDE_USE_CLIENT.includes(chunk.fileName)) {
				return "'use client';\n";
			}

			return undefined;
		}),
	];

	// https://cn.rollupjs.org/configuration-options/#external
	// 使用@rollup/plugin-node-resolve插件后可将所有依赖包排除捆绑
	// const external = [/node_modules/];
	const external: string[] = [];

	const baseOutput: OutputOptions = {
		externalLiveBindings: false, //不为外部依赖生成支持动态绑定的代码
		sourcemap: true,
		preserveModules: true, //保留模块作为独立输出文件, 不进行捆绑, 编译过程中产生的虚拟文件也会被保留到输出目录的_virtual目录中
	};

	const input = path.resolve(packagePath, "src/index.ts");

	return {
		input,
		output: [
			{
				...baseOutput,
				format: "es",
				entryFileNames: "[name].mjs",
				dir: path.resolve(packagePath, "esm"),
			},
			{
				...baseOutput,
				format: "cjs",
				entryFileNames: "[name].cjs",
				dir: path.resolve(packagePath, "cjs"),
			},
		],
		external,
		plugins,
	};
}
