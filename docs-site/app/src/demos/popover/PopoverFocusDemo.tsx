import React from "react";
import { Popover, Button } from "@rtdui/core";
import { useDisclosure } from "@rtdui/hooks";

export default function Demo() {
	const [opened, { close, open }] = useDisclosure(false);
	return (
		<Popover opened={opened}>
			<Popover.Target onFocus={open} onBlur={close}>
				<Button>popover</Button>
			</Popover.Target>
			<Popover.Dropdown>
				<div className="w-72 h-40 p-8">dropdown content</div>
			</Popover.Dropdown>
		</Popover>
	);
}
Demo.displayName = "PopoverFocusDemo";
