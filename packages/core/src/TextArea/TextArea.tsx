import React from "react";
import clsx from "clsx";
import TextareaAutosize from "react-textarea-autosize";

export interface TextAreaProps
  extends Omit<React.ComponentPropsWithoutRef<"textarea">, "size"> {
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
  error?: boolean;

  /** Minimum rows of autosize textarea
   * @default 2
   */
  minRows?: number;
  /** Maximum rows for autosize textarea to grow */
  maxRows?: number;

  slots?: {
    textarea?: string;
    left?: string;
    right?: string;
    label?: string;
    helperText?: string;
  };
}

/** TextArea继承了textarea的所有属性 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      required,
      color,
      size = "sm",
      ghost,
      bordered = true,
      label,
      helperText,
      leftSection,
      leftSectionWidth,
      rightSection,
      rightSectionWidth,
      className,
      children,
      slots,
      error,
      minRows = 2,
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
                slots?.left
              )}
              style={{ width: paddingLeft }}
            >
              {leftSection}
            </div>
          )}
          <TextareaAutosize
            ref={ref}
            minRows={minRows}
            className={clsx(
              "textarea",
              "w-full resize-none min-h-0 leading-normal",
              "focus:outline-offset-0",
              "focus:outline-1",
              "focus-within:outline-offset-0",
              "focus-within:outline-1",
              {
                "textarea-primary": color === "primary",
                "textarea-secondary": color === "secondary",
                "textarea-accent": color === "accent",
                "textarea-info": color === "info",
                "textarea-success": color === "success",
                "textarea-warning": color === "warning",
                "textarea-error": color === "error" || error,
                "textarea-xs": size === "xs",
                "textarea-sm": size === "sm",
                "textarea-md": size === "md",
                "textarea-lg": size === "lg",
                "textarea-ghost": ghost,
                "textarea-bordered": bordered,
              },
              slots?.textarea
            )}
            style={
              {
                paddingLeft,
                paddingRight,
              } as any
            }
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
        {helperText && (
          <label className={clsx("label", slots?.helperText)}>
            <span className="label-text-alt">{helperText}</span>
          </label>
        )}
      </div>
    );
  }
);
