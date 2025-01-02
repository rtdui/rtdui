import { useState } from "react";
import { Popover, Button, Divider, Switch } from "@rtdui/core";

export default function Demo() {
	const [disabled, setDisabled] = useState(false);
	return (
		<div className="flex">
			<div className="flex-1">
				<Popover disabled={disabled}>
					<Popover.Target>
						<Button>popover</Button>
					</Popover.Target>
					<Popover.Dropdown>
						<div className="w-56 h-30 p-8">dropdown content</div>
					</Popover.Dropdown>
				</Popover>
			</div>
			<Divider direction="horizontal" />
			<div className="flex flex-col gap-2 p-4 bg-base-100 w-56">
				<Switch
					color="secondary"
					label="Disabled"
					checked={disabled}
					onChange={(val) => setDisabled(val)}
				/>
			</div>
		</div>
	);
}
Demo.displayName = "PopoverDisabledDemo";
