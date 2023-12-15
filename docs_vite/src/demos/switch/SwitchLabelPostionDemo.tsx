import { Switch } from "@rtdui/core";

export default function SwitchLabelPostionDemo() {
  return (
    <Switch
      required
      label="这是标签"
      labelPosition="right"
      helperText="(这是帮助文本)"
    />
  );
}
