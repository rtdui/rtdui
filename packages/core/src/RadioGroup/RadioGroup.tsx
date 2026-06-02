import clsx from "clsx";
import { useUncontrolled } from "@rtdui/hooks";
import { RadioGroupContext } from "./context";
import type { ThemeBaseSize } from "../theme.types";

export interface RadioGroupProps
  extends Omit<
    React.ComponentProps<"input">,
    "value" | "defaultValue" | "onChange" | "size"
  > {
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  size?: ThemeBaseSize;
  label?: string;
  helperText?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  slots?: {
    label?: string;
    helperText?: string;
    groups?: string;
  };
}

/** ref属性会转发至内部的input元素 */
export function RadioGroup(props: RadioGroupProps) {
  const {
    ref,
    required,
    label,
    helperText,
    color: colorProp,
    size: sizeProp = "sm",
    name: nameProp,
    defaultValue: defaultValueProp,
    value: valueProp,
    onChange,
    disabled,
    className,
    children,
    slots,
    ...other
  } = props;

  const [value, setValue] = useUncontrolled({
    value: valueProp,
    defaultValue: defaultValueProp,
    finalValue: "",
    onChange,
  });

  const contextValue = {
    name: nameProp,
    value,
    onChange(e: React.ChangeEvent<HTMLInputElement>) {
      setValue(e.target.value);
    },
    size: sizeProp,
    color: colorProp,
    disabled,
  };

  return (
    <RadioGroupContext value={contextValue}>
      <div className={clsx("flex flex-col gap-2", className)}>
        {label && (
          <span
            className={clsx(
              {
                "text-gray-400": disabled,
              },
              slots?.label,
            )}
          >
            {label}
          </span>
        )}
        <div
          className={clsx(
            "flex flex-col gap-1 justify-items-center",
            slots?.groups,
          )}
        >
          {children}
        </div>
        {helperText && (
          <span className={clsx("label-text-alt pt-0.5", slots?.helperText)}>
            {helperText}
          </span>
        )}
      </div>
    </RadioGroupContext>
  );
}
