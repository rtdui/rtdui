import clsx from "clsx";
import { useModalContext } from "./context";

export interface ModalHeaderProps extends React.ComponentProps<"header"> {}

export function ModalHeader(props: ModalHeaderProps) {
  const { ref, className, ...others } = props;
  const ctx = useModalContext();
  return (
    <header
      ref={ref}
      className={clsx(
        "modal-header",
        "flex justify-between items-center min-h-14 p-(--modal-padding,theme-spacing-md)",
        "sticky top-0 z-1000",
        "bg-base-100",
        className,
      )}
      {...others}
    />
  );
}
