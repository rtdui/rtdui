import { CodeBlock, type CodeBlockOptions } from "@tiptap/extension-code-block";
import { ProseMirrorShikiPlugin } from "./prosemirror-shiki-plugin.js";
import type { BundledLanguage, BundledTheme } from "shiki";

export interface CodeBlockShikiOptions extends CodeBlockOptions {
	defaultLanguage: BundledLanguage | null | undefined;
	defaultTheme: BundledTheme;
}
/**
 * 这个扩展完全按'@tiptap'官方的@tiptap/extension-code-block-lowlight扩展修改.
 */
export const CodeBlockShiki = CodeBlock.extend<CodeBlockShikiOptions>({
	addOptions() {
		return {
			...this.parent?.(),
			defaultLanguage: null,
			defaultTheme: "one-dark-pro",
			HTMLAttributes: {
				class: "shiki",
				style: "background-color:#282c34;color:#abb2bf;",
			},
		};
	},
	addAttributes() {
		return {
			language: {
				default: this.options.defaultLanguage,
				parseHTML: (element) => {
					const { languageClassPrefix } = this.options;
					const classNames = [
						...((element.firstElementChild?.classList as unknown as string[]) ||
							[]),
					];
					const languages = classNames
						.filter((className) => className.startsWith(languageClassPrefix))
						.map((className) => className.replace(languageClassPrefix, ""));
					const language = languages[0];
					// const language = element.dataset.language;
					return language ?? this.options.defaultLanguage;
				},
				renderHTML: (attributes) => {
					return {
						"data-language": attributes.language,
					};
				},
			},
		};
	},

	addProseMirrorPlugins() {
		return [
			...(this.parent?.() || []),
			ProseMirrorShikiPlugin({
				name: this.name,
				defaultLanguage: this.options.defaultLanguage,
				defaultTheme: this.options.defaultTheme,
			}),
		];
	},
});
