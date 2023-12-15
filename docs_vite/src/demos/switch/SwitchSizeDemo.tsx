import { Switch } from "@rtdui/core";

export default function SwitchSizeDemo() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Switch size="xs" label="xs" />
      <Switch size="sm" label="sm" />
      <Switch size="md" label="md" />
      <Switch size="lg" label="lg" />
    </div>
  );
}
