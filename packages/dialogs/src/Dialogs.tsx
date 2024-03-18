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
  const { target, className = "z-40" } = props;

  const data = useDialogs();
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 1 : 250;

  const items = data.dialogs.map((d) => (
    <Transition key={d.id} unmountOnExit transition="scale" duration={duration}>
      {(ref, styles) => (
        <DialogContainer
          ref={ref}
          style={styles}
          data={d}
          onHide={(id) => hideDialog(id)}
        />
      )}
    </Transition>
  ));

  return (
    <Portal target={target} type="dialogs" className={`relative ${className}"`}>
      <TransitionGroup component={null}>{items}</TransitionGroup>
    </Portal>
  );
}
