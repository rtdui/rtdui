import clsx from "clsx";

export interface ComboboxHeaderProps extends React.ComponentProps<"div"> {}

export function ComboboxHeader(props: ComboboxHeaderProps) {
  const { ref, className, ...others } = props;

  return <div ref={ref} className={clsx("header", className)} {...others} />;
}
