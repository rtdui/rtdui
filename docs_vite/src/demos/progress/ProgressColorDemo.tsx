import React from "react";
import { Progress } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Progress value={10} color="primary" />
      <Progress value={30} color="secondary" />
      <Progress value={40} color="accent" />
      <Progress value={70} color="info" />
      <Progress value={80} color="success" />
      <Progress value={90} color="warning" />
      <Progress value={100} color="error" />
    </div>
  );
}
Demo.displayName = "ProgressColorDemo";
