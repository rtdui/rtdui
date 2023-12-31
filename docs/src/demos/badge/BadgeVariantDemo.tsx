import { Badge } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex gap-4 items-center lg:justify-center">
      <Badge>New</Badge>
      <Badge ghost>New</Badge>
      <Badge outline>New</Badge>
    </div>
  );
}
Demo.displayName = "BadgeVariantDemo";
