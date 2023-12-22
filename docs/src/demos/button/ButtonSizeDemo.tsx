import { Button } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex items-center gap-4">
      <Button color="primary" size="xs">
        xs
      </Button>
      <Button color="primary" size="sm">
        sm
      </Button>
      <Button color="primary" size="md">
        md(default)
      </Button>
      <Button color="primary" size="lg">
        lg
      </Button>
    </div>
  );
}
Demo.displayName = "ButtonSizeDemo";
