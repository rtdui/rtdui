import React from "react";
import { Popover, Button } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex gap-8 items-center">
			<Popover
				withArrow
				transitionProps={{ transition: "slide-up" }}
				dropdownColor="primary"
			>
				<Popover.Target>
					<Button>popover</Button>
				</Popover.Target>
				<Popover.Dropdown>
					<div className="w-56 h-30 p-8">slide-up</div>
				</Popover.Dropdown>
			</Popover>

			<Popover
				withArrow
				transitionProps={{ transition: "scale" }}
				dropdownColor="primary"
			>
				<Popover.Target>
					<Button>popover</Button>
				</Popover.Target>
				<Popover.Dropdown>
					<div className="w-56 h-30 p-8">scale</div>
				</Popover.Dropdown>
			</Popover>
		</div>
	);
}
Demo.displayName = "PopoverTransitionDemo";
