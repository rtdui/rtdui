import { IconBell, IconCamera, IconEye } from "@tabler/icons-react";
import { Badge } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex gap-4 items-center lg:justify-center">
      <Badge icon={<IconEye />} color="info">
        New
      </Badge>
      <Badge icon={<IconBell />} color="success">
        New
      </Badge>
      <Badge icon={<IconCamera />} color="warning">
        New
      </Badge>
    </div>
  );
}
Demo.displayName = "BadgeIconsDemo";
