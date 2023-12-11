import clsx from "clsx";
import React from "react";

export interface BadgeProps extends React.ComponentPropsWithoutRef<"div"> {
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "neutral";
  /**
   * @default md
   */
  size?: "xs" | "sm" | "md" | "lg";
  ghost?: boolean; // 无边框和背景
  outline?: boolean; // border without background
  icon?: React.ReactNode;
  as?: React.ElementType;
}
export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (props, ref) => {
    const {
      color,
      size = "md",
      icon,
      ghost,
      outline,
      as: Component = "span",
      className,
      children,
      ...other
    } = props;

    return (
      <Component
        className={clsx(
          "badge",
          {
            "badge-primary": color === "primary",
            "badge-secondary": color === "secondary",
            "badge-accent": color === "accent",
            "badge-info": color === "info",
            "badge-success": color === "success",
            "badge-warning": color === "warning",
            "badge-error": color === "error",
            "badge-neutral": color === "neutral",
            "badge-xs": size === "xs",
            "badge-sm": size === "sm",
            // "badge-md": size === "md", //默认
            "badge-lg": size === "lg",
            "badge-ghost": ghost === true,
            "badge-outline": outline === true,
          },
          className
        )}
      >
        {icon &&
          React.isValidElement(icon) &&
          React.cloneElement<any>(icon, {
            size:
              size === "xs" ? 12 : size === "sm" ? 14 : size === "md" ? 16 : 18,
          })}
        {children}
      </Component>
    );
  }
);
