import { forwardRef } from "react";
import { ThemeRadius } from "../theme.types";
import clsx from "clsx";
import { getRadius, rem } from "../utils";

export interface OverlayProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Controls overlay `background-color` opacity 0–1, disregarded when `gradient` prop is set
   * @default 0.6
   */
  backgroundOpacity?: number;

  /** Overlay `background-color`
   * @default "#000"
   */
  color?: React.CSSProperties["backgroundColor"];

  /** Overlay background blur, `0` by default
   * @default 0
   */
  blur?: number | string;

  /** Changes overlay to gradient. If set, `color` prop is ignored */
  gradient?: string;

  /** Overlay z-index
   * @default 50
   */
  zIndex?: string | number;

  /** Key of `theme.radius` or any valid CSS value to set border-radius
   * @default "0"
   */
  radius?: ThemeRadius;

  /** Determines whether content inside overlay should be vertically and horizontally centered
   * @default false
   */
  center?: boolean;

  /** Determines whether overlay should have fixed position instead of absolute
   * @default false
   */
  fixed?: boolean;

  /** Content inside overlay */
  children?: React.ReactNode;
}

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  (props, ref) => {
    const {
      className,
      style,
      fixed = false,
      center = false,
      radius = "0",
      zIndex = 50,
      gradient,
      blur,
      color,
      backgroundOpacity,
      children,
      ...others
    } = props;

    return (
      <div
        ref={ref}
        className={clsx(
          "overlay",
          "absolute inset-0 bg-[var(--overlay-bg,rgba(0,0,0,0.6))]",
          "[backdrop-filter:var(--overlay-filter)]",
          "rounded-[var(--overlay-radius,0)]",
          "z-[--overlay-z-index]",
          {
            "[&&]:fixed": fixed === true,
            "[&&]:flex [&&]:items-center [&&]:justify-center": center === true,
          },
          className
        )}
        style={
          {
            ...style,
            "--overlay-bg":
              gradient ||
              ((color !== undefined || backgroundOpacity !== undefined) &&
                `rgba(${color ?? "#000"}, ${backgroundOpacity ?? 0.6}))`) ||
              undefined,
            "--overlay-filter": blur ? `blur(${rem(blur)})` : undefined,
            "--overlay-radius":
              radius === undefined ? undefined : getRadius(radius),
            "--overlay-z-index": zIndex?.toString(),
          } as any
        }
        data-center={center}
        data-fixed={fixed}
        {...others}
      >
        {children}
      </div>
    );
  }
);

Overlay.displayName = "@rtdui/core/Overlay";
