import { Slider, RangeSlider } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 py-8">
      <Slider inverted defaultValue={35} />
      <RangeSlider inverted defaultValue={[35, 65]} />
    </div>
  );
}
Demo.displayName = "SliderInvertedDemo";
