import { NumberInput } from "@rtdui/core";

export default function () {
  return (
    <div className="flex flex-col gap-2">
      readOnly:
      <NumberInput readOnly placeholder="只读的" />
      disabled:
      <NumberInput disabled placeholder="禁用的" />
    </div>
  );
}
