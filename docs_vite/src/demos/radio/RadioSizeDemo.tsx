import { Radio } from "@rtdui/core";

export default function RadioSizeDemo() {
  return (
    <div className="flex flex-col gap-4 items-start">
      <Radio size="xs" label="xs" />
      <Radio size="sm" label="sm" />
      <Radio size="md" label="md" />
      <Radio size="lg" label="lg" />
    </div>
  );
}
