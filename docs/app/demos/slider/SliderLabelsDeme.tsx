import { Slider, RangeSlider } from "@rtdui/core";

export default function () {
  return (
    <div className="flex flex-col gap-10 py-8">
      no label
      <Slider defaultValue={35} label={null} />
      <RangeSlider defaultValue={[35, 65]} label={null} />
      custom label
      <Slider defaultValue={35} label={(v) => `${v} °C`} />
      <RangeSlider defaultValue={[35, 65]} label={(v) => `${v} °C`} />
      always visible
      <Slider defaultValue={35} labelAlwaysOn label={(v) => `${v} °C`} />
      <RangeSlider
        defaultValue={[35, 65]}
        labelAlwaysOn
        label={(v) => `${v} °C`}
      />
      label transition
      <Slider
        defaultValue={35}
        label={(v) => `${v} °C`}
        labelTransitionProps={{ transition: "expand" }}
      />
      <RangeSlider
        defaultValue={[35, 65]}
        label={(v) => `${v} °C`}
        labelTransitionProps={{ transition: "expand" }}
      />
    </div>
  );
}
