import React from "react";
import { Progress } from "@rtdui/core";

export default function () {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Progress value={70} size="lg" />
      <Progress value={70} size="md" />
      <Progress value={70} size="sm" />
      <Progress value={70} size="xs" />
    </div>
  );
}
