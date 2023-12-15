import React from "react";
import { DebouncedInput } from "@rtdui/core";

export default function DebouncedInputDefaultValueDemo() {
  const [output, setOutput] = React.useState("");
  return (
    <>
      <DebouncedInput
        defaultValue="1"
        onChange={(val) => setOutput(val.toString())}
        placeholder="search"
      />
      <div>输出: {output}</div>
    </>
  );
}
