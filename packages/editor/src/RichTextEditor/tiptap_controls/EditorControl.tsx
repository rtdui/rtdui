import { useMemo, forwardRef } from "react";
import type { Editor as EditorType } from "@tiptap/react";
import { EditorProvider } from "./ControlContext";
import * as controls from "./tiptapControls";
import { ControlsGroup } from "./ControlsGroup";
import { ToolbarControl } from "./ToolbarControl";

import type { ControlLabels } from "./constrolLabels";
import { DEFAULT_CN_LABELS } from "./constrolLabels";

export interface TiptapEditorProps
	extends React.ComponentPropsWithoutRef<"div"> {
	/** Tiptap editor instance */
	editor: EditorType;

	/** Labels that are used in controls */
	labels?: Partial<ControlLabels>;

	/** Child editor components */
	children: React.ReactNode;
}
export const EditorControl_ = forwardRef<HTMLDivElement, TiptapEditorProps>(
	(props, ref) => {
		const { editor, children, labels, ...others } = props;

		const mergedLabels = useMemo(
			() => ({ ...DEFAULT_CN_LABELS, ...labels }),
			[labels],
		);

		return (
			<EditorProvider
				value={{
					editor,
					labels: mergedLabels,
				}}
			>
				<div ref={ref} {...others}>
					{children}
				</div>
			</EditorProvider>
		);
	},
);

EditorControl_.displayName = "@rtdui/editor/EditorControl";

export const EditorControl = Object.assign(EditorControl_, {
	// Content = Content,
	// Control = Control,
	ControlsGroup,
	Toolbar: ToolbarControl,

	// Controls components
	Bold: controls.BoldControl,
	Italic: controls.ItalicControl,
	Strikethrough: controls.StrikeThroughControl,
	Underline: controls.UnderlineControl,
	ClearFormatting: controls.ClearFormattingControl,
	H1: controls.H1Control,
	H2: controls.H2Control,
	H3: controls.H3Control,
	H4: controls.H4Control,
	H5: controls.H5Control,
	H6: controls.H6Control,
	BulletList: controls.BulletListControl,
	OrderedList: controls.OrderedListControl,
	// Link: controls.LinkControl,
	Unlink: controls.UnlinkControl,
	Blockquote: controls.BlockquoteControl,
	AlignLeft: controls.AlignLeftControl,
	AlignRight: controls.AlignRightControl,
	AlignCenter: controls.AlignCenterControl,
	AlignJustify: controls.AlignJustifyControl,
	Superscript: controls.SuperscriptControl,
	Subscript: controls.SubscriptControl,
	Code: controls.CodeControl,
	CodeBlock: controls.CodeBlockControl,
	Highlight: controls.HighlightControl,
	Hr: controls.HrControl,
	// ColorPicker: controls.ColorPickerControl,
	// Color: controls.ColorControl,
	UnsetColor: controls.UnsetColorControl,
	Image: controls.ImageControl,
	Table: controls.TableControl,
});
