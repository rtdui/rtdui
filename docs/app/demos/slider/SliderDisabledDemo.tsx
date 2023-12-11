import { Slider, RangeSlider } from "@rtdui/core";

export default function () {
  return (
    <div className="flex flex-col gap-10 py-4">
      <Slider disabled labelAlwaysOn defaultValue={35} />
      <RangeSlider disabled labelAlwaysOn defaultValue={[35, 65]} />
    </div>
  );
}
