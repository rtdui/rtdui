import { forwardRef } from "react";
import clsx from "clsx";
import { getColor, getRadius, getSize } from "../utils";
import { Box, BoxProps, PolymorphicComponentProps } from "../Polymorphic";

export interface ColorSwatchOwnProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /** Color to display, Key of theme colors or any valid CSS color values */
  color: string;

  /** Controls `width` and `height` of the swatch, any valid CSS value */
  size?: React.CSSProperties["width"];

  /** Key of `radius` or any valid CSS value to set `border-radius`
   * @default "circle"
   */
  radius?: "xs" | "sm" | "md" | "lg" | "circle";

  /** Determines whether the swatch should have inner `box-shadow`
   * @default true
   */
  withShadow?: boolean;

  /** Content rendered inside the swatch */
  children?: React.ReactNode;
}

// Merge own props with others inherited from the underlying element type
export type ColorSwatchProps<E extends React.ElementType> =
  PolymorphicComponentProps<E, ColorSwatchOwnProps>;

const defaultElement = "div";

/** polymorphic */
export const ColorSwatch: <E extends React.ElementType = typeof defaultElement>(
  props: ColorSwatchProps<E>
) => React.ReactNode =
  // eslint-disable-next-line react/display-name
  forwardRef(
    <E extends React.ElementType = typeof defaultElement>(
      props: ColorSwatchProps<E>,
      ref: typeof props.ref
    ) => {
      const {
        className,
        style,
        color,
        size,
        radius = "circle",
        withShadow = true,
        title,
        children,
        ...others
      } = props;
      const boxProps = others as BoxProps<E>;

      return (
        <Box
          ref={ref}
          title={title ?? color}
          className={clsx(
            "relative cursor-pointer",
            "w-[--cs-size] h-[--cs-size] rounded-[--cs-radius]",
            className
          )}
          style={
            {
              ...style,
              "--cs-radius":
                radius === undefined ? undefined : getRadius(radius),
              "--cs-size": getSize(size, "cs-size"),
            } as any
          }
          {...boxProps}
        >
          <span
            className={clsx(
              "alphaOverlay",
              "absolute inset-0 rounded-[--cs-radius]"
            )}
            style={
              {
                "--alpha-overlay-color": "#dee2e6",
                "--alpha-overlay-bg": "white",
                backgroundImage:
                  "linear-gradient(45deg, var(--alpha-overlay-color) 25%, transparent 25%), linear-gradient(-45deg, var(--alpha-overlay-color) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--alpha-overlay-color) 75%), linear-gradient(-45deg, var(--alpha-overlay-bg) 75%, var(--alpha-overlay-color) 75%)",
                backgroundSize: `8px 8px`,
                backgroundPosition: `0 0, 0 4px, 4px -4px, -4px 0`,
              } as any
            }
          />
          {withShadow && (
            <span
              className={clsx(
                "shadowOverlay",
                "absolute z-10 inset-0 border border-gray-400 rounded-[--cs-radius]"
              )}
            />
          )}
          <span
            className={clsx(
              "colorOverlay",
              "absolute inset-0 bg-[--bg-color] rounded-[--cs-radius]"
            )}
            style={{ "--bg-color": getColor(color) } as any}
          />
          <span
            className={clsx(
              "childrenOverlay",
              "absolute inset-0 bg-[--bg-color] rounded-[--cs-radius] flex justify-center items-center"
            )}
          >
            {children}
          </span>
        </Box>
      );
    }
  );
