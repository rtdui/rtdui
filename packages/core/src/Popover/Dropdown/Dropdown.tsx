import React from "react";
import clsx from "clsx";
import { FloatingArrow } from "@floating-ui/react";
import { useMergedRef, useFocusTrap } from "@rtdui/hooks";
import { usePopoverContext } from "../Popover.context";
import { Portal } from "../../Portal/Portal";
import { Transition } from "../../Transition";

export interface PopoverDropdownProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "slot"> {
  showArrow?: boolean;
  slots?: { arrow?: string; dropPanel?: string };
}
export const PopoverDropdown = React.forwardRef<
  HTMLDivElement,
  PopoverDropdownProps
>((props, forwardRef) => {
  const { showArrow, slots, children, style, className, ...other } = props;
  const { context: floatingContext, ...otherContext } = usePopoverContext();
  const focusTrapRef = useFocusTrap(otherContext.focusTrap);
  const mergedRef = useMergedRef(
    otherContext.refs.setFloating,
    focusTrapRef,
    forwardRef
  );

  return (
    //context.isMounted动画完成后才卸载, 替代了context.open
    otherContext.isMounted && (
      <Portal type="popover">
        <div
          ref={mergedRef}
          className={clsx(slots?.dropPanel)}
          style={otherContext.floatingStyles}
          {...otherContext.getFloatingProps(other)}
        >
          <Transition
            in={otherContext.status === "open"}
            transition={otherContext.transition}
            duration={otherContext.transitionDuration}
            timingFunction={otherContext.transitionTimingFunction}
          >
            {(ref, styles) => (
              <div
                ref={ref}
                className={clsx(className)}
                style={{
                  ...style,
                  ...styles,
                }}
              >
                {children}
                {showArrow && (
                  <FloatingArrow
                    ref={otherContext.arrowRef}
                    context={floatingContext}
                    className={clsx("stroke-none", slots?.arrow)}
                    width={8}
                    height={4}
                    tipRadius={1}
                  />
                )}
              </div>
            )}
          </Transition>
        </div>
      </Portal>
    )
  );
});
