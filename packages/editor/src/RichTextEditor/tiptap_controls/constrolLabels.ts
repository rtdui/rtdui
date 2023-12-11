export interface ControlLabels {
  /** RichTextEditor.Bold control aria-label */
  boldControlLabel: string;

  /** RichTextEditor.Hr control aria-label */
  hrControlLabel: string;

  /** RichTextEditor.Italic control aria-label */
  italicControlLabel: string;

  /** RichTextEditor.Underline control aria-label */
  underlineControlLabel: string;

  /** RichTextEditor.Strike control aria-label */
  strikeControlLabel: string;

  /** RichTextEditor.ClearFormatting control aria-label */
  clearFormattingControlLabel: string;

  /** RichTextEditor.Link control aria-label */
  linkControlLabel: string;

  /** RichTextEditor.Unlink control aria-label */
  unlinkControlLabel: string;

  /** RichTextEditor.BulletList control aria-label */
  bulletListControlLabel: string;

  /** RichTextEditor.OrderedList control aria-label */
  orderedListControlLabel: string;

  /** RichTextEditor.H1 control aria-label */
  h1ControlLabel: string;

  /** RichTextEditor.H2 control aria-label */
  h2ControlLabel: string;

  /** RichTextEditor.H3 control aria-label */
  h3ControlLabel: string;

  /** RichTextEditor.H4 control aria-label */
  h4ControlLabel: string;

  /** RichTextEditor.H5 control aria-label */
  h5ControlLabel: string;

  /** RichTextEditor.H6 control aria-label */
  h6ControlLabel: string;

  /** RichTextEditor.Blockquote control aria-label */
  blockquoteControlLabel: string;

  /** RichTextEditor.AlignLeft control aria-label */
  alignLeftControlLabel: string;

  /** RichTextEditor.AlignCenter control aria-label */
  alignCenterControlLabel: string;

  /** RichTextEditor.AlignRight control aria-label */
  alignRightControlLabel: string;

  /** RichTextEditor.AlignJustify control aria-label */
  alignJustifyControlLabel: string;

  /** RichTextEditor.Code control aria-label */
  codeControlLabel: string;

  /** RichTextEditor.CodeBlock control aria-label */
  codeBlockControlLabel: string;

  /** RichTextEditor.Subscript control aria-label */
  subscriptControlLabel: string;

  /** RichTextEditor.Superscript control aria-label */
  superscriptControlLabel: string;

  /** RichTextEditor.ColorPicker control aria-label */
  colorPickerControlLabel: string;

  /** RichTextEditor.UnsetColor control aria-label */
  unsetColorControlLabel: string;

  /** RichTextEditor.Highlight control aria-label */
  highlightControlLabel: string;

  /** A function go get RichTextEditor.Color control aria-label based on color that control applies */
  colorControlLabel: (color: string) => string;

  /** aria-label for link editor url input */
  linkEditorInputLabel: string;

  /** placeholder for link editor url input */
  linkEditorInputPlaceholder: string;

  /** Content of external button tooltip in link editor when the link was chosen to open in a new tab */
  linkEditorExternalLink: string;

  /** Content of external button tooltip in link editor when the link was chosen to open in the same tab */
  linkEditorInternalLink: string;

  /** Save button content in link editor */
  linkEditorSave: string;

  /** Cancel button title text in color picker control */
  colorPickerCancel: string;

  /** Clear button title text in color picker control */
  colorPickerClear: string;

  /** Color picker button title text in color picker control */
  colorPickerColorPicker: string;

  /** Palette button title text in color picker control */
  colorPickerPalette: string;

  /** Save button title text in color picker control */
  colorPickerSave: string;

  /** aria-label for color palette colors */
  colorPickerColorLabel: (color: string) => string;

  /** image */
  ImageControlLabel: string;
  /** table */
  TableControlLabel: string;
  /** helper */
  HelperControlLabel: string;
}

export const DEFAULT_LABELS: ControlLabels = {
  // Controls labels
  linkControlLabel: "Link",
  colorPickerControlLabel: "Text color",
  highlightControlLabel: "Highlight text",
  colorControlLabel: (color) => `Set text color ${color}`,
  boldControlLabel: "Bold",
  italicControlLabel: "Italic",
  underlineControlLabel: "Underline",
  strikeControlLabel: "Strikethrough",
  clearFormattingControlLabel: "Clear formatting",
  unlinkControlLabel: "Remove link",
  bulletListControlLabel: "Bullet list",
  orderedListControlLabel: "Ordered list",
  h1ControlLabel: "Heading 1",
  h2ControlLabel: "Heading 2",
  h3ControlLabel: "Heading 3",
  h4ControlLabel: "Heading 4",
  h5ControlLabel: "Heading 5",
  h6ControlLabel: "Heading 6",
  blockquoteControlLabel: "Blockquote",
  alignLeftControlLabel: "Align text: left",
  alignCenterControlLabel: "Align text: center",
  alignRightControlLabel: "Align text: right",
  alignJustifyControlLabel: "Align text: justify",
  codeControlLabel: "Code",
  codeBlockControlLabel: "Code block",
  subscriptControlLabel: "Subscript",
  superscriptControlLabel: "Superscript",
  unsetColorControlLabel: "Unset color",
  hrControlLabel: "Horizontal line",

  // Link editor
  linkEditorInputLabel: "Enter URL",
  linkEditorInputPlaceholder: "https://example.com/",
  linkEditorExternalLink: "Open link in a new tab",
  linkEditorInternalLink: "Open link in the same tab",
  linkEditorSave: "Save",

  // Color picker control
  colorPickerCancel: "Cancel",
  colorPickerClear: "Clear color",
  colorPickerColorPicker: "Color picker",
  colorPickerPalette: "Color palette",
  colorPickerSave: "Save",
  colorPickerColorLabel: (color) => `Set text color ${color}`,

  // image
  ImageControlLabel: "Image",

  // table
  TableControlLabel: "Table",
  // helper
  HelperControlLabel: "User Manual",
};

export const DEFAULT_CN_LABELS: ControlLabels = {
  // Controls labels
  linkControlLabel: "链接()",
  colorPickerControlLabel: "文本颜色",
  highlightControlLabel: "文本高亮",
  colorControlLabel: (color) => `设置文本颜色 ${color}`,
  boldControlLabel: "粗体",
  italicControlLabel: "斜体",
  underlineControlLabel: "下划线",
  strikeControlLabel: "删除线",
  clearFormattingControlLabel: "清除格式",
  unlinkControlLabel: "移除链接",
  bulletListControlLabel: "符号列表",
  orderedListControlLabel: "序号列表",
  h1ControlLabel: "标题1",
  h2ControlLabel: "标题2",
  h3ControlLabel: "标题3",
  h4ControlLabel: "标题4",
  h5ControlLabel: "标题5",
  h6ControlLabel: "标题6",
  blockquoteControlLabel: "块引用",
  alignLeftControlLabel: "文本: 左对齐",
  alignCenterControlLabel: "文本: 居中对齐",
  alignRightControlLabel: "文本: 右对齐",
  alignJustifyControlLabel: "文本: 两端对齐",
  codeControlLabel: "内联代码",
  codeBlockControlLabel: "代码块",
  subscriptControlLabel: "下标",
  superscriptControlLabel: "上标",
  unsetColorControlLabel: "取消颜色",
  hrControlLabel: "水平线",

  // Link editor
  linkEditorInputLabel: "输入 URL",
  linkEditorInputPlaceholder: "https://example.com/",
  linkEditorExternalLink: "在新标签页打开链接",
  linkEditorInternalLink: "在当前标签页打开链接",
  linkEditorSave: "保存",

  // Color picker control
  colorPickerCancel: "取消",
  colorPickerClear: "清除颜色",
  colorPickerColorPicker: "清除颜色拾取器",
  colorPickerPalette: "颜色面板",
  colorPickerSave: "保存",
  colorPickerColorLabel: (color) => `设置文本颜色 ${color}`,

  // image
  ImageControlLabel: "图片",

  // table
  TableControlLabel: "表格",
  // helper
  HelperControlLabel: "帮助文档",
};
