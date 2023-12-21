import React from "react";
import { Link } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex gap-4 items-center">
      <Link href="/">go</Link>
    </div>
  );
}
Demo.displayName = "LinkBasicDemo";
