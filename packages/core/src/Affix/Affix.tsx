import clsx from "clsx";
import { Portal } from "../Portal";

export interface AffixProps {
  /**
   * Root element `z-index` property,
   * @default 200
   */
  zIndex?: string | number;
  /**
   * Affix position on screen
   * @default "{ bottom: 24, right: 16 }"
   */
  position?: {
    top?: string | number;
    left?: string | number;
    bottom?: string | number;
    right?: string | number;
  };
  children?: React.ReactNode;
  className?: string;
}

export function Affix(props: AffixProps) {
  const {
    zIndex = 200,
    position = { bottom: 24, right: 16 },
    className,
    children,
  } = props;

  return (
    <Portal type="affix">
      <div
        className={clsx("affix", className)}
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
