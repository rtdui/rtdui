import { Swap } from "@rtdui/core";
import { IconMoon, IconSun, IconMenu2, IconX } from "@tabler/icons-react";

export default function Demo() {
  return (
    <div className="flex gap-8">
      <Swap transitionEffect="rotate">
        <IconMoon size={36} />
        <IconSun size={36} />
      </Swap>
      <Swap transitionEffect="rotate">
        <IconMenu2 size={36} />
        <IconX size={36} />
      </Swap>
    </div>
  );
}
Demo.displayName = "SwapIconRotateDemo";
