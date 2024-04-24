import React, { forwardRef, useEffect, useState } from "react";
import clsx from "clsx";
import { useDidUpdate, useEyeDropper, useUncontrolled } from "@rtdui/hooks";
import { IconColorPicker } from "@tabler/icons-react";
import {
  ColorPicker,
  ColorPickerProps,
  convertHsvaTo,
  isColorFormatValid,
  parseColor,
} from "../ColorPicker";
import { ColorSwatch } from "../ColorSwatch";
import { Popover } from "../Popover";
import { TextInput, TextInputProps } from "../TextInput";
import { Button } from "../Button";

export interface ColorInputProps
  extends Omit<TextInputProps, "value" | "defaultValue" | "onChange">,
    Pick<
      ColorPickerProps,
      | "format"
      | "withPicker"
      | "swatches"
      | "swatchesPerRow"
      | "value"
      | "defaultValue"
      | "onChange"
      | "onChangeEnd"
    > {
  /** If input is not allowed, the user can only pick value with color picker and swatches
   * @default false
   */
  disallowInput?: boolean;

  /** Determines whether the input value should be reset to the last known valid value when the input loses focusable
   * @default true
   */
  fixOnBlur?: boolean;

  /** Determines whether the preview color swatch should be displayed in the left section of the input
   * @default true
   */
  withPreview?: boolean;

  /** Determines whether eye dropper button should be displayed in the right section
   * @default true
   */
  withEyeDropper?: boolean;

  /** Determines whether the dropdown should be closed when one of the color swatches is clicked
   * @default false
   */
  closeOnColorSwatchClick?: boolean;
  slots?: TextInputProps["slots"] & {
    eyeDropper?: string;
  };
}

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  (props, ref) => {
    const {
      disallowInput,
      fixOnBlur = true,
      withPreview = true,
      withEyeDropper = true,
      closeOnColorSwatchClick,
      value,
      defaultValue,
      onChange,
      onChangeEnd,
      onClick,
      onFocus,
      onBlur,
      format = "hex",
      readOnly,
      withPicker = true,
      swatches,
      disabled,
      leftSection,
      rightSection,
      swatchesPerRow = 7,
      slots,
      ...others
    } = props;

    const [dropdownOpened, setDropdownOpened] = useState(false);
    const [lastValidValue, setLastValidValue] = useState("");
    const [_value, setValue] = useUncontrolled({
      value,
      defaultValue,
      finalValue: "",
      onChange,
    });

    const { supported: eyeDropperSupported, open: openEyeDropper } =
      useEyeDropper();

    const eyeDropper = (
      <Button
        size="xs"
        ghost
        sharp="square"
        className={clsx("colorinput-eyedropper", slots?.eyeDropper)}
        onClick={() =>
          openEyeDropper()
            .then((payload) => {
              if (payload?.sRGBHex) {
                const color = convertHsvaTo(
                  format!,
                  parseColor(payload.sRGBHex)
                );
                setValue(color);
                onChangeEnd?.(color);
              }
            })
            .catch(() => {})
        }
      >
        {<IconColorPicker size={18} />}
      </Button>
    );

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      fixOnBlur && setValue(lastValidValue);
    };

    useEffect(() => {
      if (isColorFormatValid(_value, format) || _value.trim() === "") {
        setLastValidValue(_value);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_value]);

    useDidUpdate(() => {
      if (isColorFormatValid(_value, format)) {
        setValue(convertHsvaTo(format!, parseColor(_value)));
      }
    }, [format]);

    return (
      <Popover
        opened={dropdownOpened}
        onChange={setDropdownOpened}
        position="bottom-start"
        offset={5}
        disabled={
          disabled ||
          readOnly ||
          (withPicker === false &&
            (!Array.isArray(swatches) || swatches.length === 0))
        }
      >
        <Popover.Target>
          <TextInput
            size="sm"
            autoComplete="off"
            {...others}
            disabled={disabled}
            readOnly={disallowInput || readOnly}
            ref={ref}
            onBlur={handleInputBlur}
            spellCheck={false}
            value={_value}
            onChange={(event) => {
              const inputValue = event.currentTarget.value;
              setValue(inputValue);
              if (isColorFormatValid(inputValue, format)) {
                onChangeEnd?.(convertHsvaTo(format!, parseColor(inputValue)));
              }
            }}
            leftSection={
              leftSection ||
              (withPreview ? (
                <ColorSwatch
                  color={isColorFormatValid(_value, format) ? _value : "#fff"}
                  size="18px"
                />
              ) : null)
            }
            rightSection={
              rightSection ||
              (withEyeDropper && !disabled && !readOnly && eyeDropperSupported
                ? eyeDropper
                : null)
            }
            rightSectionPointerEvents="auto"
            onFocus={(event) => {
              if (readOnly || disabled) {
                return;
              }
              setDropdownOpened(true);
              onFocus?.(event);
            }}
            slots={slots}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <div className="bg-base-100 shadow">
            <ColorPicker
              value={_value}
              onChange={setValue}
              onChangeEnd={onChangeEnd}
              format={format}
              swatches={swatches}
              swatchesPerRow={swatchesPerRow}
              withPicker={withPicker}
              // size={inputProps.size}
              focusable={false}
              onColorSwatchClick={() =>
                closeOnColorSwatchClick && setDropdownOpened(false)
              }
            />
          </div>
        </Popover.Dropdown>
      </Popover>
    );
  }
);

ColorInput.displayName = "@rtdui/core/ColorInput";
