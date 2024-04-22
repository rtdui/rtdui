import { forwardRef } from "react";
import clsx from "clsx";
import { useInputWrapperContext } from "../context";
import { ThemeSize } from "../../theme.types";
import { getSize } from "../../utils";

export interface InputLabelProps
  extends React.ComponentPropsWithoutRef<"label"> {
  /** Determines whether the required asterisk should be displayed  */
  required?: boolean;

  /** Controls label `font-size`, `'sm'` by default */
  size?: ThemeSize;

  /** Root element of the label
   * @default "label"
   */
  labelElement?: "label" | "div";
}

export const InputLabel = forwardRef<
  HTMLLabelElement | HTMLDivElement,
  InputLabelProps
>((props, ref) => {
  const {
    className,
    style,
    size = "sm",
    required,
    htmlFor,
    onMouseDown,
    labelElement = "label",
    children,
    ...others
  } = props;

  const ctx = useInputWrapperContext();

  const LabelElement = labelElement as any;

  return (
    <LabelElement
      ref={ref}
      className={clsx(
        "input-label",
        "text-[length:--input-font-size]",
        className
      )}
      style={
        {
          ...style,
          "--input-font-size": getSize(size, "theme-font-size"),
        } as any
      }
      htmlFor={labelElement === "label" ? htmlFor : undefined}
      data-required={required}
      onMouseDown={(event: any) => {
        onMouseDown?.(event);
        if (!event.defaultPrevented && event.detail > 1) {
          event.preventDefault();
        }
      }}
      {...others}
    >
      {children}
      {required && (
        <span
          className={clsx("input-label-required", "text-red-500 align-middle")}
          aria-hidden
        >
          {" *"}
        </span>
      )}
    </LabelElement>
  );
});

InputLabel.displayName = "@rtdui/core/InputLabel";
