import { Badge } from "@rtdui/core";

export default function () {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Badge>New</Badge>
      <Badge color="primary">New</Badge>
      <Badge color="secondary">New</Badge>
      <Badge color="accent">New</Badge>
      <Badge color="info">New</Badge>
      <Badge color="warning">New</Badge>
      <Badge color="success">New</Badge>
      <Badge color="error">New</Badge>
      <Badge color="neutral">New</Badge>
    </div>
  );
}
