import { forwardRef, useRef } from "react";
import { useMergedRef } from "@mantine/hooks";
import clsx from "clsx";
import { useFloatingIndicator } from "./use-floating-indicator";
import { Box, BoxProps, PolymorphicComponentProps } from "../Polymorphic";

export interface FloatingIndicatorOwnProps {
  /** Target element over which indicator should be displayed */
  target: HTMLElement | null | undefined;

  /** Parent element with relative position based on which indicator position should be calculated */
  parent: HTMLElement | null | undefined;

  /** Transition duration in ms
   * @default 150
   */
  transitionDuration?: number | string;

  /** Determines whether indicator should be displayed after transition ends, should be set if used inside a container that has `transform: scale(n)` styles */
  displayAfterTransitionEnd?: boolean;
}

// Merge own props with others inherited from the underlying element type
export type FloatingIndicatorProps<E extends React.ElementType> =
  PolymorphicComponentProps<E, FloatingIndicatorOwnProps>;

// An HTML tag or a different React component can be rendered by default
const defaultElement = "div";

/** 多态组件, ref会转发给实际的组件 */
export const FloatingIndicator: <
  E extends React.ElementType = typeof defaultElement,
>(
  props: FloatingIndicatorProps<E>
) => React.ReactNode = forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    props: FloatingIndicatorProps<E>,
    ref: typeof props.ref
  ) => {
    const {
      className,
      style,
      target,
      parent,
      transitionDuration = 150,
      displayAfterTransitionEnd,
      ...others
    } = props;
    const boxProps = others as BoxProps<E>;

    const innerRef = useRef<HTMLDivElement>(null);
    const { initialized, hidden } = useFloatingIndicator({
      target,
      parent,
      ref: innerRef,
      displayAfterTransitionEnd,
    });
    const mergedRef = useMergedRef(ref, innerRef);

    if (!target || !parent) {
      return null;
    }

    return (
      <Box
        as={defaultElement}
        ref={mergedRef}
        className={clsx(
          "floating-indicator",
          "absolute left-0 top-0",
          "transition-[transform,width,height] duration-0",
          {
            "duration-[--transition-duration]": initialized,
            hidden,
          },
          className
        )}
        style={
          {
            ...style,
            "--transition-duration": transitionDuration,
          } as any
        }
        {...boxProps}
      />
    );
  }
);
