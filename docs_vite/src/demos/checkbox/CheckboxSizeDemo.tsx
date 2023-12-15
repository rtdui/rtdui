import { Checkbox } from "@rtdui/core";

export default function CheckboxSizeDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox size="xs" label="xs" />
      <Checkbox size="sm" label="sm" />
      <Checkbox size="md" label="md(default)" />
      <Checkbox size="lg" label="lg" />
    </div>
  );
}
