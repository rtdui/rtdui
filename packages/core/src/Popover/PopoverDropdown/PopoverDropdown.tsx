import { forwardRef } from "react";
import clsx from "clsx";
import { mergeRefs, useFocusReturn, useMergedRef } from "@rtdui/hooks";
import { FloatingArrow } from "../Floating";
import { FocusTrap } from "../../FocusTrap";
import { OptionalPortal } from "../../Portal";
import { Transition } from "../../Transition";
import { usePopoverContext } from "../context";
import { getColor, getRadius, rem } from "../../utils";

const noop = () => {};
interface CloseOnEscapeOptions {
  active: boolean | undefined;
  onTrigger?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<any>) => void;
}
export function closeOnEscape(
  callback?: (event: any) => void,
  options: CloseOnEscapeOptions = { active: true }
) {
  if (typeof callback !== "function" || !options.active) {
    return options.onKeyDown || noop;
  }

  return (event: React.KeyboardEvent<any>) => {
    if (event.key === "Escape") {
      callback(event);
      options.onTrigger?.();
    }
  };
}

export interface PopoverDropdownProps
  extends React.ComponentPropsWithoutRef<"div"> {}

export const PopoverDropdown = forwardRef<HTMLDivElement, PopoverDropdownProps>(
  (props, ref) => {
    const { className, style, children, onKeyDownCapture, ...others } = props;

    const ctx = usePopoverContext();

    const returnFocus = useFocusReturn({
      opened: ctx.opened,
      shouldReturnFocus: ctx.returnFocus,
    });

    const accessibleProps = ctx.withRoles
      ? {
          "aria-labelledby": ctx.getTargetId(),
          id: ctx.getDropdownId(),
          role: "dialog",
          tabIndex: -1,
        }
      : {};

    const mergedRef = useMergedRef(ref, ctx.floating);

    if (ctx.disabled) {
      return null;
    }

    return (
      (ctx.opened || ctx.keepMounted) && (
        <OptionalPortal
          {...ctx.portalProps}
          withinPortal={ctx.withinPortal}
          className="popover"
        >
          <Transition
            in={ctx.opened}
            appear={ctx.opened}
            {...ctx.transitionProps}
            transition={ctx.transitionProps?.transition || "fade"}
            duration={ctx.transitionProps?.duration ?? 150}
            unmountOnExit={!ctx.keepMounted}
          >
            {(transitionRef, transitionStyles) => (
              <FocusTrap active={ctx.trapFocus}>
                <div
                  {...accessibleProps}
                  {...others}
                  ref={mergeRefs(transitionRef, mergedRef)}
                  onKeyDownCapture={closeOnEscape(ctx.close, {
                    active: ctx.closeOnEscape,
                    onTrigger: returnFocus,
                    onKeyDown: onKeyDownCapture,
                  })}
                  data-position={ctx.placement}
                  className={clsx(
                    "popover-dropdown",
                    "absolute bg-base-100",
                    "rounded-[--popover-dropdown-radius]",
                    {
                      "shadow-sm": ctx.shadow === "xs",
                      shadow: ctx.shadow === "sm",
                      "shadow-md": ctx.shadow === "md",
                      "shadow-lg": ctx.shadow === "lg",
                      "shadow-2xl": ctx.shadow === "2xl",
                      hidden: !ctx.opened && ctx.keepMounted,
                    },
                    className
                  )}
                  style={
                    {
                      ...style,
                      ...transitionStyles,
                      zIndex: ctx.zIndex as React.CSSProperties["zIndex"],
                      top: ctx.y ?? 0,
                      left: ctx.x ?? 0,
                      width:
                        ctx.width === "target" ? undefined : rem(ctx.width),
                      "--popover-dropdown-radius": getRadius(ctx.radius),
                      backgroundColor: ctx.dropdownColor
                        ? getColor(ctx.dropdownColor)
                        : undefined,
                      color: ctx.dropdownColor ? "white" : undefined,
                    } as any
                  }
                >
                  {children}

                  <FloatingArrow
                    ref={ctx.arrowRef}
                    arrowX={ctx.arrowX}
                    arrowY={ctx.arrowY}
                    visible={ctx.withArrow}
                    position={ctx.placement}
                    arrowSize={ctx.arrowSize}
                    arrowRadius={ctx.arrowRadius}
                    arrowOffset={ctx.arrowOffset}
                    arrowPosition={ctx.arrowPosition}
                    className={clsx("bg-base-100")}
                    style={{
                      backgroundColor: ctx.dropdownColor
                        ? getColor(ctx.dropdownColor)
                        : undefined,
                    }}
                  />
                </div>
              </FocusTrap>
            )}
          </Transition>
        </OptionalPortal>
      )
    );
  }
);

PopoverDropdown.displayName = "@rtdui/core/PopoverDropdown";
