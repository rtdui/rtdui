import { NumberInput } from "@rtdui/core";

export default function NumberInputPositiveIntegerDemo() {
  return (
    <NumberInput
      allowNegative={false}
      allowDecimal={false}
      placeholder="只能是正整数"
    />
  );
}
