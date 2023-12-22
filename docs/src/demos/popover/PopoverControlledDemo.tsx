import React from "react";
import { Popover, Button } from "@rtdui/core";

export default function Demo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <Button onClick={(e) => setOpen(true)}>popover</Button>
      </Popover.Trigger>
      <Popover.Dropdown>
        <div className="w-80 h-40 bg-base-200 p-8 rounded-box">abcdefg</div>
      </Popover.Dropdown>
    </Popover>
  );
}
Demo.displayName = "PopoverControlledDemo";
