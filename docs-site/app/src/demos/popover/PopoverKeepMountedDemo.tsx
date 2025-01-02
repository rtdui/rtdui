import { Popover, Button } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex gap-8 items-center">
			<Popover keepMounted>
				<Popover.Target>
					<Button>popover</Button>
				</Popover.Target>
				<Popover.Dropdown>
					<div className="w-72 h-40 p-8">dropdown content</div>
				</Popover.Dropdown>
			</Popover>
		</div>
	);
}
Demo.displayName = "PopoverKeepMountedDemo";
