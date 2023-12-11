import clsx from "clsx";
import React from "react";
import { Portal } from "../Portal/Portal";

export interface AffixProps {
  /**
   * Root element `z-index` property,
   * @default 200
   */
  zIndex?: string | number;
  /**
   * Affix position on screen
   * @default { bottom: 24, right: 16 }
   */
  position?: {
    top?: string | number;
    left?: string | number;
    bottom?: string | number;
    right?: string | number;
  };
  children?: React.ReactNode;
}
export const Affix = React.forwardRef<HTMLDivElement, AffixProps>(
  (props, ref) => {
    const {
      zIndex = 200,
      position = { bottom: 24, right: 16 },
      children,
    } = props;

    return (
      <Portal type="affix">
        <div
          style={
            {
              position: "fixed",
              zIndex,
              top: position?.top,
              left: position?.left,
              right: position?.right,
              bottom: position?.bottom,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </Portal>
    );
  }
);
