import { TextInput } from "@rtdui/core";

export default function Demo() {
  return (
    <TextInput
      placeholder="请输入"
      required
      label="这是标签"
      helperText="(这是帮助文本)"
    />
  );
}
Demo.displayName = "TextInputLabelDemo";
