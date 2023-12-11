import { NumberInput } from "@rtdui/core";

export default function () {
  return (
    <div className="flex flex-col gap-2">
      blur模式(默认模式)
      <NumberInput
        min={10}
        max={20}
        step={1}
        placeholder="min为 10, max为 20, step为 1"
      />
      strict模式
      <NumberInput
        min={-10}
        max={20}
        step={1}
        clampBehavior="strict"
        placeholder="min为 -10, max为 20, step为 1"
      />
    </div>
  );
}
