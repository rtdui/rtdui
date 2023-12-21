import { Avatar } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex gap-4 items-center justify-center">
      <Avatar online placeholder="A" />
      <Avatar online={false} placeholder="A" />
    </div>
  );
}
Demo.displayName = "AvatarIndicatorAndPlaceholderDemo";
