import React from "react";
import { Popover, Button } from "@rtdui/core";
import { IconBell } from "@tabler/icons-react";

export default function Demo() {
	return (
		<div className="flex gap-8 items-center">
			<Popover>
				<Popover.Target>
					<Button>popover</Button>
				</Popover.Target>
				<Popover.Dropdown>
					<div className="w-72 h-40 p-8">dropdown content</div>
				</Popover.Dropdown>
			</Popover>

			<Popover>
				<Popover.Target>
					<Button ghost shape="circle">
						<IconBell />
					</Button>
				</Popover.Target>
				<Popover.Dropdown>
					<div className="w-72 h-40 p-8">dropdown content</div>
				</Popover.Dropdown>
			</Popover>
		</div>
	);
}
Demo.displayName = "PopoverBasicDemo";
