import { TextInput } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4 items-start">
      <TextInput label="用户名" required error="必须的" bordered size="xs" />
    </div>
  );
}
Demo.displayName = "TextInputErrorDemo";
