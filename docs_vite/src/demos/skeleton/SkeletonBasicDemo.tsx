import React from "react";
import { Skeleton } from "@rtdui/core";

export default function SkeletonBasicDemo() {
  return (
    <div className="flex flex-col gap-4 bg-base-100 p-4">
      <div className="flex gap-4">
        <Skeleton circle className="w-10 h-10" />
        <div className="flex-grow flex flex-col gap-4">
          <Skeleton paragraph className="h-2" />
          <Skeleton paragraph className="h-2" />
          <Skeleton paragraph className="w-9/12 h-2" />
        </div>
      </div>
      <div className="flex gap-4">
        <Skeleton box className="w-full h-20" />
      </div>
    </div>
  );
}
