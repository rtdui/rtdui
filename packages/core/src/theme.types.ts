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
