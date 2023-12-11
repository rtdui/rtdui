import clsx from "clsx";
import React from "react";
import { Popover } from "../Popover/Popover";
import {
  type TransitionDuration,
  type TransitionType,
} from "../Transition/transitions";

export interface TooltipProps {
  tip?: string;
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  /** 气泡提示的显示位置 */
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  children: React.ReactNode;
  /** 过渡属性
   * @default "fade"
   */
  transition?: TransitionType;
  /** 过渡时间
   * @default 250
   */
  transitionDuration?: TransitionDuration;
  transitionTimingFunction?: string;
}
export function Tooltip(props: TooltipProps) {
  const { tip, color, position, className, children, ...other } = props;

  return (
    <Popover
      placement={position}
      openOnHover
      openOnFocus
      openOnClick={false}
      {...other}
    >
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Dropdown
        showArrow
        className={clsx(
          "px-2 py-1",
          "rounded",
          "text-sm",
          {
            "bg-neutral text-neutral-content": color === undefined,
            "bg-primary text-primary-content": color === "primary",
            "bg-secondary text-secondary-content": color === "secondary",
            "bg-accent text-accent-content": color === "accent",
            "bg-info text-info-content": color === "info",
            "bg-success text-success-content": color === "success",
            "bg-warning text-warning-content": color === "warning",
            "bg-error text-error-content": color === "error",
          },
          className
        )}
        slots={{
          arrow: clsx({
            "fill-neutral": color === undefined,
            "fill-primary": color === "primary",
            "fill-secondary": color === "secondary",
            "fill-accent": color === "accent",
            "fill-info": color === "info",
            "fill-success": color === "success",
            "fill-warning": color === "warning",
            "fill-error": color === "error",
          }),
        }}
      >
        {tip}
      </Popover.Dropdown>
    </Popover>
  );
}
