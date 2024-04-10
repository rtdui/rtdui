import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { clampUseMovePosition, useMove, UseMovePosition } from "@mantine/hooks";
import { HsvaColor } from "../ColorPicker.types";
import { convertHsvaTo } from "../converters";
import { Thumb } from "../Thumb/Thumb";

export interface SaturationProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
  value: HsvaColor;
  onChange: (color: Partial<HsvaColor>) => void;
  onChangeEnd: (color: Partial<HsvaColor>) => void;
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
  saturationLabel?: string;
  size: "xs" | "sm" | "md" | "lg" | string;
  color: string;
  focusable?: boolean;
}

export function Saturation(props: SaturationProps) {
  const {
    className,
    onChange,
    onChangeEnd,
    value,
    saturationLabel,
    focusable = true,
    size,
    color,
    onScrubStart,
    onScrubEnd,
    ...others
  } = props;

  const [position, setPosition] = useState({
    x: value.s / 100,
    y: 1 - value.v / 100,
  });
  const positionRef = useRef(position);

  const { ref } = useMove(
    ({ x, y }) => {
      positionRef.current = { x, y };
      onChange({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) });
    },
    {
      onScrubEnd: () => {
        const { x, y } = positionRef.current;
        onChangeEnd({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) });
        onScrubEnd?.();
      },
      onScrubStart,
    }
  );

  useEffect(() => {
    setPosition({ x: value.s / 100, y: 1 - value.v / 100 });
  }, [value.s, value.v]);

  const handleArrow = (
    event: React.KeyboardEvent<HTMLDivElement>,
    pos: UseMovePosition
  ) => {
    event.preventDefault();
    const _position = clampUseMovePosition(pos);
    onChange({
      s: Math.round(_position.x * 100),
      v: Math.round((1 - _position.y) * 100),
    });
    onChangeEnd({
      s: Math.round(_position.x * 100),
      v: Math.round((1 - _position.y) * 100),
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowUp": {
        handleArrow(event, { y: position.y - 0.05, x: position.x });
        break;
      }

      case "ArrowDown": {
        handleArrow(event, { y: position.y + 0.05, x: position.x });
        break;
      }

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

  return (
    <div
      className={clsx(
        "saturation",
        "relative h-[--cp-saturation-height] m-[calc(var(--cp-thumb-size)/2)]",
        className
      )}
      ref={ref as any}
      {...others}
      role="slider"
      aria-label={saturationLabel}
      aria-valuenow={position.x}
      aria-valuetext={convertHsvaTo("rgba", value)}
      tabIndex={focusable ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      <div
        className={clsx(
          "saturationOverlay",
          "absolute inset-[calc(-1*var(--cp-thumb-size)/2)] rounded-md select-none"
        )}
        style={{
          backgroundColor: `hsl(${value.h}, 100%, 50%)`,
        }}
      />

      <div
        className={clsx(
          "saturationOverlay",
          "absolute inset-[calc(-1*var(--cp-thumb-size)/2)]  rounded-md select-none"
        )}
        style={{
          backgroundImage: "linear-gradient(90deg, #fff, transparent)",
        }}
      />

      <div
        className={clsx(
          "saturationOverlay",
          "absolute inset-[calc(-1*var(--cp-thumb-size)/2)] rounded-md select-none"
        )}
        style={{
          backgroundImage: "linear-gradient(0deg, #000, transparent)",
        }}
      />

      <Thumb position={position} />
    </div>
  );
}

Saturation.displayName = "@rtdui/core/Saturation";
