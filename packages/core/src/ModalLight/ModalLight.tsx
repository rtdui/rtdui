import clsx from "clsx";
import { forwardRef, useId } from "react";

export interface ModalLightProps
	extends Omit<React.ComponentPropsWithoutRef<"dialog">, "title"> {
	/** Modal title */
	title?: React.ReactNode;
	/** Determines whether the close button should be rendered
	 * @default true
	 */
	withCloseButton?: boolean;
	/** 是否点击外部关闭
	 * @default true
	 */
	outsideClickClose?: boolean;
	/** Determines whether the modal should be full screen
	 * @default false
	 */
	fullScreen?: boolean;
	/** 显示位置
	 * @default "middle"
	 */
	position?: "top" | "middle" | "bottom" | "start" | "end";

	/** Modal content */
	children?: React.ReactNode;
}

export const ModalLight = forwardRef<HTMLDialogElement, ModalLightProps>(
	(props, ref) => {
		const {
			title,
			withCloseButton = true,
			outsideClickClose = true,
			fullScreen,
			position,
			children,
			className,
			onClose,
		} = props;

		const id = useId();

		return (
			<dialog
				id={id}
				ref={ref}
				className={clsx(
					"modal",
					{
						"modal-top": position === "top",
						"modal-middle": position === "middle",
						"modal-bottom": position === "bottom",
						"modal-start": position === "start",
						"modal-end": position === "end",
					},
					className,
				)}
				onClose={onClose}
			>
				<div
					className={clsx("modal-box p-0", {
						"max-w-dvw w-dvw h-dvh": fullScreen,
					})}
				>
					<div className="modal-title px-6 py-4 bg-base-100 sticky top-0">
						{withCloseButton && (
							<form method="dialog">
								{/* if there is a button in form, it will close the modal */}
								<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
									✕
								</button>
							</form>
						)}
						{title && <h3 className="font-bold text-lg">{title}</h3>}
					</div>
					<div className="modal-content px-8">{children}</div>
					<div className="modal-action mt-0 bg-base-100 sticky bottom-0 p-4">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn">Close</button>
						</form>
					</div>
				</div>
				{outsideClickClose && (
					<form method="dialog" className="modal-backdrop">
						<button>close</button>
					</form>
				)}
			</dialog>
		);
	},
);

ModalLight.displayName = "@rtdui/core/ModalLight";
