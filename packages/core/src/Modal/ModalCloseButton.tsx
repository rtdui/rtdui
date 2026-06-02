import clsx from "clsx";
import { useModalContext } from "./context";
import { CloseButton } from "../CloseButton";

export interface ModalCloseButtonProps extends React.ComponentProps<"button"> {}

export function ModalCloseButton(props: ModalCloseButtonProps) {
  const { ref, className, onClick, ...others } = props;
  const ctx = useModalContext();
  return (
    <CloseButton
      ref={ref}
      shape="square"
      {...others}
      onClick={(event) => {
        ctx.onClose();
        onClick?.(event);
      }}
    />
  );
}
