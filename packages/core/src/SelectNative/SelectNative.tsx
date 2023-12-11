import clsx from "clsx";
import React from "react";

export interface SelectNativeProps
  extends Omit<React.ComponentPropsWithoutRef<"select">, "size"> {
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
  bordered?: boolean;
  placeholder?: string;
  label?: string;
  helperText?: string;
  leftSection?: React.ReactNode;
  leftSectionWidth?: number;
  rightSection?: React.ReactNode;
  rightSectionWidth?: number;
  error?: boolean;
  slots?: {
    select?: string;
    left?: string;
    right?: string;
    label?: string;
    helperText?: string;
  };
}

export const SelectNative = React.forwardRef<
  HTMLSelectElement,
  SelectNativeProps
>((props, ref) => {
  const {
    required,
    color,
    size = "sm",
    ghost,
    bordered,
    placeholder,
    label,
    helperText,
    leftSection,
    leftSectionWidth,
    rightSection,
    rightSectionWidth,
    className,
    slots,
    children,
    error,
    ...other
  } = props;

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
            <span className="text-base font-bold text-red-500 ml-0.5">*</span>
          )}
        </label>
      )}
      <div className="relative z-0">
        {leftSection && (
          <div
            className={clsx(
              "absolute left-0 top-0 bottom-0 flex items-center justify-center text-neutral-400",
              slots?.label
            )}
            style={{ width: paddingLeft }}
          >
            {leftSection}
          </div>
        )}
        <select
          ref={ref}
          className={clsx(
            "select font-normal w-full",
            {
              "select-primary": color === "primary",
              "select-secondary": color === "secondary",
              "select-accent": color === "accent",
              "select-info": color === "info",
              "select-success": color === "success",
              "select-warning": color === "warning",
              "select-error": color === "error",
              "select-xs": size === "xs",
              "select-sm": size === "sm",
              "select-md": size === "md",
              "select-lg": size === "lg",
              "select-ghost": ghost === true,
              "select-bordered": bordered === true,
            },
            slots?.select
          )}
          style={{
            paddingLeft,
            paddingRight,
          }}
          {...other}
        >
          <option value="" hidden>
            {placeholder}
          </option>
          {children}
        </select>
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
      {helperText && (
        <label className={clsx("label", slots?.helperText)}>
          <span className="label-text-alt">{helperText}</span>
        </label>
      )}
    </div>
  );
});
