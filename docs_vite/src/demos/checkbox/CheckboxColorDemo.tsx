import { Checkbox } from "@rtdui/core";

export default function CheckboxColorDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox defaultChecked label="default" />
      <Checkbox defaultChecked color="primary" label="primary" />
      <Checkbox defaultChecked color="secondary" label="secondary" />
      <Checkbox defaultChecked color="accent" label="accent" />
      <Checkbox defaultChecked color="info" label="info" />
      <Checkbox defaultChecked color="success" label="success" />
      <Checkbox defaultChecked color="warning" label="warning" />
      <Checkbox defaultChecked color="error" label="error" />
    </div>
  );
}
