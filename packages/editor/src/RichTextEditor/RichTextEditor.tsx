import { forwardRef, useImperativeHandle } from "react";
import clsx from "clsx";
import type { EditorOptions } from "@tiptap/core";
import {
	useEditor,
	EditorContent,
	FloatingMenu as FloatingMenuComponent,
	findParentNodeClosestToPos,
	posToDOMRect,
} from "@tiptap/react";
import {
	IconBoxAlignLeft,
	IconBoxAlignTop,
	IconBoxAlignTopLeft,
	IconColumnInsertLeft,
	IconColumnInsertRight,
	IconContainerOff,
	IconRowInsertBottom,
	IconRowInsertTop,
	IconSquareToggle,
	IconTable,
	IconTableOff,
	IconViewportNarrow,
	IconArrowBarBoth,
} from "@tabler/icons-react";
import {
	StarterKit,
	Table,
	TableHeader,
	TableRow,
	TableCell,
	Link,
	TaskList,
	TaskItem,
	SuperScript,
	SubScript,
	Highlight,
	TextAlign,
	Placeholder,
	CodeBlockPrismjs,
	// Collaboration,
	// CollaborationCursor,
	UploadImageWithResizable,
	// IndexeddbPersistence,
	// getProvider,
	// Y,
	markdownPasteExtension,
	MathKatexInline,
	MathKatexBlock,
} from "./tiptap";
import { EditorControl } from "./tiptap_controls/EditorControl";
import { HelperControl } from "./tiptap_controls/HelperControl";

export interface RichTextEditorProps
	extends React.ComponentPropsWithoutRef<"div"> {
	editable?: boolean;
	placeholder?: string;
	uploadImageUrl?: string;
	imageResizable?: boolean;
	slots?: { toolbar?: string; content?: string };
}
export const RichTextEditor = forwardRef<any, RichTextEditorProps>(
	(props, ref) => {
		const {
			slots,
			editable = true,
			placeholder = "输入内容或者从剪贴板粘贴, 复制粘贴支持Markdown",
			uploadImageUrl,
			imageResizable = true,
			...other
		} = props;

		// const ydoc = new Y.Doc();
		// const docName = "example-document";
		// const provider = getProvider(docName, ydoc);
		// new IndexeddbPersistence(docName, ydoc);

		// const searchParams = new URL(location.href).searchParams;
		// const name = searchParams.get("name") ?? "unknown";
		// const color = `#${searchParams.get("color") ?? "f783ac"}`;

		const editorOptions: Partial<EditorOptions> = {
			extensions: [
				StarterKit.configure({
					// history: false, // The Collaboration extension comes with its own history handling
					codeBlock: false, // 会使用CodeBlockHighlight替代
				}),
				Table.configure({
					resizable: true,
				}),
				TableRow,
				TableHeader,
				TableCell,
				Link,
				TaskList,
				TaskItem.configure({
					nested: true,
				}),
				SuperScript,
				SubScript,
				Highlight,
				Placeholder.configure({
					placeholder,
				}),
				TextAlign.configure({
					types: ["heading", "paragraph", "tableHeader", "tableCell"],
				}),
				CodeBlockPrismjs,
				// Register the document with Tiptap
				// Collaboration.configure({
				//   document: ydoc,
				// }),
				// // Register the collaboration cursor extension
				// CollaborationCursor.configure({
				//   provider,
				//   user: {
				//     name,
				//     color,
				//   },
				// }),
				UploadImageWithResizable.configure({
					resizable: imageResizable,
					inline: true,
					url: uploadImageUrl,
					method: "post",
				}),
				markdownPasteExtension,
				MathKatexInline,
				MathKatexBlock,
			],
			editable,
		};
		const editor = useEditor(editorOptions);

		useImperativeHandle<any, any>(ref, () => ({
			getJSON: () => {
				if (editor) {
					return editor.getJSON();
				}
				return null;
			},
			setContent: (jsonOrHtml: Record<string, any> | string) => {
				if (editor) {
					editor.commands.setContent(jsonOrHtml);
				}
			},
		}));

		if (!editor) {
			return null;
		}

		return (
			<div {...other}>
				{editor && editable && (
					<>
						<EditorControl editor={editor}>
							<EditorControl.Toolbar sticky className={clsx(slots?.toolbar)}>
								<EditorControl.ControlsGroup>
									<EditorControl.Bold />
									<EditorControl.Italic />
									{/* <RichTextEditor.Underline /> */}
									<EditorControl.Strikethrough />
									<EditorControl.Highlight />
									<EditorControl.Code />
									<EditorControl.ClearFormatting />
								</EditorControl.ControlsGroup>
								<EditorControl.ControlsGroup>
									<EditorControl.H1 />
									<EditorControl.H2 />
									<EditorControl.H3 />
									<EditorControl.H4 />
								</EditorControl.ControlsGroup>
								<EditorControl.ControlsGroup>
									<EditorControl.Blockquote />
									<EditorControl.Hr />
									<EditorControl.BulletList />
									<EditorControl.OrderedList />
									<EditorControl.Subscript />
									<EditorControl.Superscript />
								</EditorControl.ControlsGroup>
								{/* <EditorControl.ControlsGroup>
                    <EditorControl.Link />
                    <EditorControl.Unlink />
                  </EditorControl.ControlsGroup> */}
								<EditorControl.ControlsGroup>
									<EditorControl.AlignLeft />
									<EditorControl.AlignCenter />
									<EditorControl.AlignRight />
									<EditorControl.AlignJustify />
								</EditorControl.ControlsGroup>
								<EditorControl.ControlsGroup>
									<EditorControl.Image />
									<EditorControl.Table />
								</EditorControl.ControlsGroup>
								<EditorControl.ControlsGroup>
									<HelperControl />
								</EditorControl.ControlsGroup>
							</EditorControl.Toolbar>
						</EditorControl>

						<FloatingMenuComponent
							editor={editor}
							shouldShow={({ editor }) =>
								editor.isActive("tableCell") || editor.isActive("tableHeader")
							}
							tippyOptions={{
								placement: "top",
								getReferenceClientRect: () => {
									// return document
									//   .querySelector(".tableWrapper > table")!
									//   .getBoundingClientRect();
									const tableNode = findParentNodeClosestToPos(
										editor.view.state.selection.$from,
										(node) => node.type.name === "table",
									);
									return posToDOMRect(
										editor.view,
										tableNode?.start as any,
										tableNode?.start as any,
									);
								},
							}}
						>
							<div className="join">
								<button
									type="button"
									className="join-item btn btn-sm px-1"
									title="插入表格"
									onClick={() =>
										editor
											.chain()
											.focus()
											.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
											.run()
									}
								>
									<IconTable stroke={1} />
								</button>
								<button
									type="button"
									className="join-item btn btn-sm px-1"
									title="左侧插入列"
									onClick={() => editor.chain().focus().addColumnBefore().run()}
								>
									<IconColumnInsertLeft stroke={1} />
								</button>
								<button
									type="button"
									className="join-item btn btn-sm px-1"
									title="右侧插入列"
									onClick={() => editor.chain().focus().addColumnAfter().run()}
								>
									<IconColumnInsertRight stroke={1} />
								</button>
								<button
									type="button"
									className="join-item btn btn-sm px-1"
									title="删除列"
									onClick={() => editor.chain().focus().deleteColumn().run()}
								>
									<IconContainerOff stroke={1} />
								</button>
								<button
									type="button"
									className="join-item btn btn-sm px-1"
									title="上方插入行"
									onClick={() => editor.chain().focus().addRowBefore().run()}
								>
									<IconRowInsertTop stroke={1} />
								</button>
								<button
									type="button"
									className="join-item btn btn-sm px-1"
									title="下方插入行"
									onClick={() => editor.chain().focus().addRowAfter().run()}
								>
									<IconRowInsertBottom stroke={1} />
								</button>
								<button
									type="button"
									className="join-item btn btn-sm px-1"
									title="删除行"
									onClick={() => editor.chain().focus().deleteRow().run()}
								>
									<IconContainerOff className="rotate-90" stroke={1} />
								</button>
								<button
									type="button"
									className="join-item btn btn-sm px-1"
									title="删除表格"
									onClick={() => editor.chain().focus().deleteTable().run()}
								>
									<IconTableOff stroke={1} />
								</button>
								<button
									type="button"
									className="join-item btn btn-sm px-1"
									title="合并单元格"
									onClick={() => editor.chain().focus().mergeCells().run()}
								>
									<IconViewportNarrow stroke={1} />
								</button>
								<button
									type="button"
									className="join-item btn btn-sm px-1"
									title="拆分单元格"
									onClick={() => editor.chain().focus().splitCell().run()}
								>
									<IconArrowBarBoth stroke={1} />
								</button>
								<button
									type="button"
									className="join-item btn btn-sm px-1"
									title="合并或拆分"
									onClick={() => editor.chain().focus().mergeOrSplit().run()}
								>
									<IconSquareToggle stroke={1} />
								</button>
								<button
									type="button"
									className="join-item btn btn-sm px-1"
									title="首列切换"
									onClick={() =>
										editor.chain().focus().toggleHeaderColumn().run()
									}
								>
									<IconBoxAlignLeft stroke={1} />
								</button>
								<button
									type="button"
									className="join-item btn btn-sm px-1"
									title="首行切换"
									onClick={() => editor.chain().focus().toggleHeaderRow().run()}
								>
									<IconBoxAlignTop stroke={1} />
								</button>
								<button
									type="button"
									className="join-item btn btn-sm px-1"
									title="单元格切换行头样式"
									onClick={() =>
										editor.chain().focus().toggleHeaderCell().run()
									}
								>
									<IconBoxAlignTopLeft stroke={1} />
								</button>
								{/* <button
              type="button"
              className="join-item btn btn-sm px-1"
              onClick={() =>
                editor.chain().focus().setCellAttribute("colspan", 2).run()
              }
            >
              setCellAttribute
            </button> */}
								{/* <button
              type="button"
              className="join-item btn btn-sm px-1"
              onClick={() => editor.chain().focus().fixTables().run()}
            >
              fixTables
            </button> */}
								{/* <button
              type="button"
              className="join-item btn btn-sm px-1"
              onClick={() => editor.chain().focus().goToNextCell().run()}
            >
              跳到下一个单元格
            </button>
            <button
              type="button"
              className="join-item btn btn-sm px-1"
              onClick={() => editor.chain().focus().goToPreviousCell().run()}
            >
              跳到前一个单元格
            </button> */}
							</div>
						</FloatingMenuComponent>
					</>
				)}
				<EditorContent
					editor={editor}
					className={clsx("editor-content prose !max-w-none", slots?.content)}
				/>
			</div>
		);
	},
);

RichTextEditor.displayName = "@rtdui/RichTextEditor";
