import { forwardRef } from "react";
import clsx from "clsx";
import { useModalContext } from "./context";
import { useModalBodyId } from "./use-modal-body-id";

export interface ModalBodyProps extends React.ComponentPropsWithoutRef<"div"> {}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
	(props, ref) => {
		const { className, ...others } = props;
		const bodyId = useModalBodyId();
		const ctx = useModalContext();
		return (
			<div
				ref={ref}
				{...others}
				id={bodyId}
				className={clsx(
					"modal-body",
					"[padding:var(--modal-padding,var(--mantine-spacing-md))]",
					"[&:not(:only-child)]:pt-0",
					className,
				)}
			/>
		);
	},
);

ModalBody.displayName = "@rtdui/core/ModalBody";
