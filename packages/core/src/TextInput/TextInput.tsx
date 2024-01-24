import clsx from "clsx";
import React from "react";

export interface TextInputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  size?: "xs" | "sm" | "md" | "lg";
  ghost?: boolean;
  /**
   * 是否显示边框
   * @default true
   */
  bordered?: boolean;
  placeholder?: string;
  label?: string;
  helperText?: string;
  leftSection?: React.ReactNode;
  leftSectionWidth?: number;
  rightSection?: React.ReactNode;
  rightSectionWidth?: number;
  error?: string;
  /** 可以通过槽为内部组件添加自定义className */
  slots?: {
    input?: string;
    left?: string;
    right?: string;
    label?: string;
    helperText?: string;
  };
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const {
      required,
      color,
      size = "sm",
      ghost,
      bordered = true,
      placeholder,
      label,
      helperText,
      leftSection,
      leftSectionWidth,
      rightSection,
      rightSectionWidth,
      className,
      children,
      error,
      slots,
      ...other
    } = props;

    const hasError = !!error;

    const sizes = {
      xs: "1.5rem",
      sm: "2rem",
      md: "3rem",
      lg: "4rem",
    };

    const getSize = (size: "xs" | "sm" | "md" | "lg") => {
      if (size in sizes) {
        return sizes[size];
      }
      return sizes.md;
    };

    const paddingLeft = leftSection
      ? leftSectionWidth || getSize(size ?? "md")
      : undefined;
    const paddingRight = rightSection
      ? rightSectionWidth || getSize(size ?? "md")
      : undefined;

    return (
      <div className={clsx("form-control", className)}>
        {label && (
          <label className={clsx("label justify-start", slots?.label)}>
            <span className="label-text">{label}</span>
            {required && (
              <span className="label-text font-bold text-red-500 ml-0.5">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative z-0">
          {leftSection && (
            <div
              className={clsx(
                "absolute left-0 top-0 bottom-0 flex items-center justify-center text-neutral-400",
                slots?.left
              )}
              style={{ width: paddingLeft }}
            >
              {leftSection}
            </div>
          )}
          <input
            ref={ref}
            placeholder={placeholder}
            className={clsx(
              "input",
              "w-full",
              "focus:outline-offset-0",
              "focus:outline-1",
              "focus-within:outline-offset-0",
              "focus-within:outline-1",
              {
                "input-primary": color === "primary",
                "input-secondary": color === "secondary",
                "input-accent": color === "accent",
                "input-info": color === "info",
                "input-success": color === "success",
                "input-warning": color === "warning",
                "input-error": color === "error" || hasError,
                "input-xs": size === "xs",
                "input-sm": size === "sm",
                "input-md": size === "md",
                "input-lg": size === "lg",
                "input-ghost": ghost === true,
                "input-bordered": bordered,
              },
              slots?.input
            )}
            style={{
              paddingLeft,
              paddingRight,
            }}
            {...other}
          />
          {rightSection && (
            <div
              className={clsx(
                "absolute right-0 top-0 bottom-0 flex items-center justify-center text-neutral-400",
                slots?.right
              )}
              style={{ width: paddingRight }}
            >
              {rightSection}
            </div>
          )}
        </div>
        {(helperText || hasError) && (
          <label className={clsx("label py-1", slots?.helperText)}>
            {hasError ? (
              <span className="label-text-alt text-error">{error}</span>
            ) : (
              <span className="label-text-alt">{helperText}</span>
            )}
          </label>
        )}
      </div>
    );
  }
);
