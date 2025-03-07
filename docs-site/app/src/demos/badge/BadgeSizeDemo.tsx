import { Badge } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex gap-4 items-center lg:justify-center">
			<Badge size="xl">New</Badge>
			<Badge size="lg">New</Badge>
			<Badge size="md">New</Badge>
			<Badge size="sm">New</Badge>
			<Badge size="xs">New</Badge>
		</div>
	);
}
Demo.displayName = "BadgeSizeDemo";
