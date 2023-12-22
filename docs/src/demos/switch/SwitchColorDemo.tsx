import { Switch } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Switch defaultChecked />
      <Switch defaultChecked color="primary" />
      <Switch defaultChecked color="secondary" />
      <Switch defaultChecked color="accent" />
      <Switch defaultChecked color="info" />
      <Switch defaultChecked color="success" />
      <Switch defaultChecked color="warning" />
      <Switch defaultChecked color="error" />
    </div>
  );
}
Demo.displayName = "SwitchColorDemo";
