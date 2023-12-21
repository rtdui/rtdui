import { Radio } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4 items-start">
      <Radio defaultChecked label="default" />
      <Radio defaultChecked color="primary" label="primary" />
      <Radio defaultChecked color="secondary" label="secondary" />
      <Radio defaultChecked color="accent" label="accent" />
      <Radio defaultChecked color="info" label="info" />
      <Radio defaultChecked color="success" label="success" />
      <Radio defaultChecked color="warning" label="warning" />
      <Radio defaultChecked color="error" label="error" />
    </div>
  );
}
Demo.displayName = "RadioColorDemo";
