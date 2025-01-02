import { Avatar } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex gap-4 items-center justify-center">
			<Avatar src="/photo-1534528741775-53994a69daeb.jpg" mask="squircle" />
			<Avatar src="/photo-1534528741775-53994a69daeb.jpg" mask="heart" />
			<Avatar src="/photo-1534528741775-53994a69daeb.jpg" mask="star" />
			<Avatar src="/photo-1534528741775-53994a69daeb.jpg" mask="triangle" />
			<Avatar src="/photo-1534528741775-53994a69daeb.jpg" mask="diamond" />
			<Avatar src="/photo-1534528741775-53994a69daeb.jpg" mask="pentagon" />
			<Avatar src="/photo-1534528741775-53994a69daeb.jpg" mask="hexagon" />
			<Avatar src="/photo-1534528741775-53994a69daeb.jpg" mask="hexagon2" />
			<Avatar src="/photo-1534528741775-53994a69daeb.jpg" mask="decagon" />
		</div>
	);
}
Demo.displayName = "AvatarMaskDemo";
