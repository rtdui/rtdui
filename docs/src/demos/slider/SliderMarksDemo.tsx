import { Slider, RangeSlider } from "@rtdui/core";

const marks = [{ value: 20 }, { value: 50 }, { value: 80 }];

const marksWithLabel = [
  { value: 20, label: "20%" },
  { value: 50, label: "50%" },
  { value: 80, label: "80%" },
];
export default function Demo() {
  return (
    <div className="flex flex-col gap-10 py-8">
      <Slider defaultValue={35} marks={marks} />
      <Slider defaultValue={45} marks={marksWithLabel} />
      <RangeSlider defaultValue={[35, 65]} marks={marks} />
      <RangeSlider defaultValue={[45, 75]} marks={marksWithLabel} />
    </div>
  );
}
Demo.displayName = "SliderMarksDemo";
