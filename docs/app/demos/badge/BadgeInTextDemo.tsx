import { Badge } from "@rtdui/core";

export default function () {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2>
        Heading{" "}
        <Badge size="lg" color="info">
          New
        </Badge>
      </h2>
      <h3>
        Heading <Badge color="info">New</Badge>
      </h3>
      <h4>
        Heading{" "}
        <Badge size="sm" color="info">
          New
        </Badge>
      </h4>
      <h5>
        Heading{" "}
        <Badge size="xs" color="info">
          New
        </Badge>
      </h5>
    </div>
  );
}
