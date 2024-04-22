import { forwardRef } from "react";
import clsx from "clsx";

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<"progress"> {
  /**
   * @default xs
   */
  size?: "xs" | "sm" | "md" | "lg";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  /**
   * @default 100
   */
  max?: number;
  /**
   * 如果未提供, 则会动画进度条表示不确定的状态
   */
  value?: number;
  className?: string;
}
export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
  (props, ref) => {
    const { size, color, max = 100, value, className, children } = props;

    return (
      <progress
        ref={ref}
        max={max}
        value={value}
        className={clsx(
          "progress",
          "w-full",
          {
            "h-2": size === "xs",
            "h-3": size === "sm",
            "h-4": size === "md",
            "h-5": size === "lg",
            "progress-primary": color === "primary",
            "progress-secondary": color === "secondary",
            "progress-accent": color === "accent",
            "progress-info": color === "info",
            "progress-success": color === "success",
            "progress-warning": color === "warning",
            "progress-error": color === "error",
          },
          className
        )}
      />
    );
  }
);

Progress.displayName = "@rtdui/Progress";
