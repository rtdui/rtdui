import { forwardRef } from "react";
import { ColorSlider, ColorSliderProps } from "../ColorSlider/ColorSlider";

export interface HueSliderProps
  extends Omit<ColorSliderProps, "maxValue" | "overlays" | "round"> {}

export const HueSlider = forwardRef<HTMLDivElement, HueSliderProps>(
  (props, ref) => {
    const { value, onChange, onChangeEnd, color, ...others } = props;

    return (
      <ColorSlider
        {...others}
        ref={ref}
        value={value}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        maxValue={360}
        thumbColor={`hsl(${value}, 100%, 50%)`}
        round
        data-hue
        overlays={[
          {
            backgroundImage:
              "linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(170,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))",
          },
          {
            boxShadow: "rgba(0, 0, 0, .1) 0 0 0 1px inset, rgb(0, 0, 0, .15) 0 0 4px inset",
          },
        ]}
      />
    );
  }
);

HueSlider.displayName = "@rtdui/core/HueSlider";
