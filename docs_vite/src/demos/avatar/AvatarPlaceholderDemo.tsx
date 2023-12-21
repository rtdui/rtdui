import { Avatar } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex gap-4 items-center justify-center">
      <Avatar size="lg" placeholder="A" />
      <Avatar size="md" placeholder="A" />
      <Avatar size="sm" placeholder="A" />
      <Avatar size="xs" placeholder="A" />
    </div>
  );
}
Demo.displayName = "AvatarPlaceholderDemo";
