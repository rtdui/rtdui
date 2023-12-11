import React from "react";
import clsx from "clsx";
import {
  Portal,
  TransitionGroup,
  Transition,
  type PortalProps,
} from "@rtdui/core";
import { useReducedMotion } from "@rtdui/hooks";
import { NotificationContainer } from "./NotificationContainer";
import {
  useNotifications,
  hideNotification,
  defaultNotificationsStore,
} from "./notifications.store";

/**
 * 基于daisyUI的toast实现, 因此同样支持toast的className:
 *
 * `toast-start`	Responsive	align horizontally to the left
 *
 * `toast-center`	Responsive	align horizontally to the center
 *
 * `toast-end`	  Responsive	align horizontally to the right (default)
 *
 * `toast-top`	  Responsive	align vertically to top
 *
 * `toast-middle`	Responsive	align vertically to middle
 *
 * `toast-bottom` Responsive	align vertically to bottom (default)
 */
export interface NotificationsProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Auto close timeout for all notifications, false to disable auto close, can be overwritten for individual notifications by notifications.show function
   * @default 4000
   * */
  autoClose?: number | false;

  /**
   * Maximum amount of notifications displayed at a time, other new notifications will be added to queue
   * @default 5
   */
  limit?: number;

  /**
   * Notification transitions duration, 0 to turn transitions off
   * @default 250
   * */
  transitionDuration?: number;

  /** Target element of Portal component */
  target?: PortalProps["target"];
}

/**
 * 该组件只能使用一次. 通常作为React项目根组件的第一个孩子.
 *
 * @example
 * <App>
 *   <Notifications />
 *   <Others />
 * </App>
 * 然后就可以在App内的任意位置调用
 */
export function Notifications(props: NotificationsProps) {
  const {
    className,
    autoClose = 4000,
    transitionDuration = 250,
    limit = 5,
    children,
    target,
    ...others
  } = props;

  const store = React.useMemo(() => defaultNotificationsStore, []);

  const data = useNotifications(store);
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 1 : transitionDuration;

  React.useEffect(() => {
    store.updateState((current) => ({ ...current, limit: limit || 5 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const items = data.notifications.map((d) => (
    <Transition
      key={d.id}
      unmountOnExit
      transition={{
        in: {
          opacity: 1,
          maxHeight: "100vh", // 使得父元素有一个被动的过渡效果
          transform: "translateX(0) scale(1)",
        },
        out: {
          opacity: 0,
          maxHeight: 0,
          transform: "translateX(100%) scale(0.5)",
        },
        transitionProperty: "opacity,max-height,transform",
      }}
      duration={duration}
    >
      {(ref, styles) => (
        <NotificationContainer
          ref={ref}
          style={styles}
          data={d}
          onHide={(id) => hideNotification(id)}
          autoClose={autoClose}
        />
      )}
    </Transition>
  ));

  return (
    <Portal
      target={target}
      type="notifications"
      className={clsx(
        "fixed z-50 bottom-4 right-4 flex flex-col gap-2",
        className
      )}
      {...others}
    >
      <TransitionGroup component={null}>{items}</TransitionGroup>
    </Portal>
  );
}
