import clsx from "clsx";
import React from "react";
import { Popover } from "../Popover/Popover";
import {
  type TransitionDuration,
  type TransitionType,
} from "../Transition/transitions";
import { useDisclosure } from "@rtdui/hooks";

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
  const {
    tip,
    color = "neutral",
    position,
    transition,
    className,
    children,
    ...other
  } = props;

  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover
      withArrow
      radius="sm"
      position={position}
      transitionProps={{ transition }}
      opened={opened}
      dropdownColor={color}
      {...other}
    >
      <Popover.Target onMouseEnter={open} onMouseLeave={close}>
        {children}
      </Popover.Target>
      <Popover.Dropdown
        className={clsx("px-2 py-1", "rounded", "text-sm", className)}
      >
        {tip}
      </Popover.Dropdown>
    </Popover>
  );
}
