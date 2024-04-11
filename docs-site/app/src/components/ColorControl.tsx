import { ColorPicker, ColorSwatch, Popover, TextInput } from "@rtdui/core";
import { IconCheck, IconPalette } from "@tabler/icons-react";

interface ColorControlProps {
  value: string;
  onChange: (val: string) => void;
}
export default function ColorControl(props: ColorControlProps) {
  const { value, onChange } = props;
  return (
    <div className="colors flex flex-wrap gap-0.5">
      {[
        "primary",
        "secondary",
        "accent",
        "info",
        "warning",
        "error",
        "success",
        "neutral",
      ].map((d) => (
        <ColorSwatch
          size="28px"
          radius="sm"
          key={d}
          color={d}
          onClick={() => onChange?.(d)}
        >
          {d === value && <IconCheck size="20" color="white" />}
        </ColorSwatch>
      ))}
      <Popover>
        <Popover.Trigger>
          <ColorSwatch withShadow size="28px" radius="sm" color="white">
            <IconPalette className="stroke-amber-500" />
          </ColorSwatch>
        </Popover.Trigger>
        <Popover.Dropdown>
          <div className="flex flex-col gap-2 bg-base-100 p-4 border border-base-300 rounded shadow">
            <ColorPicker
              format="hexa"
              value={value}
              onChange={(val) => onChange?.(val)}
            />
            <TextInput value={value} readOnly />
          </div>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
