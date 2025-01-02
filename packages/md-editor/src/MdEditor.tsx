import { useMediaQuery, useMergedRef, useUncontrolled } from "@rtdui/hooks";
import {
	IconArticle,
	IconBlockquote,
	IconBold,
	IconBoxAlignLeft,
	IconBoxAlignRight,
	IconBraces,
	IconCode,
	IconH1,
	IconH2,
	IconH3,
	IconH4,
	IconH5,
	IconH6,
	IconHeading,
	IconHelpSquare,
	IconItalic,
	IconLink,
	IconList,
	IconListNumbers,
	IconMaximize,
	IconMinimize,
	IconPhoto,
} from "@tabler/icons-react";
import { Allotment, type AllotmentHandle } from "allotment";
import clsx from "clsx";
import { EditorView } from "codemirror";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import selectFiles from "select-files";
import { Editor } from "./Editor";
import { Preview } from "./Preview";
import { Sidebar } from "./Sidebar";
import { Statusbar } from "./Statusbar";
import { Toolbar } from "./Toolbar";
import { MdEditorProvider } from "./context";
import enLocale from "./locales/en.json";
import breaks from "./plugins/breaks";
import gemoji from "./plugins/gemoji";
import gfm from "./plugins/gfm";
import highlight from "./plugins/highlight-prism";
import math from "./plugins/math";
import mermaid from "./plugins/mermaid";
import toc from "./plugins/toc";
import {
	Meta,
	Mode,
	UploadResult,
	type ActivedSidebar,
	type Locale,
	type ProcessorOptions,
	type ToolbarItem,
	type SplitMode,
} from "./types";
import {
	appendBlock,
	getShortcutWithPrefix,
	replaceLines,
	wrapText,
} from "./utils/codemirror";

const iconSize = 20;
const iconStroke = 1.5;
function getHeadingIcon(level: number) {
	switch (level) {
		case 1:
			return <IconH1 size={iconSize} stroke={iconStroke} />;
		case 2:
			return <IconH2 size={iconSize} stroke={iconStroke} />;
		case 3:
			return <IconH3 size={iconSize} stroke={iconStroke} />;
		case 4:
			return <IconH4 size={iconSize} stroke={iconStroke} />;
		case 5:
			return <IconH5 size={iconSize} stroke={iconStroke} />;
		case 6:
			return <IconH6 size={iconSize} stroke={iconStroke} />;
		default:
			break;
	}
}

export interface MdEditorOwnProps extends ProcessorOptions {
	defaultValue?: string;
	value?: string;
	onChange?: (val: string) => void;
	/**
	 * responsive width when auto mode
	 * editor layout mode
	 * @default "auto"
	 */
	mode?: Mode;
	/**
	 * responsive width when auto mode
	 * @default 640
	 */
	responsiveWidth?: number;
	locale?: Locale;
	handleImageUpload?: (
		files: File[],
		ev: EditorView,
	) => Promise<UploadResult[]>;
	slots?: {
		toolbar?: string;
		editorWrapper?: string;
		editor?: string;
		preview?: string;
	};
}
type MdEditorProps = MdEditorOwnProps &
	Omit<React.ComponentPropsWithoutRef<"div">, keyof MdEditorOwnProps>;
export const MdEditor = forwardRef<HTMLDivElement, MdEditorProps>(
	(props, ref) => {
		const {
			handleImageUpload,
			defaultValue,
			value,
			onChange,
			mode = "auto",
			responsiveWidth = 640,
			plugins: pluginsProp = [],
			locale: localeProp = {},
			sanitize,
			remarkRehypeOptions,
			className,
			slots,
			...other
		} = props;

		const locale: Locale = useMemo(
			() => ({ ...enLocale, ...localeProp }),
			[localeProp],
		);

		const _plugins = [
			breaks(),
			gfm({ locale }),
			math({ locale }),
			mermaid({ locale }),
			highlight(),
			toc({ locale }),
			gemoji(),
		];

		const plugins = [..._plugins, ...pluginsProp];

		const [doc, setDoc] = useUncontrolled({
			defaultValue,
			value,
			finalValue: "",
			onChange,
		});

		const [editorView, setEditorView] = useState<EditorView>(null!);
		const [splitMode, setSplitMode] = useState<SplitMode>("both");
		const [activedSidebar, setActivedSidebar] =
			useState<ActivedSidebar>("none");
		const [fullscreen, setFullscreen] = useState(false);
		const [meta, setMeta] = useState<Meta>(null!);

		const [syncScroll, setSyncScroll] = useState(true);

		const allotmentRef = useRef<AllotmentHandle>(null);

		const rootRef = useRef<HTMLDivElement>(null!);
		// const { ref: rootRef, width, height } = useElementSize();
		const matches = useMediaQuery(`(min-width: ${responsiveWidth}px)`);
		const split = mode === "split" || (mode === "auto" && matches);

		const mergedRef = useMergedRef(ref, rootRef);

		const leftItems = useMemo<ToolbarItem[]>(() => {
			return [
				{
					type: "multiple",
					title: locale.headingText,
					icon: <IconHeading size={iconSize} stroke={iconStroke} />,
					actions: [1, 2, 3, 4, 5, 6].map((level) => ({
						title: locale[`h${level}` as keyof Locale],
						icon: getHeadingIcon(level),
						cheatsheet: `${"#".repeat(level)} ${locale.headingText}`,
						click(e, { editor }) {
							replaceLines(editor, (line) => {
								line = line.trim().replace(/^#*/, "").trim();
								line = `${"#".repeat(level)} ${line}`;
								return line;
							});
						},
					})),
				},
				{
					type: "single",
					title: locale.bold,
					icon: <IconBold size={iconSize} stroke={iconStroke} />,
					cheatsheet: `**${locale.boldText}**`,
					shortcut: getShortcutWithPrefix("b", true),
					click(e, { editor }) {
						wrapText(editor, "**");
					},
				},
				{
					type: "single",
					title: locale.italic,
					icon: <IconItalic size={iconSize} stroke={iconStroke} />,
					cheatsheet: `*${locale.italicText}*`,
					shortcut: getShortcutWithPrefix("i", true),
					click(e, { editor }) {
						wrapText(editor, "*");
					},
				},
				{
					type: "single",
					title: locale.boldAnditalic,
					icon: (
						<IconBold size={iconSize} stroke={2} className="-skew-x-[15deg]" />
					),
					cheatsheet: `*${locale.boldAnditalicText}*`,
					shortcut: getShortcutWithPrefix("d", true),
					click(e, { editor }) {
						wrapText(editor, "***");
					},
				},
				{
					type: "single",
					title: locale.quote,
					icon: <IconBlockquote size={iconSize} stroke={iconStroke} />,
					cheatsheet: `> ${locale.quotedText}`,
					click(e, { editor }) {
						replaceLines(editor, (line) => `> ${line}`);
					},
				},
				{
					type: "single",
					title: locale.link,
					icon: <IconLink size={iconSize} stroke={iconStroke} />,
					cheatsheet: `[${locale.linkText}](url)`,
					shortcut: getShortcutWithPrefix("l", true),
					click(e, { editor }) {
						wrapText(editor, "[", "](url)");
					},
				},
				{
					type: "single",
					title: locale.image,
					icon: <IconPhoto size={iconSize} stroke={iconStroke} />,
					cheatsheet: `![${locale.imageAlt}](url "${locale.imageTitle}")`,
					shortcut: getShortcutWithPrefix("k", true),
					async click(e, { editor }) {
						const fileList = await selectFiles({
							accept: "image/*",
						});
						if (fileList?.length) {
							const files = Array.from(fileList);
							const result = await handleImageUpload?.(files, editor);
							if (result) {
								result.forEach((d) =>
									wrapText(editor, "![", `${d.fileName}](${d.fileUrl})`),
								);
							}
						}
					},
				},
				{
					type: "single",
					title: locale.code,
					icon: <IconCode size={iconSize} stroke={iconStroke} />,
					cheatsheet: `\`${locale.codeText}\``,
					shortcut: getShortcutWithPrefix("c", true),
					click(e, { editor }) {
						wrapText(editor, "`");
					},
				},
				{
					type: "single",
					title: locale.codeBlock,
					icon: <IconBraces size={iconSize} stroke={iconStroke} />,
					cheatsheet: `\`\`\`${locale.codeLang}↵`,
					shortcut: getShortcutWithPrefix("p", true),
					click(e, { editor }) {
						appendBlock(editor, "txt", { prefix: "```", suffix: "\n```\n" });
					},
				},
				{
					type: "single",
					title: locale.ul,
					icon: <IconList size={iconSize} stroke={iconStroke} />,
					cheatsheet: `- ${locale.ulItem}`,
					shortcut: getShortcutWithPrefix("u", true),
					click(e, { editor }) {
						replaceLines(editor, (line) => `- ${line}`);
					},
				},
				{
					type: "single",
					title: locale.ol,
					icon: <IconListNumbers size={iconSize} stroke={iconStroke} />,
					cheatsheet: `1. ${locale.olItem}`,
					shortcut: getShortcutWithPrefix("o", true),
					click(e, { editor }) {
						replaceLines(editor, (line, i) => `${i + 1}. ${line}`);
					},
				},
			];
		}, [locale, handleImageUpload]);

		const rightItems = useMemo<ToolbarItem[]>(() => {
			const tocActive = activedSidebar === "toc"; // 目录
			const helpActive = activedSidebar === "help"; // 帮助
			const writeActive = splitMode === "edit"; // 仅编辑视图
			const previewActive = splitMode === "preview"; // 仅预览视图
			const normal: ToolbarItem[] = [
				{
					type: "single",
					title: tocActive ? locale.closeToc : locale.toc,
					icon: <IconArticle size={iconSize} stroke={iconStroke} />,
					click: () => {
						if (activedSidebar === "toc") {
							setActivedSidebar?.("none");
						} else {
							setActivedSidebar?.("toc");
						}
					},
					active: tocActive,
				},
				{
					type: "single",
					title: helpActive ? locale.closeHelp : locale.help,
					icon: <IconHelpSquare size={iconSize} stroke={iconStroke} />,
					click: () => {
						if (activedSidebar === "help") {
							setActivedSidebar?.("none");
						} else {
							setActivedSidebar?.("help");
						}
					},
					active: helpActive,
				},
			];

			if (split) {
				return [
					...normal,
					{
						type: "single",
						title: writeActive ? locale.exitWriteOnly : locale.writeOnly,
						icon: <IconBoxAlignLeft size={iconSize} stroke={iconStroke} />,
						click: () => {
							if (splitMode === "edit") {
								setSplitMode?.("both");
							} else {
								setSplitMode?.("edit");
							}
						},
						active: writeActive,
					},
					{
						type: "single",
						title: previewActive ? locale.exitPreviewOnly : locale.previewOnly,
						icon: <IconBoxAlignRight size={iconSize} stroke={iconStroke} />,
						click: () => {
							if (splitMode === "preview") {
								setSplitMode?.("both");
							} else {
								setSplitMode?.("preview");
							}
						},
						active: previewActive,
					},
					{
						type: "single",
						title: fullscreen ? locale.exitFullscreen : locale.fullscreen,
						icon: fullscreen ? (
							<IconMinimize size={iconSize} stroke={iconStroke} />
						) : (
							<IconMaximize size={iconSize} stroke={iconStroke} />
						),
						click: () => {
							setFullscreen((prev) => !prev);
						},
					},
					// {
					//   type: "single",
					//   title: locale.source,
					//   // icon: icons.source,
					//   click: () => {
					//     window.open("https://bgithub.xyz/pd4d10/hashmd");
					//   },
					// },
				];
			} else {
				return [
					...normal,
					{
						type: "single",
						title: fullscreen ? locale.exitFullscreen : locale.fullscreen,
						icon: fullscreen ? (
							<IconMinimize size={iconSize} stroke={iconStroke} />
						) : (
							<IconMaximize size={iconSize} stroke={iconStroke} />
						),
						click: () => {
							setFullscreen((prev) => !prev);
						},
					},
				];
			}
		}, [split, locale, fullscreen, splitMode, activedSidebar]);

		const toolbarItems = [
			...leftItems,
			...plugins.flatMap((p) => p.toolbar ?? []),
			{ type: "space" },
			...rightItems,
		] as ToolbarItem[];

		const previewRef = useRef<HTMLDivElement>(null!);
		const editorCalledRef = useRef(false);
		const previewCalledRef = useRef(false);

		const handleEditorScroll = () => {
			if (!syncScroll) return;

			if (previewCalledRef.current) {
				previewCalledRef.current = false;
				return;
			}

			const editEl = editorView.scrollDOM;
			const previewEl = previewRef.current;

			const leftRatio =
				editEl.scrollTop / (editEl.scrollHeight - editEl.clientHeight);

			previewEl.scrollTo(
				0,
				leftRatio * (previewEl.scrollHeight - previewEl.clientHeight),
			);
			editorCalledRef.current = true;
		};

		const handlePreviewScroll = () => {
			if (!syncScroll) return;

			if (editorCalledRef.current) {
				editorCalledRef.current = false;
				return;
			}

			const editEl = editorView.scrollDOM;
			const previewEl = previewRef.current;

			const rightRatio =
				previewEl.scrollTop / (previewEl.scrollHeight - previewEl.clientHeight);

			editEl.scrollTo(
				0,
				rightRatio * (editEl.scrollHeight - editEl.clientHeight),
			);
			previewCalledRef.current = true;
		};

		const handleScrollToTop = () => {
			editorView.scrollDOM.scrollTo(0, 0);
			previewRef.current.scrollTo(0, 0);
		};

		useEffect(() => {
			if (!editorView) {
				return;
			}
			editorView.scrollDOM.addEventListener("scroll", handleEditorScroll, {
				passive: true,
			});

			const previewScrollDom = previewRef.current;
			previewScrollDom.addEventListener("scroll", handlePreviewScroll, {
				passive: true,
			});

			return () => {
				if (editorView) {
					editorView.scrollDOM.removeEventListener(
						"scroll",
						handleEditorScroll,
					);
					previewScrollDom.removeEventListener("scroll", handlePreviewScroll);
				}
			};
		});

		useEffect(() => {
			if (splitMode === "both" && allotmentRef.current) {
				allotmentRef.current.reset();
			}
		}, [splitMode]);

		return (
			<MdEditorProvider
				value={{
					split,
					value: doc,
					onValueChange: setDoc,
					editorView,
					onEditorViewChange: setEditorView,
					locale,
					plugins,
					sanitize,
					remarkRehypeOptions,
					toolbars: toolbarItems,
					meta,
					onMetaChange: setMeta,
					syncScroll,
					onSyncScrollChange: setSyncScroll,
					scrollToTop: handleScrollToTop,
				}}
			>
				<div
					ref={mergedRef}
					{...other}
					className={clsx(
						"mdeditor-root",
						"h-[calc(100dvh-100px)]",
						"grid grid-rows-[auto_minmax(0,1fr)_auto]",
						"mx-auto max-w-screen-lg ",
						{
							"[&&]:fixed inset-0 [&&]:max-w-none [&&]:mx-0 [&&]:h-auto":
								fullscreen,
						},
						className,
					)}
				>
					<Toolbar
						className={clsx(
							"toolbar",
							"flex flex-wrap items-center gap-2 h-max border-t border-x border-base-300 bg-base-300 p-2",
							slots?.toolbar,
						)}
					/>
					<div className="relative">
						{split ? (
							<Allotment ref={allotmentRef}>
								<Allotment.Pane
									preferredSize="50%"
									visible={splitMode === "both" || splitMode === "edit"}
								>
									<Editor
										className={clsx(
											"border border-base-300 border-r-0 bg-base-200",
											"h-full",
											slots?.editor,
										)}
									/>
								</Allotment.Pane>
								<Allotment.Pane
									preferredSize="50%"
									visible={splitMode === "both" || splitMode === "preview"}
								>
									<Preview
										ref={previewRef}
										className={clsx(
											"border border-base-300 border-l-0 p-4",
											"h-full",
											"overflow-auto",
											slots?.preview,
										)}
									/>
								</Allotment.Pane>
							</Allotment>
						) : (
							<div
								role="tablist"
								className="tabs tabs-boxed p-0 rounded-none grid-rows-[auto_minmax(0,1fr)] h-full [align-items:normal]"
							>
								<input
									type="radio"
									name="md-editor-tabs"
									role="tab"
									className="tab after:text-nowrap"
									aria-label="编辑"
									defaultChecked
								/>
								<div role="tabpanel" className="tab-content m-0 border-0">
									<Editor
										className={clsx(
											"border border-base-300 bg-base-200",
											"h-full",
											{
												"border-r-0": split,
											},
											slots?.editor,
										)}
									/>
								</div>

								<input
									type="radio"
									name="md-editor-tabs"
									role="tab"
									className="tab after:text-nowrap"
									aria-label="预览"
								/>
								<div role="tabpanel" className="tab-content m-0 border-0">
									<Preview
										ref={previewRef}
										className={clsx(
											"border border-base-300 p-4 bg-base-100",
											"h-full",
											"overflow-auto",
											{
												"border-l-0": split,
											},
											slots?.preview,
										)}
									/>
								</div>
							</div>
						)}
						<Sidebar
							activedSidebar={activedSidebar}
							className={clsx(
								"absolute inset-px left-auto min-w-72 p-2 bg-base-200 overflow-auto shadow-lg",
								{
									hidden: activedSidebar === "none",
								},
							)}
						/>
					</div>
					<Statusbar />
				</div>
			</MdEditorProvider>
		);
	},
);

MdEditor.displayName = "@rtdui/md-editor/MdEditor";
