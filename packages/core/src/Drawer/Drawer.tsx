import React from "react";
import clsx from "clsx";
import { useUncontrolled } from "@rtdui/hooks";
import { Portal } from "../Portal/Portal";

export interface DrawerProps {
  anchor?: "left" | "right";
  target?: HTMLElement | string;
  defaultOpen?: boolean;
  open?: boolean;
  onChange?: (open: boolean) => void;
  position?: "left" | "right";
  slots?: { side: string };
  className?: string;
  children?: React.ReactNode;
}

/** drawer */
export function Drawer(props: DrawerProps) {
  const {
    anchor = "left",
    target,
    open: openProp,
    defaultOpen,
    onChange,
    children,
    className,
    slots,
  } = props;

  const [open, setOpen] = useUncontrolled({
    value: openProp,
    defaultValue: defaultOpen,
    finalValue: false,
    onChange,
  });

  const inputId = React.useId();

  return (
    <Portal type="drawer" target={target}>
      <div
        className={clsx(
          "drawer pointer-events-none",
          {
            "drawer-end": anchor === "right",
            "absolute inset-0": !!target,
            "pointer-events-auto": open,
          },
          className
        )}
      >
        <input
          id={inputId}
          type="checkbox"
          className="drawer-toggle"
          checked={open}
          onChange={(e) => setOpen(e.currentTarget.checked)}
        />
        <div
          className={clsx(
            "drawer-side",
            { "absolute h-full": !!target },
            slots?.side
          )}
        >
          <label htmlFor={inputId} className="drawer-overlay"></label>
          {children}
        </div>
      </div>
    </Portal>
  );
}
