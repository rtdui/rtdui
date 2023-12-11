import { RadioGroup, Radio } from "@rtdui/core";

export default function () {
  return (
    <RadioGroup
      color="primary"
      name="unControlledRadioGroup"
      defaultValue="a"
      label="这是RadioGroup"
    >
      <Radio value="a" label="这是标签1" />
      <Radio value="b" label="这是标签2" />
      <Radio value="c" label="这是标签3" />
      <Radio value="d" label="这是标签4" />
    </RadioGroup>
  );
}
