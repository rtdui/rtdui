import React from "react";

export type TransitionDuration = number | { enter?: number; exit?: number };
export interface TransitionStyles {
  common?: React.CSSProperties;
  in: React.CSSProperties;
  out: React.CSSProperties;
  transitionProperty: React.CSSProperties["transitionProperty"];
}

export type TransitionName =
  | "fade"
  | "skew-up"
  | "skew-down"
  | "rotate-right"
  | "rotate-left"
  | "slide-down"
  | "slide-up"
  | "slide-right"
  | "slide-left"
  | "scale-y"
  | "scale-x"
  | "scale"
  | "expand"
  | "expand-x"
  | "expand-y"
  | "pop"
  | "pop-top-left"
  | "pop-top-right"
  | "pop-bottom-left"
  | "pop-bottom-right";

export type TransitionType = TransitionName | TransitionStyles;

const popIn = (from: "top" | "bottom") => ({
  in: { opacity: 1, transform: "scale(1)" },
  out: {
    opacity: 0,
    transform: `scale(.9) translateY(${from === "bottom" ? "10px" : "-10px"})`,
  },
  transitionProperty: "transform, opacity",
});

/** 所有预置的过渡效果 */
export const transitions: Record<TransitionName, TransitionStyles> = {
  fade: {
    in: { opacity: 1 },
    out: { opacity: 0 },
    transitionProperty: "opacity",
  },

  scale: {
    in: { opacity: 1, transform: "scale(1)" },
    out: { opacity: 0, transform: "scale(0)" },
    transitionProperty: "transform, opacity",
  },

  "scale-y": {
    in: { opacity: 1, transform: "scaleY(1)" },
    out: { opacity: 0, transform: "scaleY(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity",
  },

  "scale-x": {
    in: { opacity: 1, transform: "scaleX(1)" },
    out: { opacity: 0, transform: "scaleX(0)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity",
  },

  "skew-up": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: {
      opacity: 0,
      transform: `translateY(-20px) skew(-10deg, -5deg)`,
    },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity",
  },

  "skew-down": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: {
      opacity: 0,
      transform: `translateY(20px) skew(-10deg, -5deg)`,
    },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity",
  },

  "rotate-left": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: `translateY(20px) rotate(-5deg)` },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity",
  },

  "rotate-right": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: `translateY(20px) rotate(5deg)` },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity",
  },

  "slide-down": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(-100%)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity",
  },

  "slide-up": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(100%)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity",
  },

  "slide-left": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(100%)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity",
  },

  "slide-right": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-100%)" },
    common: { transformOrigin: "right" },
    transitionProperty: "transform, opacity",
  },

  expand: {
    in: { opacity: 1, clipPath: "inset(0 0)" },
    out: { opacity: 0, clipPath: "inset(50% 50%)" },
    transitionProperty: "clip-path, opacity",
  },

  "expand-x": {
    in: { opacity: 1, clipPath: "inset(0 0)" },
    out: { opacity: 0, clipPath: "inset(0 50%)" },
    transitionProperty: "clip-path, opacity",
  },

  "expand-y": {
    in: { opacity: 1, clipPath: "inset(0 0)" },
    out: { opacity: 0, clipPath: "inset(50% 0)" },
    transitionProperty: "clip-path, opacity",
  },

  pop: {
    ...popIn("bottom"),
    common: { transformOrigin: "center center" },
  },

  "pop-bottom-left": {
    ...popIn("bottom"),
    common: { transformOrigin: "bottom left" },
  },

  "pop-bottom-right": {
    ...popIn("bottom"),
    common: { transformOrigin: "bottom right" },
  },

  "pop-top-left": {
    ...popIn("top"),
    common: { transformOrigin: "top left" },
  },

  "pop-top-right": {
    ...popIn("top"),
    common: { transformOrigin: "top right" },
  },
};
