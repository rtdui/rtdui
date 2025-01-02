import { forwardRef } from "react";
import clsx from "clsx";

export interface ControlBaseProps
	extends React.ComponentPropsWithoutRef<"button"> {
	/** Icon component, should support size prop */
	icon?: React.FC<{ size: number | string }>;
	/** Determines whether the control should have active state, false by default */
	active?: boolean;

	/** Determines whether the control can be interacted with, set false to make the control to act as a label */
	interactive?: boolean;
}

export const ControlBase = forwardRef<HTMLButtonElement, ControlBaseProps>(
	(props, ref) => {
		const {
			className,
			active,
			icon: Icon,
			interactive = true,
			...others
		} = props;
		return (
			<button
				type="button"
				className={clsx("join-item", "btn btn-sm btn-square", {
					"btn-active": active,
					"btn-disabled": !interactive,
				})}
				data-tiptap-control
				tabIndex={interactive ? 0 : -1}
				aria-pressed={(active && interactive) || undefined}
				aria-hidden={!interactive || undefined}
				ref={ref}
				{...others}
			>
				{Icon && <Icon size="20px" />}
			</button>
		);
	},
);

ControlBase.displayName = "@rtdui/ControlBase";
