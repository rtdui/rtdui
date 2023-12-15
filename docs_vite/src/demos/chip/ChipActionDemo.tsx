import React from "react";
import { Chip } from "@rtdui/core";

export default function ChipActionDemo() {
  const [output, setOutput] = React.useState("");
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
