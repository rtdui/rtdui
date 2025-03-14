import {
	IconBold,
	IconItalic,
	IconUnderline,
	IconStrikethrough,
	IconClearFormatting,
	IconH1,
	IconH2,
	IconH3,
	IconH4,
	IconH5,
	IconH6,
	IconList,
	IconListNumbers,
	IconUnlink,
	IconBlockquote,
	IconAlignLeft,
	IconAlignRight,
	IconAlignCenter,
	IconAlignJustified,
	IconSubscript,
	IconSuperscript,
	IconCode,
	IconHighlight,
	IconLineDashed,
	IconCircleOff,
	IconPhoto,
	IconTable,
} from "@tabler/icons-react";
import createTiptapControl from "./createTiptapControl";

export const BoldControl = createTiptapControl({
	label: "boldControlLabel",
	icon: (props) => <IconBold {...props} stroke={1.5} />,
	isActive: { name: "bold" },
	operation: { name: "toggleBold" },
});

export const ItalicControl = createTiptapControl({
	label: "italicControlLabel",
	icon: (props) => <IconItalic {...props} stroke={1.5} />,
	isActive: { name: "italic" },
	operation: { name: "toggleItalic" },
});

export const UnderlineControl = createTiptapControl({
	label: "underlineControlLabel",
	icon: (props) => <IconUnderline {...props} stroke={1.5} />,
	isActive: { name: "underline" },
	operation: { name: "toggleUnderline" },
});

export const StrikeThroughControl = createTiptapControl({
	label: "strikeControlLabel",
	icon: (props) => <IconStrikethrough {...props} stroke={1.5} />,
	isActive: { name: "strike" },
	operation: { name: "toggleStrike" },
});

export const ClearFormattingControl = createTiptapControl({
	label: "clearFormattingControlLabel",
	icon: (props) => <IconClearFormatting {...props} stroke={1.5} />,
	operation: { name: "unsetAllMarks" },
});

export const UnlinkControl = createTiptapControl({
	label: "unlinkControlLabel",
	icon: (props) => <IconUnlink {...props} stroke={1.5} />,
	operation: { name: "unsetLink" },
});

export const BulletListControl = createTiptapControl({
	label: "bulletListControlLabel",
	icon: (props) => <IconList {...props} stroke={1.5} />,
	isActive: { name: "bulletList" },
	operation: { name: "toggleBulletList" },
});

export const OrderedListControl = createTiptapControl({
	label: "orderedListControlLabel",
	icon: (props) => <IconListNumbers {...props} stroke={1.5} />,
	isActive: { name: "orderedList" },
	operation: { name: "toggleOrderedList" },
});

export const H1Control = createTiptapControl({
	label: "h1ControlLabel",
	icon: (props) => <IconH1 {...props} stroke={1.5} />,
	isActive: { name: "heading", attributes: { level: 1 } },
	operation: { name: "toggleHeading", attributes: { level: 1 } },
});

export const H2Control = createTiptapControl({
	label: "h2ControlLabel",
	icon: (props) => <IconH2 {...props} stroke={1.5} />,
	isActive: { name: "heading", attributes: { level: 2 } },
	operation: { name: "toggleHeading", attributes: { level: 2 } },
});

export const H3Control = createTiptapControl({
	label: "h3ControlLabel",
	icon: (props) => <IconH3 {...props} stroke={1.5} />,
	isActive: { name: "heading", attributes: { level: 3 } },
	operation: { name: "toggleHeading", attributes: { level: 3 } },
});

export const H4Control = createTiptapControl({
	label: "h4ControlLabel",
	icon: (props) => <IconH4 {...props} stroke={1.5} />,
	isActive: { name: "heading", attributes: { level: 4 } },
	operation: { name: "toggleHeading", attributes: { level: 4 } },
});

export const H5Control = createTiptapControl({
	label: "h5ControlLabel",
	icon: (props) => <IconH5 {...props} stroke={1.5} />,
	isActive: { name: "heading", attributes: { level: 5 } },
	operation: { name: "toggleHeading", attributes: { level: 5 } },
});

export const H6Control = createTiptapControl({
	label: "h6ControlLabel",
	icon: (props) => <IconH6 {...props} stroke={1.5} />,
	isActive: { name: "heading", attributes: { level: 6 } },
	operation: { name: "toggleHeading", attributes: { level: 6 } },
});

export const BlockquoteControl = createTiptapControl({
	label: "blockquoteControlLabel",
	icon: (props) => <IconBlockquote {...props} stroke={1.5} />,
	isActive: { name: "blockquote" },
	operation: { name: "toggleBlockquote" },
});

export const AlignLeftControl = createTiptapControl({
	label: "alignLeftControlLabel",
	icon: (props) => <IconAlignLeft {...props} stroke={1.5} />,
	operation: { name: "setTextAlign", attributes: "left" },
});

export const AlignRightControl = createTiptapControl({
	label: "alignRightControlLabel",
	icon: (props) => <IconAlignRight {...props} stroke={1.5} />,
	operation: { name: "setTextAlign", attributes: "right" },
});

export const AlignCenterControl = createTiptapControl({
	label: "alignCenterControlLabel",
	icon: (props) => <IconAlignCenter {...props} stroke={1.5} />,
	operation: { name: "setTextAlign", attributes: "center" },
});

export const AlignJustifyControl = createTiptapControl({
	label: "alignJustifyControlLabel",
	icon: (props) => <IconAlignJustified {...props} stroke={1.5} />,
	operation: { name: "setTextAlign", attributes: "justify" },
});

export const SubscriptControl = createTiptapControl({
	label: "subscriptControlLabel",
	icon: (props) => <IconSubscript {...props} stroke={1.5} />,
	isActive: { name: "subscript" },
	operation: { name: "toggleSubscript" },
});

export const SuperscriptControl = createTiptapControl({
	label: "superscriptControlLabel",
	icon: (props) => <IconSuperscript {...props} stroke={1.5} />,
	isActive: { name: "superscript" },
	operation: { name: "toggleSuperscript" },
});

export const CodeControl = createTiptapControl({
	label: "codeControlLabel",
	icon: (props) => <IconCode {...props} stroke={1.5} />,
	isActive: { name: "code" },
	operation: { name: "toggleCode" },
});

export const CodeBlockControl = createTiptapControl({
	label: "codeBlockControlLabel",
	icon: (props) => <IconCode {...props} stroke={1.5} />,
	isActive: { name: "codeBlock" },
	operation: { name: "toggleCodeBlock" },
});

export const HighlightControl = createTiptapControl({
	label: "highlightControlLabel",
	icon: (props) => <IconHighlight {...props} stroke={1.5} />,
	isActive: { name: "highlight" },
	operation: { name: "toggleHighlight" },
});

export const HrControl = createTiptapControl({
	label: "hrControlLabel",
	icon: (props) => <IconLineDashed {...props} stroke={1.5} />,
	operation: { name: "setHorizontalRule" },
});

export const UnsetColorControl = createTiptapControl({
	label: "unsetColorControlLabel",
	icon: (props) => <IconCircleOff {...props} stroke={1.5} />,
	operation: { name: "unsetColor" },
});

export const ImageControl = createTiptapControl({
	label: "ImageControlLabel",
	icon: (props) => <IconPhoto {...props} stroke={1.5} />,
	operation: { name: "uploadImage", attributes: {} },
});

export const TableControl = createTiptapControl({
	label: "TableControlLabel",
	icon: (props) => <IconTable {...props} stroke={1.5} />,
	operation: {
		name: "insertTable",
		attributes: { rows: 3, cols: 3, withHeaderRow: true },
	},
});
