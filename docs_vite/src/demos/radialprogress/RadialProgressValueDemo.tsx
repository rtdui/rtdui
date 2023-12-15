import React from "react";
import { RadialProgress } from "@rtdui/core";

export default function RadialProgressValueDemo() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <RadialProgress value={0} />
      <RadialProgress value={10} />
      <RadialProgress value={40} />
      <RadialProgress value={70} />
    </div>
  );
}
