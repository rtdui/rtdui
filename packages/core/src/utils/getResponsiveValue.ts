import type { ThemeBreakpoint } from "../theme.types";

/**
 * 默认的Tailwindcss的断点
 * Breakpoint   Minimum_width     CSS
 * sm           640px             @media (min-width: 640px) { ... }
 * md           768px             @media (min-width: 768px) { ... }
 * lg           1024px            @media (min-width: 1024px) { ... }
 * xl           1280px            @media (min-width: 1280px) { ... }
 * 2xl          1536px            @media (min-width: 1536px) { ... }
 */

/**
 * @example {xs: abc, sm: xyz, "2xl": aaa}
 */
export type BreakpointsValues = Record<ThemeBreakpoint, string>;
export type Breakpoint = keyof BreakpointsValues;

export type ResponsiveProp<TValue> =
	| TValue
	| Partial<Record<Breakpoint | string, TValue>>;

export function getBreakpoints() {
	return {
		sm: 640,
		md: 768,
		lg: 1024,
		xl: 1280,
		"2xl": 1536,
	};
}

export function getBreakpointValue(breakpoint: number | string) {
	switch (breakpoint) {
		case "sm":
			return 640;
		case "md":
			return 768;
		case "lg":
			return 1024;
		case "xl":
			return 1280;
		case "2xl":
			return 1536;
		default:
			return breakpoint as number;
	}
}

export function getSortedBreakpoints(breakpoints: string[]) {
	const convertedBreakpoints = breakpoints.map((breakpoint) => ({
		value: breakpoint,
		px: getBreakpointValue(breakpoint),
	}));

	convertedBreakpoints.sort((a, b) => a.px - b.px);
	return convertedBreakpoints;
}

export function getResponsiveBaseValue<Value = any>(
	value: ResponsiveProp<Value>,
) {
	if (typeof value === "object" && value !== null) {
		if ("base" in value) {
			return value.base;
		}

		return undefined;
	}

	return value;
}
