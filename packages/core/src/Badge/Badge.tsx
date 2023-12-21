import React from "react";
import clsx from "clsx";
import { Box, BoxProps, PolymorphicComponentProps } from "../Polymorphic";

// Component-specific props should be specified separately
export type BadgeOwnProps = {
  /** theme color */
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "neutral";
  /** 尺寸大小
   *  @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg";
  /** no background and no border */
  ghost?: boolean;
  /** border without background */
  outline?: boolean;
  icon?: React.ReactNode;
};

// Merge own props with others inherited from the underlying element type
export type BadgeProps<E extends React.ElementType> = PolymorphicComponentProps<
  E,
  BadgeOwnProps
>;

// An HTML tag or a different React component can be rendered by default
const defaultElement = "span";

/** 多态组件, ref会转发给实际的组件 */
export const Badge: <E extends React.ElementType = typeof defaultElement>(
  props: BadgeProps<E>
) => React.ReactNode = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    props: BadgeProps<E>,
    ref: typeof props.ref
  ) => {
    const {
      color,
      size = "md",
      icon,
      ghost,
      outline,
      className,
      children,
      ...other
    } = props;

    const boxProps = other as BoxProps<E>;

    return (
      <Box
        as={defaultElement}
        ref={ref}
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
        {...boxProps}
      >
        {icon &&
          React.isValidElement(icon) &&
          React.cloneElement<any>(icon, {
            size:
              size === "xs" ? 12 : size === "sm" ? 14 : size === "md" ? 16 : 18,
          })}
        {children}
      </Box>
    );
  }
);
