import React from "react";
import { Popover, Button } from "@rtdui/core";

export default function () {
  return (
    <div className="flex gap-8 items-center">
      <Popover>
        <Popover.Trigger>
          <Button>popover</Button>
        </Popover.Trigger>
        <Popover.Dropdown showArrow slots={{ arrow: "fill-primary" }}>
          <div className="w-56 h-30 bg-primary text-primary-content p-8 rounded-box">
            dropdown content
          </div>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
