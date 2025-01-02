import type {
	FlipOptions,
	InlineOptions,
	ShiftOptions,
	SizeOptions,
} from "@floating-ui/react";

export type PopoverWidth = "target" | React.CSSProperties["width"] | null;

export interface PopoverMiddlewares {
	shift?: boolean | ShiftOptions;
	flip?: boolean | FlipOptions;
	inline?: boolean | InlineOptions;
	size?: boolean | SizeOptions;
}

export type FloatingPlacement = "end" | "start";
export type FloatingSide = "top" | "right" | "bottom" | "left";
export type FloatingPosition =
	| FloatingSide
	| `${FloatingSide}-${FloatingPlacement}`;
export type ArrowPosition = "center" | "side";
export type FloatingStrategy = "absolute" | "fixed";

export interface FloatingAxesOffsets {
	mainAxis?: number;
	crossAxis?: number;
	alignmentAxis?: number | null;
}
