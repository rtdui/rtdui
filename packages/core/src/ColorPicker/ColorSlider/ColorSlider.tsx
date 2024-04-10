import React, { forwardRef, useRef, useState } from "react";
import clsx from "clsx";
import {
  clampUseMovePosition,
  useDidUpdate,
  useMergedRef,
  useMove,
  UseMovePosition,
} from "@rtdui/hooks";
import { Thumb } from "../Thumb/Thumb";

export interface ColorSliderProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
  value: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
  size?: "xs" | "sm" | "md" | "lg" | string;
  focusable?: boolean;

  maxValue: number;
  overlays: React.CSSProperties[];
  round: boolean;
  thumbColor?: string;
}

export const ColorSlider = forwardRef<HTMLDivElement, ColorSliderProps>(
  (props, ref) => {
    const {
      className,
      style,
      onChange,
      onChangeEnd,
      maxValue,
      round,
      size = "md",
      focusable = true,
      value,
      overlays,
      thumbColor = "transparent",
      onScrubStart,
      onScrubEnd,
      ...others
    } = props;

    const [position, setPosition] = useState({ y: 0, x: value / maxValue });
    const positionRef = useRef(position);
    const getChangeValue = (val: number) =>
      round ? Math.round(val * maxValue) : val * maxValue;
    const { ref: sliderRef } = useMove(
      ({ x, y }) => {
        positionRef.current = { x, y };
        onChange?.(getChangeValue(x));
      },
      {
        onScrubEnd: () => {
          const { x } = positionRef.current;
          onChangeEnd?.(getChangeValue(x));
          onScrubEnd?.();
        },
        onScrubStart,
      }
    );

    useDidUpdate(() => {
      setPosition({ y: 0, x: value / maxValue });
    }, [value]);

    const handleArrow = (
      event: React.KeyboardEvent<HTMLDivElement>,
      pos: UseMovePosition
    ) => {
      event.preventDefault();
      const _position = clampUseMovePosition(pos);
      onChange?.(getChangeValue(_position.x));
      onChangeEnd?.(getChangeValue(_position.x));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "ArrowRight": {
          handleArrow(event, { x: position.x + 0.05, y: position.y });
          break;
        }

        case "ArrowLeft": {
          handleArrow(event, { x: position.x - 0.05, y: position.y });
          break;
        }
      }
    };

    const layers = overlays.map((overlay, index) => (
      <div
        className={clsx(
          "sliderOverlay",
          "absolute inset-y-0 inset-x-[calc(-1*var(--cp-thumb-size)/2-1px)] rounded-full"
        )}
        style={overlay}
        key={index}
      />
    ));

    return (
      <div
        {...others}
        ref={useMergedRef(sliderRef, ref)}
        role="slider"
        aria-valuenow={value}
        aria-valuemax={maxValue}
        aria-valuemin={0}
        tabIndex={focusable ? 0 : -1}
        onKeyDown={handleKeyDown}
        className={clsx(
          "color-slider",
          "relative h-[calc(var(--cp-thumb-size)+2px)] m-x-[calc(var(--cp-thumb-size)/2)]",
          "mx-[calc(var(--cp-thumb-size)/2)]"
        )}
        style={
          {
            ...style,
            "--cp-thumb-size": `var(--cp-thumb-size-${size})`,
          } as any
        }
      >
        {layers}

        <Thumb
          position={position}
          style={{
            top: 1,
          }}
        />
      </div>
    );
  }
);

ColorSlider.displayName = "@rtdui/core/ColorSlider";
