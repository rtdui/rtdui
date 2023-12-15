import React from "react";
import { Kbd } from "@rtdui/core";

export default function KbdCompositeDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Kbd>ctrl</Kbd>+<Kbd>shift</Kbd>+<Kbd>del</Kbd>
      </div>
      <div>
        <Kbd size="xs">ctrl</Kbd>+<Kbd size="xs">shift</Kbd>+
        <Kbd size="xs">del</Kbd>
      </div>
    </div>
  );
}
