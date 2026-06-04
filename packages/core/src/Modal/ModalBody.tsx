import clsx from "clsx";
import { useModalContext } from "./context";
import { useModalBodyId } from "./use-modal-body-id";

export interface ModalBodyProps extends React.ComponentProps<"div"> {}

export function ModalBody(props: ModalBodyProps) {
  const { ref, className, ...others } = props;
  const bodyId = useModalBodyId();
  const ctx = useModalContext();
  return (
    <div
      ref={ref}
      {...others}
      id={bodyId}
      className={clsx(
        "modal-body",
        "p-(--modal-padding,var(--mantine-spacing-md))",
        "not-only:pt-0",
        className,
      )}
    />
  );
}
