import { randomId, createStore, useStore, type RtdStore } from "@rtdui/hooks";
import { type NotificationProps } from "./Notification";

export interface NotificationData extends Omit<NotificationProps, "onClose"> {
	/** Notification id, can be used to close or update notification */
	id?: string;

	/** Notification message, required for all notifications */
	content: React.ReactNode;

	/** Determines whether notification should be closed automatically,
	 *  number is auto close timeout in ms, overrides `autoClose` from `Notifications`
	 */
	autoClose?: boolean | number;

	/** Called when notification closes */
	onClose?: (data: NotificationData) => void;

	/** Called when notification opens */
	onOpen?: (data: NotificationData) => void;
}

export interface NotificationsState {
	notifications: NotificationData[];
	queue: NotificationData[];
	limit: number;
}

export type NotificationsStore = RtdStore<NotificationsState>;

export const createNotificationsStore = () =>
	createStore<NotificationsState>({
		notifications: [],
		queue: [],
		limit: 5,
	});

export const defaultNotificationsStore = createNotificationsStore();

export const useNotifications = (
	store: NotificationsStore = defaultNotificationsStore,
) => useStore(store);

export function updateNotificationsState(
	store: NotificationsStore,
	update: (notifications: NotificationData[]) => NotificationData[],
) {
	const state = store.getState();
	const notifications = update([...state.notifications, ...state.queue]);

	store.setState({
		notifications: notifications.slice(0, state.limit),
		queue: notifications.slice(state.limit),
		limit: state.limit,
	});
}

export function showNotification(
	notification: NotificationData,
	store: NotificationsStore = defaultNotificationsStore,
) {
	const id = notification.id || randomId();

	updateNotificationsState(store, (notifications) => {
		if (
			notification.id &&
			notifications.some((d) => d.id === notification.id)
		) {
			return notifications;
		}

		return [...notifications, { ...notification, id }];
	});

	return id;
}

export function hideNotification(
	id: string,
	store: NotificationsStore = defaultNotificationsStore,
) {
	updateNotificationsState(store, (notifications) =>
		notifications.filter((d) => {
			if (d.id === id) {
				d.onClose?.(d);
				return false;
			}

			return true;
		}),
	);

	return id;
}

export function updateNotification(
	notification: NotificationData,
	store: NotificationsStore = defaultNotificationsStore,
) {
	updateNotificationsState(store, (notifications) =>
		notifications.map((d) => {
			if (d.id === notification.id) {
				return { ...d, ...notification };
			}

			return d;
		}),
	);

	return notification.id;
}

export function cleanNotifications(
	store: NotificationsStore = defaultNotificationsStore,
) {
	updateNotificationsState(store, () => []);
}

export function cleanNotificationsQueue(
	store: NotificationsStore = defaultNotificationsStore,
) {
	updateNotificationsState(store, (notifications) =>
		notifications.slice(0, store.getState().limit),
	);
}

export const notifications = {
	show: showNotification,
	hide: hideNotification,
	update: updateNotification,
	clean: cleanNotifications,
	cleanQueue: cleanNotificationsQueue,
	updateState: updateNotificationsState,
} as const;
