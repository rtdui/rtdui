import React from "react";
import { Popover, Button, TextInput } from "@rtdui/core";

export default function Demo() {
	return (
		<Popover trapFocus dropdownColor="base2">
			<Popover.Target>
				<Button>popover</Button>
			</Popover.Target>
			<Popover.Dropdown>
				<form className="flex flex-col gap-0 w-64 p-5">
					<div className="flex justify-center items-center text-lg p-2 text-black">
						登录
					</div>
					<TextInput label="UserName" />
					<TextInput label="Password" />
					<Button color="primary" className="mt-4">
						Submit
					</Button>
				</form>
			</Popover.Dropdown>
		</Popover>
	);
}
Demo.displayName = "PopoverFocusTrapDemo";
