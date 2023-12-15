import React from "react";
import { Progress } from "@rtdui/core";

export default function ProgressAnimationDemo() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Progress color="primary" />
      <Progress color="secondary" />
      <Progress color="accent" />
      <Progress color="info" />
      <Progress color="success" />
      <Progress color="warning" />
      <Progress color="error" />
    </div>
  );
}
