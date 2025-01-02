import { Node, mergeAttributes, textblockTypeInputRule } from "@tiptap/core";
import { KatexBlockPlugin } from "./math-katex-block-plugin";

export interface MathKatexBlockOptions {
	exitOnTripleEnter: boolean;
	exitOnArrowDown: boolean;
	katexOptions: Record<string, any>;
	HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		mathKatexBlock: {
			/**
			 * Set a katex block
			 */
			setMathBlock: (attributes?: Record<string, any>) => ReturnType;
			/**
			 * Toggle a katex block
			 */
			toggleMathBlock: (attributes?: Record<string, any>) => ReturnType;
		};
	}
}

export const mathDollorBlockInputRegex = /^\$\$[\s\n]$/;

/** 处理在编辑器中的输入 */
export const MathKatexBlock = Node.create<MathKatexBlockOptions>({
	name: "mathKatexBlock", // Node type
	priority: 1000,
	// 扩展配置
	addOptions() {
		return {
			exitOnTripleEnter: true,
			exitOnArrowDown: true,
			katexOptions: {},
			HTMLAttributes: {},
		};
	},

	// Schema定义
	content: "text*",
	marks: "",
	group: "block",
	code: true,
	defining: true,

	parseHTML() {
		return [
			{
				tag: `div[data-type="${this.name}"]`,
				preserveWhitespace: "full",
			},
		];
	},

	renderHTML({ node, HTMLAttributes }) {
		return [
			"div",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
				"data-type": this.name,
			}),
			0,
		];
	},

	addCommands() {
		return {
			setMathBlock:
				(attributes) =>
				({ commands }) => {
					return commands.setNode(this.name, attributes);
				},
			toggleMathBlock:
				(attributes) =>
				({ commands }) => {
					return commands.toggleNode(this.name, "paragraph", attributes);
				},
		};
	},

	addKeyboardShortcuts() {
		return {
			"Mod-Alt-m": () => this.editor.commands.toggleMathBlock(),

			// remove code block when at start of document or code block is empty
			Backspace: () => {
				const { empty, $anchor } = this.editor.state.selection;
				const isAtStart = $anchor.pos === 1;

				if (!empty || $anchor.parent.type.name !== this.name) {
					return false;
				}

				if (isAtStart || !$anchor.parent.textContent.length) {
					return this.editor.commands.clearNodes();
				}

				return false;
			},

			// exit node on triple enter
			Enter: ({ editor }) => {
				if (!this.options.exitOnTripleEnter) {
					return false;
				}

				const { state } = editor;
				const { selection } = state;
				const { $from, empty } = selection;

				if (!empty || $from.parent.type !== this.type) {
					return false;
				}

				const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
				const endsWithDoubleNewline = $from.parent.textContent.endsWith("\n\n");

				if (!isAtEnd || !endsWithDoubleNewline) {
					return false;
				}

				return editor
					.chain()
					.command(({ tr }) => {
						tr.delete($from.pos - 2, $from.pos);

						return true;
					})
					.exitCode()
					.run();
			},

			// exit node on arrow down
			ArrowDown: ({ editor }) => {
				if (!this.options.exitOnArrowDown) {
					return false;
				}

				const { state } = editor;
				const { selection, doc } = state;
				const { $from, empty } = selection;

				if (!empty || $from.parent.type !== this.type) {
					return false;
				}

				const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;

				if (!isAtEnd) {
					return false;
				}

				const after = $from.after();

				if (after === undefined) {
					return false;
				}

				const nodeAfter = doc.nodeAt(after);

				if (nodeAfter) {
					return false;
				}

				return editor.commands.exitCode();
			},
		};
	},

	addInputRules() {
		return [
			textblockTypeInputRule({
				find: mathDollorBlockInputRegex,
				type: this.type,
			}),
		];
	},

	// ProseMirror插件
	addProseMirrorPlugins() {
		return [
			...(this.parent?.() || []),
			KatexBlockPlugin({
				editor: this.editor,
				name: this.name,
				katexOptions: this.options.katexOptions,
			}),
		];
	},
});
