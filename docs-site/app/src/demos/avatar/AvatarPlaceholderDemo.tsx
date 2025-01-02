import { Avatar } from "@rtdui/core";

export default function Demo() {
	return (
		<div>
			<div className="flex gap-4 items-center justify-center">
				<Avatar size="lg" placeholder="A" />
				<Avatar size="md" placeholder="A" />
				<Avatar size="sm" placeholder="A" />
				<Avatar size="xs" placeholder="A" />
			</div>

			<div className="mt-8 flex flex-col gap-4">
				占位字符也支持online指示器:
				<div className="flex gap-4 items-center justify-center">
					<Avatar online placeholder="A" />
					<Avatar online={false} placeholder="A" />
				</div>
			</div>
		</div>
	);
}
Demo.displayName = "AvatarPlaceholderDemo";
