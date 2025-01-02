import { Avatar } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex gap-4 items-center justify-center">
			<Avatar src="/photo-1534528741775-53994a69daeb.jpg" />
			<Avatar variant="square" src="/photo-1534528741775-53994a69daeb.jpg" />
		</div>
	);
}
Demo.displayName = "AvatarVariantDemo";
