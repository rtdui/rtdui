import { Button } from "@rtdui/core";
import { IconBell, IconEye } from "@tabler/icons-react";

export default function Demo() {
  return (
    <div className="flex justify-center items-center gap-6">
      <Button startIcon={<IconEye />}>Button</Button>
      <Button endIcon={<IconBell />}>Button</Button>
    </div>
  );
}
Demo.displayName = "ButtonIconDemo";
