import React from "react";
import { Rating } from "@rtdui/core";

export default function Demo() {
  const [value, setValue] = React.useState(2);
  return (
    <>
      <Rating half value={value} onChange={setValue} />
      <div>当前星级: {value}</div>
    </>
  );
}
Demo.displayName = "RatingControlledDemo";
