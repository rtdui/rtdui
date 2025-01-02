export type ThemeBaseSize = "xs" | "sm" | "md" | "lg";
export type ThemeSize = ThemeBaseSize | "xl" | string;
export type ThemeRadius = ThemeBaseSize | "xl" | "circle" | string;
export type ThemeShadow = ThemeBaseSize | "xl" | "2xl";
export type ThemeColor =
	| "primary"
	| "secondary"
	| "accent"
	| "info"
	| "success"
	| "warning"
	| "error"
	| "neutral"
	| "base1"
	| "base2"
	| "base3"
	| string;

export type ThemeBreakpoint = ThemeBaseSize | "base" | "xl" | "2xl" | string;

export type ThemeMask =
	| "squircle"
	| "heart"
	| "hexagon"
	| "hexagon-2"
	| "decagon"
	| "pentagon"
	| "diamond"
	| "square"
	| "circle"
	| "parallelogram"
	| "parallelogram-2"
	| "parallelogram-3"
	| "parallelogram-4"
	| "star"
	| "star-2"
	| "triangle"
	| "triangle-2"
	| "triangle-3"
	| "triangle-4"
	| "half-1"
	| "half-2";
