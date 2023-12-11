import React, { useMemo, forwardRef } from "react";
import type { Editor as EditorType } from "@tiptap/react";
import { EditorProvider } from "./ControlContext";
import * as controls from "./tiptapControls";
import { ControlsGroup } from "./ControlsGroup";
import Toolbar from "./ToolbarControl";

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
export const EditorControl = forwardRef<HTMLDivElement, TiptapEditorProps>(
  (props, ref) => {
    const { editor, children, labels, ...others } = props;

    const mergedLabels = useMemo(
      () => ({ ...DEFAULT_CN_LABELS, ...labels }),
      [labels]
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
  }
) as any;

// Generic components
// EditorControl.Content = Content;
// EditorControl.Control = Control;
EditorControl.ControlsGroup = ControlsGroup;
EditorControl.Toolbar = Toolbar;

// Controls components
EditorControl.Bold = controls.BoldControl;
EditorControl.Italic = controls.ItalicControl;
EditorControl.Strikethrough = controls.StrikeThroughControl;
EditorControl.Underline = controls.UnderlineControl;
EditorControl.ClearFormatting = controls.ClearFormattingControl;
EditorControl.H1 = controls.H1Control;
EditorControl.H2 = controls.H2Control;
EditorControl.H3 = controls.H3Control;
EditorControl.H4 = controls.H4Control;
EditorControl.H5 = controls.H5Control;
EditorControl.H6 = controls.H6Control;
EditorControl.BulletList = controls.BulletListControl;
EditorControl.OrderedList = controls.OrderedListControl;
// EditorControl.Link = controls.LinkControl;
EditorControl.Unlink = controls.UnlinkControl;
EditorControl.Blockquote = controls.BlockquoteControl;
EditorControl.AlignLeft = controls.AlignLeftControl;
EditorControl.AlignRight = controls.AlignRightControl;
EditorControl.AlignCenter = controls.AlignCenterControl;
EditorControl.AlignJustify = controls.AlignJustifyControl;
EditorControl.Superscript = controls.SuperscriptControl;
EditorControl.Subscript = controls.SubscriptControl;
EditorControl.Code = controls.CodeControl;
EditorControl.CodeBlock = controls.CodeBlockControl;
// EditorControl.ColorPicker = controls.ColorPickerControl;
// EditorControl.Color = controls.ColorControl;
EditorControl.Highlight = controls.HighlightControl;
EditorControl.Hr = controls.HrControl;
EditorControl.UnsetColor = controls.UnsetColorControl;
EditorControl.Image = controls.ImageControl;
EditorControl.Table = controls.TableControl;
