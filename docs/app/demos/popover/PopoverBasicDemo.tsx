import React from "react";
import { Popover, Button } from "@rtdui/core";
import { IconBell } from "@tabler/icons-react";

export default function () {
  return (
    <div className="flex gap-8 items-center">
      <Popover>
        <Popover.Trigger>
          <Button>popover</Button>
        </Popover.Trigger>
        <Popover.Dropdown>
          <div className="w-72 h-40 bg-base-200 p-8 rounded-box">
            dropdown content
          </div>
        </Popover.Dropdown>
      </Popover>

      <Popover>
        <Popover.Trigger>
          <Button ghost sharp="circle">
            <IconBell />
          </Button>
        </Popover.Trigger>
        <Popover.Dropdown>
          <div className="w-72 h-40 bg-base-200 p-8 rounded-box">
            dropdown content
          </div>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
