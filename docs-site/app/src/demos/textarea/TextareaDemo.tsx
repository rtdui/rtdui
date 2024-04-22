import { TextArea } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-2">
      自动高度不受限制:
      <TextArea autosize placeholder="请输入" />
      限制自动增长最大为4行:
      <TextArea autosize maxRows={4} placeholder="请输入" />
    </div>
  );
}
Demo.displayName = "TextareaDemo";
