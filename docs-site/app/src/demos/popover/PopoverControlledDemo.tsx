import React from "react";
import { Popover, Button } from "@rtdui/core";

export default function Demo() {
  const [opened, setOpened] = React.useState(false);

  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <Button onClick={(e) => setOpened(true)}>popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="w-80 h-40 p-8">abcdefg</div>
      </Popover.Dropdown>
    </Popover>
  );
}
Demo.displayName = "PopoverControlledDemo";
