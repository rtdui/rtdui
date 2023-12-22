import React from "react";
import { Button, Transition } from "@rtdui/core";

export default function Demo() {
  const [inState, setInState] = React.useState(false);
  return (
    <div className="flex flex-col gap-4 rounded-lg items-center">
      <Button onClick={() => setInState(!inState)}>过渡</Button>
      <Transition
        in={inState}
        duration={1000}
        unmountOnExit={false}
        transition={{
          in: { width: "400px", height: "200px" },
          out: { width: "200px", height: "100px" },
          transitionProperty: "width,height",
        }}
      >
        {(ref, styles) => (
          <div
            ref={ref}
            className="bg-neutral text-neutral-content p-4 rounded-lg"
            style={styles}
          >
            自定义过渡
          </div>
        )}
      </Transition>
    </div>
  );
}
Demo.displayName = "TransitionCustomDemo";
