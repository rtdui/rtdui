import { NumberInput } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <NumberInput
        thousandsGroupStyle="thousand"
        placeholder="自动千分位显示"
      />
      <NumberInput thousandsGroupStyle="wan" placeholder="自动万分位显示" />
      <NumberInput thousandsGroupStyle="lakh" placeholder="自动百分位显示" />
    </div>
  );
}
Demo.displayName = "NumberInputThousandsGroupDemo";
