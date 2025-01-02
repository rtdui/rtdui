import { Badge } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex gap-4 items-center lg:justify-center">
			<Badge size="lg" color="info" />
			<Badge size="md" color="success" />
			<Badge size="sm" color="warning" />
			<Badge size="xs" color="error" />
		</div>
	);
}
Demo.displayName = "BadgeEmptyDemo";
