import React from "react";
import { RadialProgress } from "@rtdui/core";

export default function () {
  return (
    <div className="flex flex-col gap-4 items-center">
      <RadialProgress value={70} className="!bg-blue-600 !text-blue-300" />
      <RadialProgress value={70} className="!bg-green-600 !text-green-300" />
      <RadialProgress value={70} className="!bg-yellow-600 !text-yellow-300" />
      <RadialProgress value={70} className="!bg-red-600 !text-red-300" />
      <RadialProgress value={70} className="!bg-pink-600 !text-pink-300" />
    </div>
  );
}
