import { TextInput } from "@rtdui/core";

export default function () {
  return (
    <div className="flex flex-col gap-4 items-start">
      <TextInput placeholder="请输入" bordered size="xs" />
      <TextInput placeholder="请输入" bordered size="sm" />
      <TextInput placeholder="请输入" bordered size="md" />
      <TextInput placeholder="请输入" bordered size="lg" />
    </div>
  );
}
