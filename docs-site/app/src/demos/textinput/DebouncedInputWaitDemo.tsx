import React from "react";
import { DebouncedInput } from "@rtdui/core";

export default function Demo() {
  const [output, setOutput] = React.useState("");
  return (
    <>
      <DebouncedInput
        wait={1000}
        onChange={(val) => setOutput(val.toString())}
        placeholder="Search"
      />
      <div>输出: {output}</div>
    </>
  );
}
Demo.displayName = "DebouncedInputWaitDemo";
