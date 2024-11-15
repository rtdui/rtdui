import React from "react";
import {
  Portal,
  TransitionGroup,
  Transition,
  type PortalProps,
} from "@rtdui/core";
import { useReducedMotion } from "@rtdui/hooks";
import { DialogContainer } from "./DialogContainer";
import { useDialogs, hideDialog } from "./dialogs.store";

export interface DialogsProps {
  /** Target element of Portal component */
  target?: PortalProps["target"];
  /** Warning label when content is dirty */
  dirtyWarningLabel?: string;
  /** global confirm button text for confirm or prompt mode
   * @default "OK"
   */
  confirmLabel?: string;
  /** global cancel button text for confirm or prompt mode
   * @default "Cancel"
   */
  cancelLabel?: string;
  /** global close button text for alert mode
   * @default "Close"
   */
  closeLabel?: string;
  className?: string;
}

/**
 * 该组件只能使用一次. 通常作为React项目根组件的第一个孩子.
 *
 * @example
 * <App>
 *   <Dialogs />
 *   <Others />
 * </App>
 * 然后就可以在App内的任意位置调用
 */
export function Dialogs(props: DialogsProps) {
  const {
    target,
    dirtyWarningLabel = "The content has been modified, closing it will lose the unsaved data, are you sure to close it?",
    confirmLabel,
    cancelLabel,
    closeLabel,
    className = "z-40",
  } = props;

  const data = useDialogs();
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 1 : 250;

  const items = data.dialogs.map((d) => (
    <Transition
      key={d.dialogId}
      unmountOnExit
      transition="scale"
      duration={duration}
    >
      {(ref, styles) => (
        <DialogContainer
          ref={ref}
          style={styles}
          dirtyWarningLabel={dirtyWarningLabel}
          confirmLabel={confirmLabel}
          cancelLabel={cancelLabel}
          closeLabel={closeLabel}
          {...d}
        />
      )}
    </Transition>
  ));

  return (
    <Portal target={target} type="dialogs" className={`relative ${className}`}>
      <TransitionGroup component={null}>{items}</TransitionGroup>
    </Portal>
  );
}
