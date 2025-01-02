import { Badge } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex gap-4 items-center lg:justify-center">
			<Badge>default</Badge>
			<Badge variant="outline">outline</Badge>
			<Badge variant="ghost">ghost</Badge>
		</div>
	);
}
Demo.displayName = "BadgeVariantDemo";
