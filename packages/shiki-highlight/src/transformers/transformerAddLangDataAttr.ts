import type { ShikiTransformer } from "@shikijs/types";

/**
 * 默认的, shiki生成的pre没有附加language-xxx类
 * 这个转换器用于给生成的pre附加language-xxx类
 */
export function transformerAddLangDataAttr(): ShikiTransformer {
	return {
		name: "@rtdui/shiki/transformers:add-lang-class",
		pre(hast) {
			hast.properties["data-language"] = this.options.lang;
		},
	};
}
