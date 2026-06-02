import clsx from "clsx";
import { useModalContext } from "./context";
import { useModalTitle } from "./use-modal-title-id";

export interface ModalTitleProps extends React.ComponentProps<"h2"> {}

export function ModalTitle(props: ModalTitleProps) {
  const { ref, className, children, ...others } = props;
  const id = useModalTitle();
  const ctx = useModalContext();
  return (
    <h2
      ref={ref}
      className={clsx("modal-title", "font-medium", className)}
      {...others}
      id={id}
    >
      {children}
    </h2>
  );
}
