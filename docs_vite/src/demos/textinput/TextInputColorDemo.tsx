import { TextInput } from "@rtdui/core";

export default function TextInputColorDemo() {
  return (
    <div className="flex flex-col gap-4 items-start">
      <TextInput placeholder="请输入" color="primary" />
      <TextInput placeholder="请输入" color="secondary" />
      <TextInput placeholder="请输入" color="accent" />
      <TextInput placeholder="请输入" color="info" />
      <TextInput placeholder="请输入" color="success" />
      <TextInput placeholder="请输入" color="warning" />
      <TextInput placeholder="请输入" color="error" />
    </div>
  );
}
