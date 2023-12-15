import React from "react";
import { Button, TransitionGroup, Transition } from "@rtdui/core";

let count = 100;
export default function TransitionGroupDemo() {
  const [items, setItems] = React.useState(["Item 1", "Item 2", "Item 3"]);

  return (
    <div className="flex flex-col items-start gap-4">
      <TransitionGroup component={null}>
        {items.map((d) => (
          <Transition
            key={d}
            duration={{ enter: 500, exit: 250 }}
            unmountOnExit
          >
            {(ref, styles) => (
              <div ref={ref} style={styles} className="flex items-center gap-2">
                <Button
                  size="xs"
                  color="error"
                  onClick={() =>
                    setItems((prev) => prev.filter((dd) => dd !== d))
                  }
                >
                  x
                </Button>
                {d}
              </div>
            )}
          </Transition>
        ))}
      </TransitionGroup>
      <Button
        type="button"
        color="info"
        onClick={() => setItems((prev) => [...prev, `Item ${++count}`])}
      >
        添加
      </Button>
    </div>
  );
}
