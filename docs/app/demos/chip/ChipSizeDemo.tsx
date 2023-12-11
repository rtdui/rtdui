import { Chip } from "@rtdui/core";

export default function () {
  return (
    <div className="flex gap-4 items-center lg:justify-center">
      <Chip label="normal" onDelete={() => {}} />
      <Chip label="small" onDelete={() => {}} size="small" />
    </div>
  );
}
