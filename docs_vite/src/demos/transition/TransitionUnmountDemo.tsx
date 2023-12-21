import React from "react";
import { Button, Transition } from "@rtdui/core";

export default function Demo() {
  const [state, setState] = React.useState(false);
  return (
    <div className="flex flex-col items-center">
      <Button
        type="button"
        noAnimation
        // onClick={() => setState((prev) => !prev)}
        onMouseEnter={() => setState(true)}
        onMouseLeave={() => setState(false)}
      >
        初始不挂载,过渡结束卸载
      </Button>
      <Transition in={state} unmountOnExit transition="fade" duration={1000}>
        {(ref, styles) => (
          <div
            ref={ref}
            style={styles}
            className="bg-neutral text-neutral-content p-2 rounded-md pointer-events-none"
          >
            fade
          </div>
        )}
      </Transition>
    </div>
  );
}
Demo.displayName = "TransitionUnmountDemo";
