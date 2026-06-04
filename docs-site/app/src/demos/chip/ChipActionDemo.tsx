import { useState } from "react";
import { Chip } from "@rtdui/core";

export default function Demo() {
  const [output, setOutput] = useState("");
  return (
    <div>
      <Chip
        color="primary"
        label="normal"
        onClick={() => setOutput("onClick")}
        onDelete={() => setOutput("onDelete")}
      />
      <div className="mt-4">console: {output}</div>
    </div>
  );
}
Demo.displayName = "ChipActionDemo";
