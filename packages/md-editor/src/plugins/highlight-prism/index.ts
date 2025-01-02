import rehypePrism from "rehype-prism-plus";
import { rehypeCodeBlockDataLanguage } from "./rehype-code-block-data-language";
import type { Plugin } from "../../types";

export type Options = {
	/**
	 * Set `showLineNumbers` to `true` to always display line number
	 */
	showLineNumbers?: boolean;
	/**
	 * Set `ignoreMissing` to `true` to ignore unsupported languages and line highlighting when no language is specified
	 */
	ignoreMissing?: boolean;
	/**
	 * Uses the specified language as the default if none is specified. Takes precedence over `ignoreMissing`.
	 * Note: The language must be registered with refractor.
	 */
	defaultLanguage?: string;
};

export default function highlight(
	options: Options = { defaultLanguage: "txt", ignoreMissing: true },
): Plugin {
	return {
		rehype: (processor) =>
			processor
				// 为代码块的pre元素添加data-language特性, 便于CSS中获取语言值.
				.use(rehypeCodeBlockDataLanguage, {
					defaultLanguage: options.defaultLanguage,
				})
				.use<any, any>(rehypePrism, options),
	};
}
