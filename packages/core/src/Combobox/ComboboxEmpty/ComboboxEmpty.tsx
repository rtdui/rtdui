import clsx from "clsx";

export type ComboboxEmptyStylesNames = "empty";

export interface ComboboxEmptyProps extends React.ComponentProps<"div"> {}

export function ComboboxEmpty(props: ComboboxEmptyProps) {
  const { ref, className, ...others } = props;
  return (
    <div
      ref={ref}
      className={clsx(
        "combobox-option-empty",
        "flex justify-center items-center text-gray-500",
        "p-(--combobox-option-padding)",
        className,
      )}
      {...others}
    />
  );
}
