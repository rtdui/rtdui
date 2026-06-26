import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { ColorPicker, type ColorPickerProps, Popover } from "@rtdui/core";
import clsx from "clsx";

export interface ColorPickerPopoverProps extends Pick<
  ColorPickerProps,
  "onChangeEnd" | "className"
> {
  disabled?: boolean;
}

export function ColorPickerPopover(props: ColorPickerPopoverProps) {
  const { disabled, onChangeEnd, className, ...other } = props;

  const [dropdownOpened, setDropdownOpened] = useState(false);

  return (
    <Popover
      opened={dropdownOpened}
      onChange={setDropdownOpened}
      position="bottom-start"
      offset={5}
      disabled={disabled}
    >
      <Popover.Target>
        <button
          {...other}
          type="button"
          title="文本颜色"
          className={clsx("join-item relative btn btn-xs w-4 p-0", className)}
          onClick={() => setDropdownOpened(true)}
        >
          <IconChevronDown stroke={1} size={12} />
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="bg-base-100 shadow-sm p-2 rounded-md">
          <ColorPicker
            onChangeEnd={(val) => onChangeEnd?.(val)}
            format="hex"
            swatches={[
              "#000",
              "#fff",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
            swatchesPerRow={7}
            withPicker
            // size={inputProps.size}
            focusable={false}
            onColorSwatchClick={() => setDropdownOpened(false)}
          >
            <button
              className="btn btn-xs w-full"
              onClick={() => onChangeEnd?.("auto")}
            >
              自动
            </button>
          </ColorPicker>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
