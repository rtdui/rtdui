import React, { forwardRef, useRef } from "react";
import clsx from "clsx";
import { ChipsInputProvider } from "./context";
import { ChipsInputField } from "./ChipsInputField/ChipsInputField";
import { InputBase, InputBaseOwnProps } from "../InputBase";

export interface ChipsInputProps
  extends InputBaseOwnProps,
    React.ComponentPropsWithoutRef<"div"> {}

export const ChipsInput_ = forwardRef<HTMLDivElement, ChipsInputProps>(
  (props, ref) => {
    const {
      children,
      onMouseDown,
      onClick,
      size,
      disabled,
      error,
      variant,
      ...others
    } = props;

    const fieldRef = useRef<HTMLInputElement>();

    return (
      <ChipsInputProvider
        value={{ fieldRef, size: size!, disabled, hasError: !!error }}
      >
        <InputBase
          ref={ref}
          as="div"
          size={size}
          error={error}
          variant={variant}
          className={clsx("chips-input")}
          onMouseDown={(e: any) => {
            e.preventDefault();
            onMouseDown?.(e);
            fieldRef.current?.focus();
          }}
          onClick={(e: any) => {
            e.preventDefault();
            onClick?.(e);
            fieldRef.current?.focus();
          }}
          multiline
          disabled={disabled}
          withAria={false}
          {...others}
        >
          {children}
        </InputBase>
      </ChipsInputProvider>
    );
  }
);

ChipsInput_.displayName = "@rtdui/core/ChipsInput";

export const ChipsInput = Object.assign(ChipsInput_, {
  Field: ChipsInputField,
});
