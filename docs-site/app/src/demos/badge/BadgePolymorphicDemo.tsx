import { Badge } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex gap-4 items-center lg:justify-center">
			<Badge as="span">+99</Badge>
			<Badge as="div">+99</Badge>
		</div>
	);
}
Demo.displayName = "BadgePolymorphicDemo";
