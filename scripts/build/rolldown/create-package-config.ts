import path from "node:path";
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
import {
  defineConfig,
  type OutputOptions,
  type RolldownOptions,
} from "rolldown";
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
): Promise<RolldownOptions> {
  const baseOutputOptions: OutputOptions = {
    preserveModules: true,
    preserveModulesRoot: "src",
    externalLiveBindings: false,
    minify: false,
    sourcemap: false,
    // 支持React v19
    postBanner: (chunk) => {
      // console.log(structuredClone(chunk));

      // 模块的原始文件名
      const facadeModuleBaseName = path.basename(chunk.facadeModuleId ?? "");
      if (
        path.extname(facadeModuleBaseName) === ".tsx" &&
        !facadeModuleBaseName.startsWith("use")
      ) {
        return "'use client';";
      }

      return "";
    },
  };

  // 只输出cjs格式的包, tailwindcss的插件只支持cjs格式
  const onlyCjsPackages = ["tailwind-plugin"];

  const config: RolldownOptions = {
    input: [path.join(packagePath, "/src/index.ts")],
    // All bare module IDs (not starting with `.` or `/`, or `~` or `C:\`)
    external: /^[^./~](?!:[/\\])/,
    transform: {
      // reactCompiler: true, // 体验功能
    },
    plugins: [
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
    ],
    output: onlyCjsPackages.some((d) => path.basename(packagePath) === d)
      ? {
          ...baseOutputOptions,
          format: "cjs",
          entryFileNames: "[name].cjs",
          dir: path.join(packagePath, "cjs"),
        }
      : [
          {
            ...baseOutputOptions,
            format: "esm",
            entryFileNames: "[name].mjs",
            dir: path.join(packagePath, "esm"),
          },
          {
            ...baseOutputOptions,
            format: "cjs",
            entryFileNames: "[name].cjs",
            dir: path.join(packagePath, "cjs"),
          },
        ],
  };

  return defineConfig(config);
}
