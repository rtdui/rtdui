import { createOptionalContext } from "../utils";

export interface RadioGroupContextValue {
  name: string | undefined;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   *
   * @default sm
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
}

export const [RadioGroupProvider, useRadioGroupContext] =
  createOptionalContext<RadioGroupContextValue>();
