import { forwardRef } from "react";
import clsx from "clsx";

export interface LoadingProps {
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "neutral";
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * @default spinner
   */
  variant?: "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";
}
export const Loading = forwardRef<HTMLSpanElement, LoadingProps>(
  (props, ref) => {
    const { size, color, variant = "spinner" } = props;

    return (
      <span
        ref={ref}
        className={clsx("loading ", {
          "text-primary": color === "primary",
          "text-secondary": color === "secondary",
          "text-accent": color === "accent",
          "text-info": color === "info",
          "text-success": color === "success",
          "text-warning": color === "warning",
          "text-error": color === "error",
          "text-neutral": color === "neutral",
          "loading-xs": size === "xs",
          "loading-sm": size === "sm",
          "loading-md": size === "md",
          "loading-lg": size === "lg",
          "loading-spinner": variant === "spinner",
          "loading-dots": variant === "dots",
          "loading-ring": variant === "ring",
          "loading-ball": variant === "ball",
          "loading-bars": variant === "bars",
          "loading-infinity": variant === "infinity",
        })}
      />
    );
  }
);

Loading.displayName = "@rtdui/Loading";
