import { forwardRef, useEffect, useRef } from "react";
import { Notification, type NotificationProps } from "./Notification";
import { getAutoClose } from "./getAutoClose";
import type { NotificationData } from "./notifications.store";

export interface NotificationContainerProps extends NotificationProps {
	data: NotificationData;
	onHide: (id: string) => void;
	autoClose: false | number;
}

export const NotificationContainer = forwardRef<
	HTMLDivElement,
	NotificationContainerProps
>((props, ref) => {
	const { data, autoClose: autoCloseProp, onHide, ...others } = props;

	const { autoClose, content, ...notificationProps } = data;

	const autoCloseDuration = getAutoClose(autoCloseProp, autoClose!);
	const timerRef = useRef<number>();

	const cancelTimer = () => window.clearTimeout(timerRef.current);

	const handleHide = () => {
		onHide(data.id!);
		data.onClose?.(data);
		cancelTimer();
	};

	const handleAutoClose = () => {
		if (typeof autoCloseDuration === "number") {
			timerRef.current = window.setTimeout(handleHide, autoCloseDuration);
		}
	};

	useEffect(() => {
		if (typeof data.onOpen === "function") {
			data.onOpen?.(data);
		}
	}, []);

	useEffect(() => {
		handleAutoClose();
		return cancelTimer;
	}, [data.autoClose]);

	return (
		<Notification
			{...others}
			{...notificationProps}
			onClose={handleHide}
			onMouseEnter={cancelTimer}
			onMouseLeave={handleAutoClose}
			ref={ref}
		>
			{content}
		</Notification>
	);
});

NotificationContainer.displayName = "@rtdui/NotificationContainer";
