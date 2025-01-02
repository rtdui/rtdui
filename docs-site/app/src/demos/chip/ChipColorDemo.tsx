import { Chip } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex flex-col items-center gap-4">
			<Chip label="default" />
			<Chip color="primary" label="primary" />
			<Chip color="secondary" label="secondary" />
			<Chip color="accent" label="accent" />
			<Chip color="info" label="info" />
			<Chip color="success" label="success" />
			<Chip color="warning" label="warning" />
			<Chip color="error" label="error" />
		</div>
	);
}
Demo.displayName = "ChipColorDemo";
