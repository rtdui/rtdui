import { NumberInput } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-2">
      <NumberInput prefix="￥" placeholder="自动带￥前缀" />
      <NumberInput suffix="%" placeholder="自动带%后缀" />
    </div>
  );
}
Demo.displayName = "NumberInputPrefixDemo";
