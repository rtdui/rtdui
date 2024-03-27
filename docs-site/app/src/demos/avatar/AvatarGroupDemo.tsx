import { Avatar, AvatarGroup } from "@rtdui/core";

export default function Demo() {
  return (
    <>
      <AvatarGroup size="lg">
        {Array.from({ length: 20 }).map((d, index) => (
          <Avatar key={index} src="/photo-1534528741775-53994a69daeb.jpg" />
        ))}
      </AvatarGroup>
      <AvatarGroup size="md">
        {Array.from({ length: 20 }).map((d, index) => (
          <Avatar key={index} src="/photo-1534528741775-53994a69daeb.jpg" />
        ))}
      </AvatarGroup>
      <AvatarGroup size="sm">
        {Array.from({ length: 20 }).map((d, index) => (
          <Avatar key={index} src="/photo-1534528741775-53994a69daeb.jpg" />
        ))}
      </AvatarGroup>
      <AvatarGroup size="xs">
        {Array.from({ length: 20 }).map((d, index) => (
          <Avatar key={index} src="/photo-1534528741775-53994a69daeb.jpg" />
        ))}
      </AvatarGroup>
    </>
  );
}
Demo.displayName = "AvatarGroupDemo";
