import { randomId, createStore, useStore, type RtdStore } from "@rtdui/hooks";
import { RefObject } from "react";
import { type DialogProps } from "./Dialog";

export interface DialogData extends Omit<DialogProps, "onClose"> {
  id?: string;
  content: React.ReactNode;
  onClose?: (result: any) => void;
  onOpen?: (props: DialogData) => void;
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
  update: (dialogs: DialogData[]) => DialogData[]
) {
  const state = store.getState();
  const dialogs = update(state.dialogs);

  store.setState({
    dialogs,
  });
}

export function showDialog(
  dialog: DialogData,
  store: DialogsStore = defaultDialogsStore
) {
  const id = dialog.id || randomId();

  updateDialogsState(store, (dialogs) => {
    if (dialog.id && dialogs.some((d) => d.id === dialog.id)) {
      return dialogs;
    }

    return [...dialogs, { ...dialog, id }];
  });

  return id;
}

export function hideDialog(
  id: string,
  store: DialogsStore = defaultDialogsStore
) {
  updateDialogsState(store, (dialogs) =>
    dialogs.filter((d) => {
      if (d.id === id) {
        return false;
      }

      return true;
    })
  );

  return id;
}

export function updateDialog(
  dialog: DialogData,
  store: DialogsStore = defaultDialogsStore
) {
  updateDialogsState(store, (dialogs) =>
    dialogs.map((d) => {
      if (d.id === dialog.id) {
        return { ...d, ...dialog };
      }

      return d;
    })
  );

  return dialog.id;
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
