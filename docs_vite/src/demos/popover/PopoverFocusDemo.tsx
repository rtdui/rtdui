import React from "react";
import { Popover, Button } from "@rtdui/core";

export default function PopoverFocusDemo() {
  return (
    <Popover openOnFocus>
      <Popover.Trigger>
        <Button>popover</Button>
      </Popover.Trigger>
      <Popover.Dropdown>
        <div className="w-72 h-40 bg-base-200 p-8 rounded-box">
          dropdown content
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
