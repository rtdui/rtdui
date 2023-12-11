import React from "react";
import { Transition } from "@rtdui/core";

export default function () {
  return (
    <div className="flex flex-col items-center gap-4">
      <Transition in transition="fade" duration={1000}>
        {(ref, styles) => (
          <div
            ref={ref}
            style={styles}
            className="bg-neutral text-neutral-content p-2 rounded-md pointer-events-none"
          >
            no appear
          </div>
        )}
      </Transition>

      <Transition in appear transition="fade" duration={1000}>
        {(ref, styles) => (
          <div
            ref={ref}
            style={styles}
            className="bg-neutral text-neutral-content p-2 rounded-md pointer-events-none"
          >
            with appear
          </div>
        )}
      </Transition>
    </div>
  );
}
