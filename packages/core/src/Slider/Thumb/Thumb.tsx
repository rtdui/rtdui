import clsx from "clsx";
import React, { useState, forwardRef } from "react";
import { getDataProps } from "../../utils";
import { Transition, type TransitionProps } from "../../Transition";

export interface ThumbProps {
  max: number;
  min: number;
  value: number;
  position: number;
  dragging: boolean;
  label: React.ReactNode;
  onKeyDownCapture?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onMouseDown?: (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => void;
  labelTransitionProps?: Pick<
    TransitionProps,
    "transition" | "duration" | "timingFunction"
  >;
  labelAlwaysOn: boolean | undefined;
  thumbLabel: string | undefined;
  onFocus?: () => void;
  onBlur?: () => void;
  showLabelOnHover: boolean | undefined;
  isHovered?: boolean;
  children?: React.ReactNode;
  disabled: boolean | undefined;
  className?: string;
  style?: React.CSSProperties;
  slots?: {
    trackContainer?: string;
    track?: string;
    bar?: string;
    mark?: string;
    markLabel?: string;
    thumb?: string;
    label?: string;
  };
}

export const Thumb = forwardRef<HTMLDivElement, ThumbProps>((props, ref) => {
  const {
    max,
    min,
    value,
    position,
    label,
    dragging,
    onMouseDown,
    onKeyDownCapture,
    labelTransitionProps = { transition: "fade", duration: 150 },
    labelAlwaysOn,
    thumbLabel,
    onFocus,
    onBlur,
    showLabelOnHover,
    isHovered,
    children = null,
    disabled,
    slots,
  } = props;

  const [focused, setFocused] = useState(false);

  const isVisible =
    labelAlwaysOn || dragging || focused || (showLabelOnHover && isHovered);

  return (
    <div
      tabIndex={0}
      role="slider"
      aria-label={thumbLabel}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      ref={ref}
      className={clsx("thumb", slots?.thumb)}
      style={{ "--slider-thumb-offset": `${position}%` } as any}
      onFocus={() => {
        setFocused(true);
        typeof onFocus === "function" && onFocus();
      }}
      onBlur={() => {
        setFocused(false);
        typeof onBlur === "function" && onBlur();
      }}
      onTouchStart={onMouseDown}
      onMouseDown={onMouseDown}
      onKeyDownCapture={onKeyDownCapture}
      onClick={(event) => event.stopPropagation()}
      {...getDataProps({ dragging, disabled })}
    >
      {children}
      <Transition in={label != null && !!isVisible} {...labelTransitionProps}>
        {(ref, styles) => (
          <div ref={ref} className={clsx("label", slots?.label)} style={styles}>
            {label}
          </div>
        )}
      </Transition>
    </div>
  );
});
