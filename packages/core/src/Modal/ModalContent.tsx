import { forwardRef } from "react";
import clsx from "clsx";
import { FocusTrap } from "../FocusTrap";
import { Paper } from "../Paper";
import { Transition, type TransitionProps } from "../Transition";
import { useModalContext } from "./context";
import type { ThemeRadius, ThemeShadow } from "../theme.types";

export interface ModalContentProps
	extends React.ComponentPropsWithoutRef<"div"> {
	/** Props passed down to the `Transition` component */
	transitionProps?: TransitionProps;

	/** Key of `theme.shadows` or any valid CSS value to set `box-shadow`, `none` by default */
	shadow?: ThemeShadow;

	/** Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem, `theme.defaultRadius` by default */
	radius?: ThemeRadius;
	innerProps?: React.ComponentPropsWithoutRef<"div">;
	fullScreen?: boolean;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
	(props, ref) => {
		const {
			transitionProps,
			innerProps = {},
			onKeyDown,
			fullScreen,
			radius,
			style,
			className,
			...others
		} = props;
		const ctx = useModalContext();

		// const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		//   const shouldTrigger =
		//     (event.target as HTMLElement)?.getAttribute('data-rtdui-stop-propagation') !== 'true';
		//   console.log((event.target as HTMLElement)?.getAttribute('data-rtdui-stop-propagation'));
		//   shouldTrigger && event.key === 'Escape' && ctx.closeOnEscape && ctx.onClose();
		//   onKeyDown?.(event);
		// };

		return (
			<Transition
				in={ctx.opened}
				appear={true}
				transition="pop"
				{...ctx.transitionProps}
				{...transitionProps}
			>
				{(_ref, _styles) => (
					<div
						ref={_ref}
						{...innerProps}
						className={clsx(
							"modal-content-wrapper",
							"fixed inset-0 z-[--modal-z-index] pointer-events-none",
							"flex justify-center",
							"py-[--modal-y-offset] px-[--modal-x-offset]",
							{
								"[&]:p-0": fullScreen,
							},
							innerProps.className,
						)}
						style={{ alignItems: "var(--modal-align, flex-start)" }}
					>
						<FocusTrap active={ctx.opened && ctx.trapFocus}>
							<Paper
								as="section"
								{...others}
								role="dialog"
								radius={fullScreen ? "0" : radius}
								padding="0"
								tabIndex={-1}
								aria-modal
								aria-describedby={ctx.bodyMounted ? ctx.getBodyId() : undefined}
								aria-labelledby={
									ctx.titleMounted ? ctx.getTitleId() : undefined
								}
								// onKeyDown={handleKeyDown}
								ref={ref}
								style={{ ...style, ..._styles }}
								className={clsx(
									"modal-content",
									"pointer-events-auto shadow-[var(--modal-shadow,var(--theme-shadow-xl))]",
									"max-w-full max-h-[var(--modal-content-max-height,calc(100dvh-var(--modal-y-offset)*2))] overflow-y-auto",
									"h-[var(--modal-content-height,auto)]",
									{
										"flex-[0_0_var(--modal-size)]": !fullScreen,
										"flex-[0_0_100%]": fullScreen,
									},
									className,
								)}
							>
								{others.children}
							</Paper>
						</FocusTrap>
					</div>
				)}
			</Transition>
		);
	},
);

ModalContent.displayName = "@rtdui/core/ModalContent";
