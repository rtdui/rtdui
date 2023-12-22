import React from "react";
import { Kbd } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex gap-4 items-center">
      <Kbd>A</Kbd>
      <Kbd>B</Kbd>
      <Kbd>C</Kbd>
      <Kbd>D</Kbd>
    </div>
  );
}
Demo.displayName = "KbdCharacterDemo";
