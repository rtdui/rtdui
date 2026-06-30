import clsx from "clsx";
import { type ComboboxData, getParsedComboboxData } from "../Combobox";
import { NativeSelectOption } from "./NativeSelectOption";
import { ThemeBaseSize, ThemeSemanticColor } from "../theme.types";

export interface NativeSelectProps extends Omit<
  React.ComponentProps<"select">,
  "size"
> {
  size?: ThemeBaseSize;
  color?: ThemeSemanticColor;
  ghost?: boolean;
  data?: ComboboxData;
}

export function NativeSelect(props: NativeSelectProps) {
  const { ref, size, color, ghost, data, className, children, ...others } =
    props;

  const options = getParsedComboboxData(data).map((item, index) => (
    <NativeSelectOption key={index} data={item} />
  ));

  return (
    <select
      ref={ref}
      {...others}
      className={clsx(
        "select",
        {
          "select-xs": size === "xs",
          "select-sm": size === "sm",
          "select-lg": size === "lg",
          "select-xl": size === "xl",

          "select-neutral": color === "neutral",
          "select-primary": color === "primary",
          "select-secondary": color === "secondary",
          "select-accent": color === "accent",
          "select-info": color === "info",
          "select-warning": color === "warning",
          "select-success": color === "success",
          "select-error": color === "error",

          "select-ghost": !!ghost,
        },
        className,
      )}
    >
      {children || options}
    </select>
  );
}
