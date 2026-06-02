import clsx from "clsx";

export interface ComboboxFooterProps extends React.ComponentProps<"div"> {}

export function ComboboxFooter(props: ComboboxFooterProps) {
  const { ref, className, ...others } = props;

  return <div ref={ref} className={clsx("footer", className)} {...others} />;
}
