import { TextArea } from "@rtdui/core";

export default function TextareaDemo() {
  return (
    <div className="flex flex-col gap-2">
      不限行数:
      <TextArea placeholder="请输入" />
      限制最大4行:
      <TextArea maxRows={4} placeholder="请输入" />
    </div>
  );
}
