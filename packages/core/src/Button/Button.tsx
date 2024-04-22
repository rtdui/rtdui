import { forwardRef } from "react";
import clsx from "clsx";

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "size"> {
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "neutral";
  /** 尺寸大小 */
  size?: "xs" | "sm" | "md" | "lg";
  /** 矩形或圆形, 用于单字符或图标 */
  sharp?: "square" | "circle";
  /** 无边框和背景 */
  ghost?: boolean;
  /** link样式的按钮 */
  link?: boolean;
  /** 毛玻璃效果,需要有背景才有效果 */
  glass?: boolean;
  /** full width */
  block?: boolean;
  /** 更多的水平padding */
  wide?: boolean;
  /** 边框按钮 */
  outline?: boolean;
  /** 左侧图标元素 */
  startIcon?: React.ReactNode;
  /** 右侧图标元素 */
  endIcon?: React.ReactNode;
  /** 是否在左侧显示加载动画图标 */
  loading?: boolean;
  /** 无点击动画 */
  noAnimation?: boolean;
}

// 默认导出forwardRef组件必须要有JSDoc注释, 否则会被文档生成器忽略
/** ref属性会转发至button元素 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      color,
      size,
      sharp,
      ghost,
      link,
      glass,
      block,
      wide,
      noAnimation,
      outline,
      startIcon,
      endIcon,
      className,
      children,
      ...other
    } = props;

    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          "btn",
          {
            "btn-primary": color === "primary",
            "btn-secondary": color === "secondary",
            "btn-accent": color === "accent",
            "btn-info": color === "info",
            "btn-success": color === "success",
            "btn-warning": color === "warning",
            "btn-error": color === "error",
            "btn-neutral": color === "neutral",
            "btn-xs": size === "xs",
            "btn-sm": size === "sm",
            "btn-md": size === "md",
            "btn-lg": size === "lg",
            "btn-square": sharp === "square",
            "btn-circle": sharp === "circle",
            "btn-ghost": ghost === true,
            "btn-link normal-case": link === true,
            glass: glass === true,
            "btn-block": block === true,
            "btn-wide": wide === true,
            "btn-outline": outline,
            "no-animation": noAnimation,
          },
          className
        )}
        {...other}
      >
        {startIcon}
        {children}
        {endIcon}
      </button>
    );
  }
);

Button.displayName = "@rtdui/Button";
