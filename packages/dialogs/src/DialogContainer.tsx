import { forwardRef, useEffect } from "react";
import { Dialog } from "./Dialog";
import { dialogs, type DialogData } from "./dialogs.store";

export interface DialogContainerProps extends DialogData {
	dirtyWarningLabel?: string;
}

export const DialogContainer = forwardRef<HTMLDivElement, DialogContainerProps>(
	(props, ref) => {
		const {
			dirtyWarningLabel,
			// 来源于DialogData的类型定义
			onOpen,
			isDirty,
			content,
			// 来源于DialogProps的类型定义
			dialogId,
			onClose,
			...others
		} = props;

		const handleClose = (result: any) => {
			if (isDirty) {
				dialogs.show({
					title: "提醒",
					mode: "confirm",
					content: dirtyWarningLabel,
					onClose: (result) =>
						result === "ok" ? dialogs.hide(dialogId!) : undefined,
				});
			} else {
				dialogs.hide(dialogId!);
				onClose?.(result);
			}
		};

		useEffect(() => {
			if (typeof onOpen === "function") {
				onOpen?.();
			}
		}, []);

		return (
			<Dialog ref={ref} {...others} onClose={handleClose} dialogId={dialogId}>
				{content}
			</Dialog>
		);
	},
);

DialogContainer.displayName = "@rtdui/DialogContainer";
