import { Badge } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex gap-4 items-center lg:justify-center">
			<Badge>default</Badge>
			<Badge variant="outline" color="primary">
				outline
			</Badge>
			<Badge variant="dash" color="primary">
				dash
			</Badge>
			<Badge variant="soft" color="primary">
				soft
			</Badge>
			<Badge variant="ghost">ghost</Badge>
		</div>
	);
}
Demo.displayName = "BadgeVariantDemo";
