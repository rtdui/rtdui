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
import {
	transformerAddLangDataAttr,
	transformerLineNumber,
} from "@rtdui/shiki-highlight";
import type { Plugin } from "../../types";

const basicShikiTransformers = [
	transformerNotationDiff(),
	transformerNotationErrorLevel(),
	transformerNotationFocus(),
	transformerNotationHighlight(),
	transformerNotationWordHighlight(),
	// transformerRemoveLineBreak(), // 移除换行符会导致mermaid库解析错误
	transformerRemoveNotationEscape(),
	transformerMetaHighlight(),
	transformerMetaWordHighlight(),
	transformerCompactLineOptions(),
	transformerColorizedBrackets(),
	transformerAddLangDataAttr(),
];

export type Options = {
	/**
	 * Set `showLineNumbers` to `true` to always display line number
	 */
	showLineNumbers?: boolean;
};

export default function highlight({
	showLineNumbers = false,
}: Options = {}): Plugin {
	return {
		rehype: (processor) =>
			processor.use<any, any>(rehypeShiki, {
				// themes: {
				// 	light: "one-light",
				// 	dark: "one-dark-pro",
				// },
				theme: "one-dark-pro",
				transformers: showLineNumbers
					? [...basicShikiTransformers, transformerLineNumber()]
					: basicShikiTransformers,
			}),
	};
}
