import React, { CSSProperties, forwardRef } from "react";
import clsx from "clsx";
import { useInputWrapperContext } from "./context";
import { InputDescription } from "./InputDescription/InputDescription";
import { InputError } from "./InputError/InputError";
import { InputLabel } from "./InputLabel/InputLabel";
import { InputPlaceholder } from "./InputPlaceholder/InputPlaceholder";
import { InputWrapper } from "./InputWrapper/InputWrapper";
import { Box, BoxProps, PolymorphicComponentProps } from "../Polymorphic";
import { ThemeColor, ThemeRadius, ThemeSize } from "../theme.types";
import { getRadius, getSize } from "../utils";

export interface InputOwnProps {
  /** Content section rendered on the left side of the input */
  leftSection?: React.ReactNode;

  /** Left section width, used to set `width` of the section and input `padding-left`, by default equals to the input height */
  leftSectionWidth?: CSSProperties["width"];

  /** Sets `pointer-events` styles on the `rightSection` element
   * @default "none"
   */
  leftSectionPointerEvents?: React.CSSProperties["pointerEvents"];

  /** Content section rendered on the right side of the input */
  rightSection?: React.ReactNode;

  /** Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height */
  rightSectionWidth?: CSSProperties["width"];

  /** Sets `pointer-events` styles on the `rightSection` element
   * @default "none"
   */
  rightSectionPointerEvents?: React.CSSProperties["pointerEvents"];

  /** Props passed down to the root element of the `Input` component */
  wrapperProps?: Record<string, any>;

  /** Sets `required` attribute on the `input` element */
  required?: boolean;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem
   * @default "md"
   */
  radius?: ThemeRadius;

  /** Sets `disabled` attribute on the `input` element */
  disabled?: boolean;

  /** Controls input `height` and horizontal `padding`
   * @default "sm"
   */
  size?: ThemeSize;

  /** Determines whether the input should have `cursor: pointer` style
   * @default false
   */
  pointer?: boolean;

  /** Determines whether the input should have red border and red text color when the `error` prop is set
   * @default true
   */
  withErrorStyles?: boolean;

  /** Determines whether the input should have error styles and `aria-invalid` attribute */
  error?: React.ReactNode;

  /** Determines whether the input can have multiple lines, for example when `component="textarea"`
   * @default false
   */
  multiline?: boolean;

  /** Determines whether `aria-` and other accessibility attributes should be added to the input
   * @default true
   */
  withAria?: boolean;

  /** input variant
   * @default "outline"
   */
  variant?: "outline" | "default" | "ghost";

  color?: ThemeColor;

  slots?: {
    left?: string;
    input?: string;
    right?: string;
  };
}

// Merge own props with others inherited from the underlying element type
export type InputProps<E extends React.ElementType> = PolymorphicComponentProps<
  E,
  InputOwnProps
>;

const defaultElement = "input";

/** 多态组件 */
export const Input_: <E extends React.ElementType = typeof defaultElement>(
  props: InputProps<E>
) => React.ReactNode =
  forwardRef(
    <E extends React.ElementType = typeof defaultElement>(
      props: InputProps<E>,
      ref: typeof props.ref
    ) => {
      const {
        className,
        style,
        required,
        size = "sm",
        radius = "md",
        wrapperProps,
        error,
        disabled,
        leftSection,
        leftSectionWidth,
        leftSectionPointerEvents = "none",
        rightSection,
        rightSectionWidth,
        rightSectionPointerEvents = "none",
        variant = "outline",
        pointer = false,
        multiline = false,
        id,
        withAria = true,
        withErrorStyles = true,
        color,
        slots,
        ...others
      } = props;

      const boxProps = others as BoxProps<E>;

      const ctx = useInputWrapperContext();

      const ariaAttributes = withAria
        ? {
            required,
            disabled,
            "aria-invalid": !!error,
            "aria-describedby": ctx?.describedBy,
            id: ctx?.inputId || id,
          }
        : {};

      return (
        <div
          {...wrapperProps}
          className={clsx("input-container", "relative", className)}
          data-error={!!error && withErrorStyles}
          data-disabled={disabled}
          data-multiline={multiline}
          data-with-right-section={!!rightSection}
          data-with-left-section={!!leftSection}
          style={{
            ...style,
            "--input-height-xs": "24px",
            "--input-height-sm": "32px",
            "--input-height-md": "48px",
            "--input-height-lg": "64px",
            "--input-height-xl": "80px",
            "--input-height": getSize(size, "input-height"),
            "--input-size": multiline ? "auto" : getSize(size, "input-height"),
            "--input-padding-left": leftSectionWidth
              ? leftSectionWidth
              : leftSection
                ? "var(--input-height)"
                : "12px",
            "--input-padding-right": rightSectionWidth
              ? rightSectionWidth
              : rightSection
                ? "var(--input-height)"
                : "12px",
            "--input-radius": getRadius(radius),
          }}
        >
          {leftSection && (
            <div
              data-position="left"
              className={clsx(
                "input-sctioin-left",
                "absolute top-0 bottom-0 left-0",
                "flex justify-center items-center",
                "w-[--input-left-section-width]",
                "pointer-events-none",
                {
                  "[&]:pointer-events-auto":
                    leftSectionPointerEvents === "auto" && !disabled,
                },
                slots?.left
              )}
              style={
                {
                  ...style,
                  "--input-left-section-width": leftSectionWidth
                    ? leftSectionWidth
                    : "var(--input-height)",
                } as any
              }
            >
              {leftSection}
            </div>
          )}

          <Box
            as={defaultElement}
            ref={ref}
            {...boxProps}
            {...ariaAttributes}
            required={required}
            data-disabled={disabled}
            data-error={!!error && withErrorStyles}
            className={clsx(
              "input-input",
              "input w-full [line-height:normal] focus:outline-offset-0 focus:outline-1 focus-within:outline-offset-0 focus-within:outline-1",
              "text-[length:--input-font]",
              "w-full h-[--input-size] py-1.5",
              "[&]:pl-[--input-padding-left]",
              "[&]:pr-[--input-padding-right]",
              "[&]:rounded-[--input-radius]",
              "min-h-[--input-height]",
              {
                "input-primary": color === "primary",
                "input-secondary": color === "secondary",
                "input-accent": color === "accent",
                "input-info": color === "info",
                "input-success": color === "success",
                "input-warning": color === "warning",
                "input-error": color === "error" || !!error,
                "input-bordered": variant === "outline",
                "input-ghost": variant === "ghost",
                "cursor-pointer": pointer,
                "text-error": !!error,
                "placeholder:text-error": !!error,
                "input-disabled": disabled,
              },
              slots?.input
            )}
            style={{
              "--input-font": getSize(size, "theme-font-size"),
              resize: "var(--input-resize,none)",
            }}
          />

          {rightSection && (
            <div
              data-position="right"
              className={clsx(
                "input-section-right",
                "absolute top-0 bottom-0 right-0",
                "flex justify-center items-center",
                "w-[--input-right-section-width]",
                "pointer-events-none",
                {
                  "[&]:pointer-events-auto":
                    rightSectionPointerEvents === "auto" && !disabled,
                },
                slots?.right
              )}
              style={
                {
                  ...style,
                  "--input-right-section-width": rightSectionWidth
                    ? rightSectionWidth
                    : "var(--input-height)",
                } as any
              }
            >
              {rightSection}
            </div>
          )}
        </div>
      );
    }
  );

export const Input = Object.assign(Input_, {
  Wrapper: InputWrapper,
  Label: InputLabel,
  Error: InputError,
  Description: InputDescription,
  Placeholder: InputPlaceholder,
});
