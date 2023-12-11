import React from "react";
import { Indicator } from "@rtdui/core";

export default function () {
  return (
    <Indicator badgeText="New">
      <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
        Content
      </div>
    </Indicator>
  );
}
