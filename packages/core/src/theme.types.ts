export type ThemeBaseSize = "xs" | "sm" | "md" | "lg" | "xl"; // button, badge, kbd, table, dock, menu, tabs, loading, radio, checkbox, toggle, input, textarea, select, fileinput, range, rating
export type ThemeSize = ThemeBaseSize | string;
export type ThemeRadius = ThemeBaseSize | "circle" | string;
export type ThemeShadow = ThemeBaseSize | "2xl";
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

export type ThemeBreakpoint = ThemeBaseSize | "base" | "2xl" | string;

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
	| "star"
	| "star-2"
	| "triangle"
	| "triangle-2"
	| "triangle-3"
	| "triangle-4";
