import React from "react";
import { Button, Drawer } from "@rtdui/core";
import { IconX } from "@tabler/icons-react";

export default function Demo() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <div id="my-drawer" className="flex gap-4 relative h-56 overflow-hidden">
      <Button onClick={() => setDrawerOpen(true)}>打开抽屉</Button>
      <Drawer
        anchor="right"
        clickOutsideClose={false}
        open={drawerOpen}
        onChange={(open) => setDrawerOpen(open)}
      >
        <div className="w-64 h-full flex flex-col gap-4 p-4 bg-base-200">
          <div className="flex justify-end">
            <Button
              size="xs"
              sharp="circle"
              color="neutral"
              onClick={() => setDrawerOpen(false)}
            >
              <IconX size={18} />
            </Button>
          </div>
          <div className="flex-1">点击幕布不会关闭抽屉</div>
          <div className="flex justify-end">
            <Button onClick={() => setDrawerOpen(false)}>关闭</Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
Demo.displayName = "DrawerDisabledClickOutsideCloseDemo";
