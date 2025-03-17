import type { ShikiTransformer } from "@shikijs/types";

/** show line numbers for lines. */
export function transformerLineNumber(): ShikiTransformer {
	return {
		name: "@rtdui/shiki/transformers:line-number",
		pre(hast) {
			this.addClassToHast(hast, "has-line-number");
		},
	};
}
