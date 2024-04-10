import { forwardRef, useRef, useState } from "react";
import clsx from "clsx";
import { useDidUpdate, useUncontrolled } from "@rtdui/hooks";
import { ColorSwatch } from "../ColorSwatch";
import { AlphaSlider } from "./AlphaSlider/AlphaSlider";
import { ColorFormat, HsvaColor } from "./ColorPicker.types";
import { convertHsvaTo, isColorValid, parseColor } from "./converters";
import { HueSlider } from "./HueSlider/HueSlider";
import { Saturation } from "./Saturation/Saturation";
import { Swatches } from "./Swatches/Swatches";
import { getSize } from "../utils";

export type ColorPickerStylesNames =
  | "wrapper"
  | "preview"
  | "body"
  | "sliders"
  | "slider"
  | "sliderOverlay"
  | "thumb"
  | "saturation"
  | "thumb"
  | "saturationOverlay"
  | "thumb"
  | "swatches"
  | "swatch";

export type ColorPickerCssVariables = {
  wrapper:
    | "--cp-preview-size"
    | "--cp-width"
    | "--cp-body-spacing"
    | "--cp-swatch-size"
    | "--cp-thumb-size"
    | "--cp-saturation-height";
};

export interface ColorPickerProps
  extends Omit<
    React.ComponentPropsWithoutRef<"div">,
    "onChange" | "value" | "defaultValue"
  > {
  /** Controlled component value */
  value?: string;

  /** Uncontrolled component default value */
  defaultValue?: string;

  /** Called when value changes */
  onChange?: (value: string) => void;

  /** Called when the user stops dragging one of the sliders or changes the value with arrow keys */
  onChangeEnd?: (value: string) => void;

  /** Color format
   * @default hex
   */
  format?: "rgb" | "rgba" | "hex" | "hexa" | "hsl" | "hsla";

  /** Determines whether the color picker should be displayed
   * @default true
   */
  withPicker?: boolean;

  /** An array of colors in one of the supported formats. Used to render swatches list below the color picker. */
  swatches?: string[];

  /** Number of swatches per row
   * @default 7
   */
  swatchesPerRow?: number;

  /** Controls size of hue, alpha and saturation sliders
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | string;

  /** Determines whether the component should take 100% width of its container
   * @default false
   */
  fullWidth?: boolean;

  /** Determines whether interactive elements (sliders thumbs and swatches) should be focusable
   * @default  true
   */
  focusable?: boolean;

  /** Saturation slider `aria-label` prop */
  saturationLabel?: string;

  /** Hue slider `aria-label` prop */
  hueLabel?: string;

  /** Alpha slider `aria-label` prop */
  alphaLabel?: string;

  /** Called when one of the color swatches is clicked */
  onColorSwatchClick?: (color: string) => void;
}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  (props, ref) => {
    const {
      className,
      style,
      format = "hex",
      value,
      defaultValue,
      onChange,
      onChangeEnd,
      withPicker = true,
      size = "md",
      saturationLabel,
      hueLabel,
      alphaLabel,
      focusable = true,
      swatches,
      swatchesPerRow = 7,
      fullWidth = false,
      onColorSwatchClick,
      ...others
    } = props;

    const formatRef = useRef(format);
    const valueRef = useRef<string>();
    const scrubTimeoutRef = useRef<number>(-1);
    const isScrubbingRef = useRef(false);
    const withAlpha =
      format === "hexa" || format === "rgba" || format === "hsla";

    const [_value, setValue, controlled] = useUncontrolled({
      value,
      defaultValue,
      finalValue: "#FFFFFF",
      onChange,
    });

    const [parsed, setParsed] = useState<HsvaColor>(parseColor(_value));

    const startScrubbing = () => {
      window.clearTimeout(scrubTimeoutRef.current);
      isScrubbingRef.current = true;
    };

    const stopScrubbing = () => {
      window.clearTimeout(scrubTimeoutRef.current);
      scrubTimeoutRef.current = window.setTimeout(() => {
        isScrubbingRef.current = false;
      }, 200);
    };

    const handleChange = (color: Partial<HsvaColor>) => {
      setParsed((current: any) => {
        const next = { ...current, ...color };
        valueRef.current = convertHsvaTo(formatRef.current!, next);
        return next;
      });

      setValue(valueRef.current!);
    };

    useDidUpdate(() => {
      if (isColorValid(value!) && !isScrubbingRef.current) {
        setParsed(parseColor(value!));
      }
    }, [value]);

    useDidUpdate(() => {
      formatRef.current = format;
      setValue(convertHsvaTo(format!, parsed));
    }, [format]);

    return (
      <div
        ref={ref}
        data-full-width={fullWidth}
        className={clsx(
          "color-picker",
          "flex flex-col gap-2 w-[--cp-width]",
          {
            "!w-full": fullWidth,
          },
          className
        )}
        style={
          {
            ...style,
            "--cp-width-xs": "180px",
            "--cp-width-sm": "200px",
            "--cp-width-md": "240px",
            "--cp-width-lg": "280px",
            "--cp-width-xl": "320px",
            "--cp-width": getSize(size, "cp-width"),
            "--cp-saturation-height-xs": "100px",
            "--cp-saturation-height-sm": "110px",
            "--cp-saturation-height-md": "120px",
            "--cp-saturation-height-lg": "140px",
            "--cp-saturation-height-xl": "160px",
            "--cp-saturation-height": getSize(size, "cp-saturation-height"),
            "--cp-preview-size-xs": "26px",
            "--cp-preview-size-sm": "34px",
            "--cp-preview-size-md": "42px",
            "--cp-preview-size-lg": "50px",
            "--cp-preview-size-xl": "54px",
            "--cp-preview-size": getSize(size, "cp-preview-size"),
            "--cp-thumb-size-xs": "8px",
            "--cp-thumb-size-sm": "12px",
            "--cp-thumb-size-md": "16px",
            "--cp-thumb-size-lg": "20px",
            "--cp-thumb-size-xl": "22px",
            "--cp-thumb-size": getSize(size, "cp-thumb-size"),
            "--slider-checkers": "#dee2e6",
          } as any
        }
        {...others}
      >
        {withPicker && (
          <>
            <Saturation
              value={parsed}
              onChange={handleChange}
              onChangeEnd={({ s, v }) =>
                onChangeEnd?.(
                  convertHsvaTo(formatRef.current!, {
                    ...parsed,
                    s: s!,
                    v: v!,
                  })
                )
              }
              color={_value}
              size={size!}
              focusable={focusable}
              saturationLabel={saturationLabel}
              onScrubStart={startScrubbing}
              onScrubEnd={stopScrubbing}
            />

            <div className={clsx("body", "flex gap-4")}>
              <div className={clsx("sliders", "flex-1 flex flex-col gap-2")}>
                <HueSlider
                  value={parsed.h}
                  onChange={(h) => handleChange({ h })}
                  onChangeEnd={(h) =>
                    onChangeEnd?.(
                      convertHsvaTo(formatRef.current!, { ...parsed, h })
                    )
                  }
                  size={size}
                  focusable={focusable}
                  aria-label={hueLabel}
                  onScrubStart={startScrubbing}
                  onScrubEnd={stopScrubbing}
                />

                {withAlpha && (
                  <AlphaSlider
                    value={parsed.a}
                    onChange={(a) => handleChange({ a })}
                    onChangeEnd={(a) => {
                      onChangeEnd?.(
                        convertHsvaTo(formatRef.current!, { ...parsed, a })
                      );
                    }}
                    size={size}
                    color={convertHsvaTo("hex", parsed)}
                    focusable={focusable}
                    aria-label={alphaLabel}
                    onScrubStart={startScrubbing}
                    onScrubEnd={stopScrubbing}
                  />
                )}
              </div>

              {withAlpha && (
                <ColorSwatch
                  withShadow
                  color={_value}
                  radius="sm"
                  size="var(--cp-preview-size)"
                  className={clsx(
                    "preview",
                    "w-[--cp-preview-size] h-[--cp-preview-size"
                  )}
                />
              )}
            </div>
          </>
        )}

        {Array.isArray(swatches) && (
          <Swatches
            data={swatches}
            swatchesPerRow={swatchesPerRow}
            focusable={focusable}
            setValue={setValue}
            onChangeEnd={(color) => {
              const convertedColor = convertHsvaTo(format!, parseColor(color));
              onColorSwatchClick?.(convertedColor);
              onChangeEnd?.(convertedColor);
              if (!controlled) {
                setParsed(parseColor(color));
              }
            }}
          />
        )}
      </div>
    );
  }
);

ColorPicker.displayName = "@rtdui/core/ColorPicker";
