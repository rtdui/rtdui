import { forwardRef } from "react";
import clsx from "clsx";
import { useModalContext } from "./context";
import { useModalTitle } from "./use-modal-title-id";

export interface ModalTitleProps extends React.ComponentPropsWithoutRef<"h2"> {}

export const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  (props, ref) => {
    const { className, children, ...others } = props;
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
);

ModalTitle.displayName = "@rtdui/core/ModalTitle";
