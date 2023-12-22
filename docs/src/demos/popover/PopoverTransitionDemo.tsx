import React from "react";
import { Popover, Button } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex gap-8 items-center">
      <Popover transition="slide-up">
        <Popover.Trigger>
          <Button>popover</Button>
        </Popover.Trigger>
        <Popover.Dropdown showArrow slots={{ arrow: "fill-primary" }}>
          <div className="w-56 h-30 bg-primary text-primary-content p-8 rounded-box">
            slide-up
          </div>
        </Popover.Dropdown>
      </Popover>

      <Popover transition="scale">
        <Popover.Trigger>
          <Button>popover</Button>
        </Popover.Trigger>
        <Popover.Dropdown showArrow slots={{ arrow: "fill-primary" }}>
          <div className="w-56 h-30 bg-primary text-primary-content p-8 rounded-box">
            scale
          </div>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
Demo.displayName = "PopoverTransitionDemo";
