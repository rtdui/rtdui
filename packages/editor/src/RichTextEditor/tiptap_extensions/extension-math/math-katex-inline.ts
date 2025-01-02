import { Extension } from "@tiptap/core";
import { KatexInlinePlugin } from "./math-katex-inline-plugin";

export interface MathKatexOptions {
	katexOptions: Record<string, any>;
}

/** 将文档中所有段落中的$...$转换为katex */
export const MathKatexInline = Extension.create<MathKatexOptions>({
	name: "mathKatex", // Node type
	// 扩展配置
	addOptions() {
		return {
			katexOptions: {},
		};
	},

	// ProseMirror插件
	addProseMirrorPlugins() {
		return [
			...(this.parent?.() || []),
			KatexInlinePlugin({
				editor: this.editor,
				name: this.name,
				katexOptions: this.options.katexOptions,
			}),
		];
	},
});
