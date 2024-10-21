import Color, { type ColorTypes } from "colorjs.io";
import type { ColorFormat, HsvaColor } from "./types";

/** 给定的颜色是否是浅色 */
export function isLightColor(colorLike: ColorTypes) {
  //@ts-expect-error 参数个数问题
  const color = new Color(colorLike);
  const onWhite = Math.abs(color.contrast("white", "APCA"));
  const onBlack = Math.abs(color.contrast("black", "APCA"));

  // onBlack > onWhite 说明背景为浅色, 反之背景为深色
  return onBlack > onWhite;
}

/**
 * 得到给定颜色的高度比颜色
 *
 * 注意无法得到背景色为css变量的高度比颜色
 * @param colorLike 给定的颜色,可以是任意合法的CSS颜色格式
 * @param lightColor 当给定颜色为深色时返回的高度比颜色. 默认值: "white"
 * @param darkColor 当给定颜色为浅色时返回的高度比颜色. 默认值: "black"
 * @returns
 */
export function getTextColor(
  colorLike: ColorTypes,
  lightColor = "white",
  darkColor = "black"
) {
  return isLightColor(colorLike) ? darkColor : lightColor;
}

/** 色彩空间与格式之间的映射 */
const formatMapping = {
  srgb: ["rgb", "hex"],
  hwb: ["hwb"],
  hsl: ["hsl"],
  lab: ["lab"],
  lch: ["lch"],
  oklch: ["oklch"],
  oklab: ["oklab"],
};

/** 从格式中获取色彩空间 */
export function getSpaceFromFormat(colorFormat: ColorFormat) {
  if (colorFormat === "color") {
    return;
  }
  const item = Object.entries(formatMapping).find(([, f]) =>
    f.includes(colorFormat)
  );

  if (item) {
    return item[0];
  } else {
    throw new Error(`${colorFormat} is not a valid color format`);
  }
}
/** 转换颜色到任意格式 */
export function convertTo(format: ColorFormat, colorLike: ColorTypes) {
  const space = getSpaceFromFormat(format);
  if (space) {
    //@ts-expect-error 参数个数问题
    return new Color(colorLike).to(space).toString({ format });
  }
  throw new Error(`${format} is not a valid color format`);
}

/** 解析任意颜色格式 */
export function parseColor(colorLike: ColorTypes) {
  //@ts-expect-error 参数个数问题
  return new Color(colorLike);
}

export function convertHsvaTo(format: ColorFormat, color: HsvaColor) {
  if (!color) {
    return "#000000";
  }
  //@ts-expect-error 参数个数问题
  const hsvColor = new Color("hsv", [color.h, color.s, color.v], color.a);
  const space = getSpaceFromFormat(format);
  //@ts-expect-error 方法不存在问题
  return hsvColor.to(space!).toString({ format });
}

export function parseColorToHsva(colorLike: string): HsvaColor {
  try {
    //@ts-expect-error 方法不存在问题
    const hsvColor = parseColor(colorLike).to("hsv");
    return {
      h: isNaN(hsvColor.h) ? 0 : hsvColor.h,
      s: hsvColor.s,
      v: hsvColor.v,
      a: hsvColor.alpha,
    };
  } catch (error) {
    return { h: 0, s: 0, v: 0, a: 1 };
  }
}

/** 是否是合法的颜色 */
export function isColorValid(colorLike: ColorTypes) {
  try {
    //@ts-expect-error 参数个数问题
    new Color(colorLike);
    return true;
  } catch (error) {
    return false;
  }
}

/** 是否是合法颜色和格式 */
export function isColorFormatValid(colorLike: ColorTypes, format: ColorFormat) {
  return isColorValid(colorLike) && isFormatValid(format);
}

const allColorFormat: ColorFormat[] = [
  "hex",
  "rgb",
  "hsl",
  "hwb",
  "lab",
  "oklab",
  "lch",
  "oklch",
  "color",
];

export function getAllColorFormat() {
  return allColorFormat;
}

export function isFormatValid(format: ColorFormat) {
  return allColorFormat.includes(format);
}
