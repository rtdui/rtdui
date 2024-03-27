import { NumberInput } from "@rtdui/core";

export default function Demo() {
  return (
    <NumberInput
      allowNegative={false}
      allowDecimal={false}
      placeholder="只能是正整数"
    />
  );
}
Demo.displayName = "NumberInputPositiveIntegerDemo";
