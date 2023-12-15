import React from "react";
import { RadioGroup, Radio } from "@rtdui/core";

export default function RadioGroupColorAndSizeDemo() {
  return (
    <>
      <RadioGroup
        size="xs"
        color="primary"
        name="radioGroup1"
        label="xs size"
        helperText="(这是RadioGroup的帮助文本)"
      >
        <Radio value={1} label="Radio标签1" />
        <Radio value={2} label="Radio标签2" />
        <Radio value={3} label="Radio标签3" />
        <Radio value={4} label="Radio标签4" />
      </RadioGroup>
      <RadioGroup
        color="secondary"
        name="radioGroup2"
        label="sm size"
        helperText="(这是RadioGroup的帮助文本)"
      >
        <Radio value={1} label="Radio标签1" />
        <Radio value={2} label="Radio标签2" />
        <Radio value={3} label="Radio标签3" />
        <Radio value={4} label="Radio标签4" />
      </RadioGroup>
      <RadioGroup
        size="md"
        color="accent"
        name="radioGroup3"
        label="md size"
        helperText="(这是RadioGroup的帮助文本)"
      >
        <Radio value={1} label="Radio标签1" />
        <Radio value={2} label="Radio标签2" />
        <Radio value={3} label="Radio标签3" />
        <Radio value={4} label="Radio标签4" />
      </RadioGroup>
      <RadioGroup
        size="lg"
        color="info"
        name="radioGroup4"
        label="lg size"
        helperText="(这是RadioGroup的帮助文本)"
      >
        <Radio value={1} label="Radio标签1" />
        <Radio value={2} label="Radio标签2" />
        <Radio value={3} label="Radio标签3" />
        <Radio value={4} label="Radio标签4" />
      </RadioGroup>
      <RadioGroup
        color="success"
        name="radioGroup5"
        label="这是RadioGroup标签"
        helperText="(这是RadioGroup的帮助文本)"
      >
        <Radio value={1} label="Radio标签1" />
        <Radio value={2} label="Radio标签2" />
        <Radio value={3} label="Radio标签3" />
        <Radio value={4} label="Radio标签4" />
      </RadioGroup>
      <RadioGroup
        color="warning"
        name="radioGroup6"
        label="这是RadioGroup标签"
        helperText="(这是RadioGroup的帮助文本)"
      >
        <Radio value={1} label="Radio标签1" />
        <Radio value={2} label="Radio标签2" />
        <Radio value={3} label="Radio标签3" />
        <Radio value={4} label="Radio标签4" />
      </RadioGroup>
      <RadioGroup
        color="error"
        name="radioGroup7"
        label="这是RadioGroup标签"
        helperText="(这是RadioGroup的帮助文本)"
      >
        <Radio value={1} label="Radio标签1" />
        <Radio value={2} label="Radio标签2" />
        <Radio value={3} label="Radio标签3" />
        <Radio value={4} label="Radio标签4" />
      </RadioGroup>
    </>
  );
}
