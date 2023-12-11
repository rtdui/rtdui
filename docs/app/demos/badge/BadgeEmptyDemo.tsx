import { Badge } from "@rtdui/core";

export default function () {
  return (
    <div className="flex gap-4 items-center lg:justify-center">
      <Badge size="lg" color="info"></Badge>
      <Badge size="md" color="success"></Badge>
      <Badge size="sm" color="warning"></Badge>
      <Badge size="xs" color="error"></Badge>
    </div>
  );
}
