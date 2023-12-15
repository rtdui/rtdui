import { Badge } from "@rtdui/core";

export default function BadgeVariantDemo() {
  return (
    <div className="flex gap-4 items-center lg:justify-center">
      <Badge>New</Badge>
      <Badge ghost>New</Badge>
      <Badge outline>New</Badge>
    </div>
  );
}
