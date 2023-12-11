import React from "react";
import { Kbd } from "@rtdui/core";

export default function () {
  return (
    <div className="flex gap-4 items-center">
      <Kbd>⌘</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌃</Kbd>
    </div>
  );
}
