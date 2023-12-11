import { NumberInput } from "@rtdui/core";

export default function () {
  return (
    <NumberInput
      allowNegative={false}
      allowDecimal={false}
      placeholder="只能是正整数"
    />
  );
}
