import { TextInput } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-6">
      <TextInput label="outline变体" placeholder="请输入" />
      <TextInput label="default变体" placeholder="请输入" variant="default" />
      <TextInput label="ghost变体" placeholder="请输入" variant="ghost" />
    </div>
  );
}
Demo.displayName = "TextInputVariantDemo";
