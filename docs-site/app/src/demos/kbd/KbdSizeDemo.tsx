import React from "react";
import { Kbd } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex gap-4 items-center">
			<Kbd size="lg">Shift</Kbd>
			<Kbd size="md">Shift</Kbd>
			<Kbd size="sm">Shift</Kbd>
			<Kbd size="xs">Shift</Kbd>
		</div>
	);
}
Demo.displayName = "KbdSizeDemo";
