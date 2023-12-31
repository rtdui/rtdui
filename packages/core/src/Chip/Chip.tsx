import React from "react";
import { IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { Button } from "../Button";

export interface ChipProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "size"> {
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "neutral";
  /** 尺寸
   * @default "normal"
   */
  size?: "small" | "normal";
  startIcon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  label?: React.ReactNode;
  onDelete?: (e?: any) => void;
}

/** ref属性会转发至内部的button元素 */
export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (props, ref) => {
    const {
      label,
      color,
      size = "normal",
      className,
      startIcon,
      onClick,
      onDelete,
      deleteIcon,
      children,
      ...other
    } = props;

    return (
      <div
        ref={ref}
        className={clsx(
          "flex flex-nowrap items-center gap-1 px-3 rounded-box bg-base-200 leading-none w-fit",
          size === "small" ? "py-0.5 text-sm" : " py-1 text-base",
          onDelete ? "pr-1" : "pr-3",
          {
            "bg-primary text-primary-content": color === "primary",
            "bg-secondary text-secondary-content": color === "secondary",
            "bg-accent text-accent-content": color === "accent",
            "bg-info text-info-content": color === "info",
            "bg-success text-success-content": color === "success",
            "bg-warning text-warning-content": color === "warning",
            "bg-error text-error-content": color === "error",
            "bg-neutral text-neutral-content": color === "neutral",
            "cursor-pointer": onClick,
          },
          className
        )}
        onClick={onClick}
        {...other}
      >
        {startIcon}
        {label}
        {onDelete && (
          <Button
            className={clsx("min-h-0 p-0 rounded-full", {
              "w-5 h-5": size === "normal",
              "w-4 h-4": size === "small",
            })}
            color={color}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            {deleteIcon || (
              <IconX
                size={size === "small" ? 12 : 14}
                stroke={size === "small" ? 3 : 2.5}
              />
            )}
          </Button>
        )}
      </div>
    );
  }
);
