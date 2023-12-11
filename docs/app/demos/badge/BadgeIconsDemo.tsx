import { IconBell, IconCamera, IconX } from "@tabler/icons-react";
import { Badge } from "@rtdui/core";

export default function () {
  return (
    <div className="flex gap-4 items-center lg:justify-center">
      <Badge icon={<IconX />} color="info">
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
