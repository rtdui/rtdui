import { Badge, Button } from "@rtdui/core";

export default function () {
  return (
    <div className="flex gap-4 items-center lg:justify-center">
      <Button>
        Inbox
        <Badge>+99</Badge>
      </Button>
      <Button>
        Inbox
        <Badge color="secondary">+99</Badge>
      </Button>
    </div>
  );
}
