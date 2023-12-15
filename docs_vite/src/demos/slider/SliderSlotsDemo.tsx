import React from "react";
import { RangeSlider } from "@rtdui/core";

const marks = [
  { value: 20, label: "20%" },
  { value: 50, label: "50%" },
  { value: 80, label: "80%" },
];

const outline = "!outline !outline-2 !outline-offset-1 !outline-red-500";
export default function SliderSlotsDemo() {
  const [slots, setSlots] = React.useState({});
  return (
    <div className="flex flex-col gap-12 py-4">
      <div className="flex flex-wrap gap-4 bg-base-200 rounded-box p-4">
        <div
          className="cursor-pointer"
          onClick={() =>
            setSlots({
              root: outline,
            })
          }
        >
          root
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            setSlots({
              trackContainer: outline,
            })
          }
        >
          trackContainer
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            setSlots({
              track: outline,
            })
          }
        >
          track
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            setSlots({
              bar: outline,
            })
          }
        >
          bar
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            setSlots({
              mark: outline,
            })
          }
        >
          mark
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            setSlots({
              markLabel: outline,
            })
          }
        >
          markLabel
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            setSlots({
              thumb: outline,
            })
          }
        >
          thumb
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            setSlots({
              label: outline,
            })
          }
        >
          label
        </div>
      </div>
      <RangeSlider
        id="tours"
        defaultValue={[35, 65]}
        labelAlwaysOn
        marks={marks}
        slots={slots}
      />
    </div>
  );
}
