import React from "react";
import { Slider, RangeSlider } from "@rtdui/core";

export default function () {
  const [color, setColor] = React.useState("#0000ff");
  return (
    <div className="flex flex-col gap-10 py-8">
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <Slider defaultValue={35} color={color} />
      <RangeSlider defaultValue={[35, 65]} color={color} />
    </div>
  );
}
