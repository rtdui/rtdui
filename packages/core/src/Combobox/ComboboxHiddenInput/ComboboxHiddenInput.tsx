export interface ComboboxHiddenInputProps
  extends Omit<React.ComponentProps<"input">, "value"> {
  /** Input value */
  value: string | string[] | null;

  /** Divider character that is used to transform array values to string, `','` by default */
  valuesDivider?: string;
}

export function ComboboxHiddenInput(props: ComboboxHiddenInputProps) {
  const { value, valuesDivider = ",", ...others } = props;
  return (
    <input
      type="hidden"
      value={Array.isArray(value) ? value.join(valuesDivider) : value || ""}
      {...others}
    />
  );
}
