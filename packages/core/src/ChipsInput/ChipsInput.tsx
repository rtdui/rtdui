import { useRef } from "react";
import clsx from "clsx";
import { ChipsInputContext } from "./context";
import { ChipsInputField } from "./ChipsInputField";
import { InputBase, type InputBaseOwnProps } from "../InputBase";

export interface ChipsInputProps
  extends InputBaseOwnProps, React.ComponentProps<"div"> {}

export function ChipsInput(props: ChipsInputProps) {
  const {
    ref,
    children,
    onMouseDown,
    onClick,
    size,
    disabled,
    error,
    variant,
    ...others
  } = props;

  const fieldRef = useRef<HTMLInputElement>(null);

  return (
    <ChipsInputContext
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
    </ChipsInputContext>
  );
}

ChipsInput.Field = ChipsInputField;
