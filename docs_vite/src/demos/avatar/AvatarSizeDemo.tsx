import { Avatar } from "@rtdui/core";

export default function AvatarSizeDemo() {
  return (
    <div className="flex gap-4 items-center lg:justify-center">
      <Avatar size="lg" src="/photo-1534528741775-53994a69daeb.jpg" />
      <Avatar size="md" src="/photo-1534528741775-53994a69daeb.jpg" />
      <Avatar size="sm" src="/photo-1534528741775-53994a69daeb.jpg" />
      <Avatar size="xs" src="/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  );
}
