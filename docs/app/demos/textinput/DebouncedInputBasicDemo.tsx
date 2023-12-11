import React from "react";
import { DebouncedInput } from "@rtdui/core";

export default function () {
  const [output, setOutput] = React.useState("");
  return (
    <>
      <DebouncedInput
        onChange={(val) => setOutput(val.toString())}
        placeholder="Search"
      />
      <div>输出: {output}</div>
    </>
  );
}
