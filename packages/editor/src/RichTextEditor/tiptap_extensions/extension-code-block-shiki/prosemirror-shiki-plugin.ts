import type {
	BundledLanguage,
	BundledTheme,
	ThemedToken,
	TokenStyles,
} from "shiki";
import { findChildren } from "@tiptap/core";
import { Plugin, PluginKey, type PluginView } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import type { Node as ProsemirrorNode } from "@tiptap/pm/model";
import {
	getShiki,
	initHighlighter,
	loadLanguage,
	loadTheme,
} from "./shiki-highlighter";

/** shiki的单主题token样式映射 */
function tokenStyleToCssStyle(token: ThemedToken) {
	let style = "";

	if (token.color) style += `color: ${token.color};`;
	if (token.fontStyle) {
		if (token.fontStyle & 1) style += "font-style: italic;";
		if (token.fontStyle & 2) style += "font-weight: bold;";
		if (token.fontStyle & 4) style += "text-underline: underline;";
		if (token.fontStyle & 8) style += "text-underline: line-through;";
	}

	return style;
}

/** shiki的多主题变体token样式映射 */
function variantsStyleToCssStyle(variants: Record<string, TokenStyles>) {
	let style = "";
	if (variants.light) {
		if (variants.light.color) style += `color: ${variants.light.color};`;
		if (variants.light.fontStyle) {
			if (variants.light.fontStyle & 1) style += "font-style: italic;";
			if (variants.light.fontStyle & 2) style += "font-weight: bold;";
			if (variants.light.fontStyle & 4) style += "text-underline: underline;";
			if (variants.light.fontStyle & 8)
				style += "text-underline: line-through;";
		}
	}
	if (variants.dark) {
		if (variants.dark.color) style += `--shiki-dark: ${variants.dark.color};`;
		if (variants.dark.fontStyle) {
			if (variants.dark.fontStyle & 1)
				style += "--shiki-dark-font-style: italic;";
			if (variants.dark.fontStyle & 2)
				style += "--shiki-dark-font-weight: bold;";
			if (variants.dark.fontStyle & 4)
				style += "--shiki-dark-text-underline: underline;";
			if (variants.dark.fontStyle & 8)
				style += "--shiki-dark-text-underline: line-through;";
		}
	}
	return style;
}

/** Create code decorations for the current document */
function getDecorations({
	doc,
	name,
	defaultTheme,
	defaultLanguage,
}: {
	doc: ProsemirrorNode;
	name: string;
	defaultLanguage: BundledLanguage | null | undefined;
	defaultTheme: BundledTheme;
}) {
	const decorations: Decoration[] = [];

	const codeBlocks = findChildren(doc, (node) => node.type.name === name);

	codeBlocks.forEach((block) => {
		let from = block.pos + 1;
		let language = block.node.attrs.language || defaultLanguage;
		const theme = block.node.attrs.theme || defaultTheme;

		const highlighter = getShiki();

		if (!highlighter) return;

		if (!highlighter.getLoadedLanguages().includes(language)) {
			language = "plaintext";
		}

		const themeToApply = highlighter.getLoadedThemes().includes(theme)
			? theme
			: highlighter.getLoadedThemes()[0];

		// 单主题模式
		const tokens = highlighter.codeToTokensBase(block.node.textContent, {
			lang: language,
			theme: themeToApply,
		});
		// 多主题模式, 此时token的样式只存在于token.variants中, 如token.variants: {light:{color:xxx, fontStyle: yyy}}
		// const tokens = highlighter.codeToTokensWithThemes(block.node.textContent, {
		// 	lang: language,
		// 	themes: {
		// 		light: "one-light",
		// 		dark: "one-dark-pro",
		// 	},
		// });

		for (const line of tokens) {
			for (const token of line) {
				const to = from + token.content.length;
				const decoration = Decoration.inline(from, to, {
					// style: variantsStyleToCssStyle(token.variants), // 多主题模式
					style: tokenStyleToCssStyle(token), // 单主题模式
				});

				decorations.push(decoration);

				from = to;
			}

			from += 1;
		}
	});

	return DecorationSet.create(doc, decorations);
}

export function ProseMirrorShikiPlugin({
	name,
	defaultLanguage,
	defaultTheme,
}: {
	name: string;
	defaultLanguage: BundledLanguage | null | undefined;
	defaultTheme: BundledTheme;
}) {
	const shikiPlugin: Plugin<any> = new Plugin({
		key: new PluginKey("shiki"),

		view(view) {
			// This small view is just for initial async handling
			class ShikiPluginView implements PluginView {
				constructor() {
					this.initDecorations();
				}

				update() {
					this.checkUndecoratedBlocks();
				}
				destroy() {}

				// Initialize shiki async, and then highlight initial document
				async initDecorations() {
					const doc = view.state.doc;
					await initHighlighter({ doc, name, defaultLanguage, defaultTheme });
					const tr = view.state.tr.setMeta("shikiPluginForceDecoration", true);
					view.dispatch(tr);
				}

				// When new codeblocks were added and they have missing themes or
				// languages, load those and then add code decorations once again.
				async checkUndecoratedBlocks() {
					const codeBlocks = findChildren(
						view.state.doc,
						(node) => node.type.name === name,
					);

					// Load missing themes or languages when necessary.
					// loadStates is an array with booleans depending on if a theme/lang
					// got loaded.
					const loadStates = await Promise.all(
						codeBlocks.flatMap((block) => [
							loadTheme(block.node.attrs.theme),
							loadLanguage(block.node.attrs.language),
						]),
					);
					const didLoadSomething = loadStates.includes(true);

					// The asynchronous nature of this is potentially prone to
					// race conditions. Imma just hope it's fine lol

					if (didLoadSomething) {
						const tr = view.state.tr.setMeta(
							"shikiPluginForceDecoration",
							true,
						);
						view.dispatch(tr);
					}
				}
			}

			return new ShikiPluginView();
		},

		state: {
			init: (_, { doc }) => {
				return getDecorations({
					doc,
					name,
					defaultLanguage,
					defaultTheme,
				});
			},
			apply: (transaction, decorationSet, oldState, newState) => {
				const oldNodeName = oldState.selection.$head.parent.type.name;
				const newNodeName = newState.selection.$head.parent.type.name;
				const oldNodes = findChildren(
					oldState.doc,
					(node) => node.type.name === name,
				);
				const newNodes = findChildren(
					newState.doc,
					(node) => node.type.name === name,
				);

				const didChangeSomeCodeBlock =
					transaction.docChanged &&
					// Apply decorations if:
					// selection includes named node,
					([oldNodeName, newNodeName].includes(name) ||
						// OR transaction adds/removes named node,
						newNodes.length !== oldNodes.length ||
						// OR transaction has changes that completely encapsulte a node
						// (for example, a transaction that affects the entire document).
						// Such transactions can happen during collab syncing via y-prosemirror, for example.
						transaction.steps.some((step) => {
							// @ts-ignore
							return (
								// @ts-ignore
								step.from !== undefined &&
								// @ts-ignore
								step.to !== undefined &&
								oldNodes.some((node) => {
									// @ts-ignore
									return (
										// @ts-ignore
										node.pos >= step.from &&
										// @ts-ignore
										node.pos + node.node.nodeSize <= step.to
									);
								})
							);
						}));

				// only create code decoration when it's necessary to do so
				if (
					transaction.getMeta("shikiPluginForceDecoration") ||
					didChangeSomeCodeBlock
				) {
					return getDecorations({
						doc: transaction.doc,
						name,
						defaultLanguage,
						defaultTheme,
					});
				}

				return decorationSet.map(transaction.mapping, transaction.doc);
			},
		},

		props: {
			decorations(state) {
				return shikiPlugin.getState(state);
			},
		},
	});

	return shikiPlugin;
}
