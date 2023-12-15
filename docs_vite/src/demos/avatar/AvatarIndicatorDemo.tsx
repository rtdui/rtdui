import { Avatar } from "@rtdui/core";

export default function AvatarIndicatorDemo() {
  return (
    <div className="flex gap-4 items-center justify-center">
      <Avatar online src="/photo-1534528741775-53994a69daeb.jpg" />
      <Avatar online={false} src="/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  );
}
