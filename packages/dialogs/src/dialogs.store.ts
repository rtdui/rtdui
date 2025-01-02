import { randomId, createStore, useStore, type RtdStore } from "@rtdui/hooks";
import { type DialogProps } from "./Dialog";

export interface DialogData extends Omit<DialogProps, "children"> {
	content: React.ReactNode;
	onOpen?: () => void;
	isDirty?: boolean;
}

export interface DialogsState {
	dialogs: DialogData[];
}

export type DialogsStore = RtdStore<DialogsState>;

export const createDialogsStore = () =>
	createStore<DialogsState>({
		dialogs: [],
	});

export const defaultDialogsStore = createDialogsStore();

export const useDialogs = (store: DialogsStore = defaultDialogsStore) =>
	useStore(store);

export function updateDialogsState(
	store: DialogsStore,
	update: (dialogs: DialogData[]) => DialogData[],
) {
	const state = store.getState();
	const dialogs = update(state.dialogs);

	store.setState({
		dialogs,
	});
}

export function showDialog(
	dialog: DialogData,
	store: DialogsStore = defaultDialogsStore,
) {
	const dialogId = dialog.dialogId || randomId();

	updateDialogsState(store, (dialogs) => {
		if (
			dialog.dialogId &&
			dialogs.some((d) => d.dialogId === dialog.dialogId)
		) {
			return dialogs;
		}

		return [...dialogs, { ...dialog, dialogId }];
	});

	return dialogId;
}

export function hideDialog(
	dialogId: string,
	store: DialogsStore = defaultDialogsStore,
) {
	updateDialogsState(store, (dialogs) =>
		dialogs.filter((d) => {
			if (d.dialogId === dialogId) {
				return false;
			}

			return true;
		}),
	);

	return dialogId;
}

export function updateDialog(
	dialog: Partial<DialogData>,
	store: DialogsStore = defaultDialogsStore,
) {
	updateDialogsState(store, (dialogs) =>
		dialogs.map((d) => {
			if (d.dialogId === dialog.dialogId) {
				return { ...d, ...dialog };
			}

			return d;
		}),
	);

	return dialog.dialogId;
}

export function cleanDialogs(store: DialogsStore = defaultDialogsStore) {
	updateDialogsState(store, () => []);
}

export const dialogs = {
	show: showDialog,
	hide: hideDialog,
	update: updateDialog,
	clean: cleanDialogs,
	updateState: updateDialogsState,
} as const;
