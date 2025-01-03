import { createSafeContext } from "@rtdui/core";
import {
	type EditorView,
	type Locale,
	type Meta,
	Mode,
	type ProcessorOptions,
	type ToolbarItem,
} from "./types";

interface MdEditorContextValue extends ProcessorOptions {
	split?: boolean;
	value?: string;
	onValueChange?: (val: string) => void;
	editorView: EditorView;
	onEditorViewChange: (editorView: EditorView) => void;
	locale?: Locale;
	toolbars?: ToolbarItem[];
	meta?: Meta;
	onMetaChange?: (meta: Meta) => void;
	syncScroll?: boolean;
	onSyncScrollChange?: (val: boolean) => void;
	scrollToTop?: () => void;
}

export const [MdEditorProvider, useMdEditorContext] =
	createSafeContext<MdEditorContextValue>(
		"MdEditor Context was not found in tree",
	);
