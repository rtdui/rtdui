import React from "react";
import { Button, Drawer } from "@rtdui/core";

export default function Demo() {
	const [leftDrawerOpen, setLeftDrawerOpen] = React.useState(false);
	const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);

	return (
		<div className="flex gap-4">
			<Button onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}>
				打开左抽屉
			</Button>
			<Drawer
				anchor="left"
				open={leftDrawerOpen}
				onChange={(open) => setLeftDrawerOpen(open)}
			>
				<div className="w-80 h-full p-4 bg-base-200">左抽屉</div>
			</Drawer>

			<Button onClick={() => setRightDrawerOpen(!rightDrawerOpen)}>
				打开右抽屉
			</Button>
			<Drawer
				anchor="right"
				open={rightDrawerOpen}
				onChange={(open) => setRightDrawerOpen(open)}
			>
				<div className="w-80 h-full p-4 bg-base-200">右抽屉</div>
			</Drawer>
		</div>
	);
}
Demo.displayName = "DrawerBasicDemo";
