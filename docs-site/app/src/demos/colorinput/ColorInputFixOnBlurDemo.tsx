import { ColorInput } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-2">
      <ColorInput fixOnBlur={false} />
    </div>
  );
}
Demo.displayName = "ColorInputFixOnBlurDemo";
