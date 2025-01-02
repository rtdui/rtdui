import type { ColorSpace } from "colorjs.io/fn";

export type ColorFormat =
	| "hex"
	| "rgb"
	| "hsl"
	| "hwb"
	| "lab"
	| "lch"
	| "oklab"
	| "oklch"
	| "color";

//HSV颜色模型作为控制色
export interface HsvaColor {
	h: number;
	s: number;
	v: number;
	a: number;
}

/** available in css */
export interface CssSpaces {
	/** name is a98-rgb in css*/
	a98rgb: ColorSpace;
	hsl: ColorSpace;
	hwb: ColorSpace;
	lab: ColorSpace;
	lch: ColorSpace;
	oklab: ColorSpace;
	oklch: ColorSpace;
	/** name is prophoto-rgb in css */
	prophoto: ColorSpace;
	/** name is display-p3 in css */
	p3: ColorSpace;
	rec2020: ColorSpace;
	srgb: ColorSpace;
	"srgb-linear": ColorSpace;
	"xyz-d50": ColorSpace;
	"xyz-d65": ColorSpace;
	/** aliases of xyz-d65 in css */
	xyz: ColorSpace;
}

export interface SupportedSpaces extends CssSpaces {
	"a98rgb-linear": ColorSpace;
	acescc: ColorSpace;
	acescg: ColorSpace;
	"cam16-jmh": ColorSpace;
	hct: ColorSpace;
	hpluv: ColorSpace;
	hsluv: ColorSpace;
	hsv: ColorSpace;
	ictcp: ColorSpace;
	jzczhz: ColorSpace;
	jzazbz: ColorSpace;
	lchuv: ColorSpace;
	"lab-d65": ColorSpace;
	luv: ColorSpace;
	"p3-linear": ColorSpace;
	"prophoto-linear": ColorSpace;
	"rec2020-linear": ColorSpace;
	rec2100hlg: ColorSpace;
	rec2100pq: ColorSpace;
	"xyz-abs-d65": ColorSpace;
}

export type SpaceId = keyof SupportedSpaces;
