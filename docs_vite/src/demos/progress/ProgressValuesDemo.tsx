import React from "react";
import { Progress } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Progress value={0} />
      <Progress value={10} />
      <Progress value={40} />
      <Progress value={70} />
    </div>
  );
}
Demo.displayName = "ProgressValuesDemo";
