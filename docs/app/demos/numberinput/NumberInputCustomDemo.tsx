import { NumberInput } from "@rtdui/core";

export default function () {
  return (
    <NumberInput
      placeholder="请输入支付金额(无法输入负数或0)"
      isAllowed={(values) => {
        if (values.value === "-" || values.floatValue! <= 0) {
          return false;
        }
        return true;
      }}
    />
  );
}
