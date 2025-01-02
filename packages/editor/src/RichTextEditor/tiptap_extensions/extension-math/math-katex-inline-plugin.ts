import { findChildren } from "@tiptap/core";
import type { Editor } from "@tiptap/core";
import katex from "katex";
import type { Node as ProsemirrorNode } from "prosemirror-model";
import type { Selection } from "prosemirror-state";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

function getDecorations({
	editor,
	doc,
	name,
	katexOptions,
	selection,
}: {
	editor: Editor;
	doc: ProsemirrorNode;
	name: string;
	katexOptions: Record<string, any>;
	selection: Selection;
}) {
	const decorations: Decoration[] = [];

	const texts: { pos: number; text?: string }[] = [];

	findChildren(doc, (node) => node.type.name === "paragraph").forEach(
		(block) => {
			const pos = block.pos + 1;
			texts.push({
				pos,
				text: block.node.textContent,
			});
		},
	);
	texts.forEach((txt) => {
		if (txt.text) {
			// 内联数学公式
			const inlineMatchs = txt.text.matchAll(/\$([^$]+)\$/g);
			for (const match of inlineMatchs) {
				if (!match[1]) {
					continue;
				}
				match[1] = match[1].replace(/\s\\\s/g, " \\\\ "); // katex需要使用`\\`换行, markdown-it转换后将`\\`转义为`\`, 此处重新转换会`\\`
				const mathStart = txt.pos + (match.index ?? 0);
				const mathEnd = txt.pos + (match.index ?? 0) + match[0].length;
				if (
					selection.$anchor.pos < mathStart ||
					selection.$anchor.pos > mathEnd ||
					!editor.isEditable
				) {
					const mathRender = document.createElement("span");
					mathRender.classList.add("tiptap-math-render");
					// mathRender.onclick = (ev) => {
					//   const elem = ev.currentTarget as HTMLElement;
					//   elem.classList.toggle("hidden");
					//   elem.nextElementSibling?.classList.toggle("hidden");
					// };
					katex.render(match[1], mathRender, { output: "html" });
					const decoration = Decoration.widget(mathStart, mathRender);
					decorations.push(decoration);
					const decoration2 = Decoration.inline(mathStart, mathEnd, {
						class: "titap-math-source hidden",
					});
					decorations.push(decoration2);
				} else if (editor.isEditable) {
					const decoration3 = Decoration.inline(mathStart, mathEnd, {
						class: "titap-math-source",
					});
					decorations.push(decoration3);
				}
			}
		}
	});

	return DecorationSet.create(doc, decorations);
}
/** 处理粘贴的数学公式 */
export function KatexInlinePlugin({
	editor,
	name,
	katexOptions,
}: {
	editor: Editor;
	name: string;
	katexOptions: Record<string, any>;
}) {
	const katexInlinePlugin: Plugin<any> = new Plugin({
		key: new PluginKey("mathKatex"),

		state: {
			init: (_, { doc, selection }) =>
				getDecorations({
					editor,
					doc,
					name,
					katexOptions,
					selection,
				}),
			apply: (transaction, decorationSet, oldState, newState) => {
				const { selection } = newState;

				return getDecorations({
					editor,
					doc: transaction.doc,
					name,
					katexOptions,
					selection,
				});
			},
		},

		props: {
			decorations(state) {
				return katexInlinePlugin.getState(state);
			},
		},
	});

	return katexInlinePlugin;
}
