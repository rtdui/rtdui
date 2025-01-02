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

	findChildren(doc, (node) => node.type.name === name).forEach((block) => {
		const from = block.pos + 1;
		const to = from + block.node.textContent.length;
		const mathText = block.node.textContent;
		// 块级数学公式
		if (
			selection.$anchor.pos < from ||
			selection.$anchor.pos > to ||
			!editor.isEditable
		) {
			const mathRender = document.createElement("div");
			mathRender.classList.add("tiptap-math-render");
			// mathRender.onclick = (ev) => {
			//   const elem = ev.currentTarget as HTMLElement;
			//   elem.classList.toggle("hidden");
			//   elem.nextElementSibling?.classList.toggle("hidden");
			// };
			katex.render(mathText, mathRender, {
				displayMode: true,
				output: "html",
			});
			const decoration = Decoration.widget(from, mathRender);
			decorations.push(decoration);

			const decoration2 = Decoration.inline(from, to, {
				nodeName: "pre",
				class: "titap-math-source hidden",
			});
			decorations.push(decoration2);
		} else if (editor.isEditable) {
			const decoration2 = Decoration.inline(from, to, {
				nodeName: "pre",
				class: "titap-math-source",
			});
			decorations.push(decoration2);
		}
	});

	return DecorationSet.create(doc, decorations);
}

export function KatexBlockPlugin({
	editor,
	name,
	katexOptions,
}: {
	editor: Editor;
	name: string;
	katexOptions: Record<string, any>;
}) {
	const katexBlockPlugin: Plugin<any> = new Plugin({
		key: new PluginKey("mathKatexBlock"),

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
				return katexBlockPlugin.getState(state);
			},
		},
	});

	return katexBlockPlugin;
}
