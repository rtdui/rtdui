import React from "react";
import { Button, Transition } from "@rtdui/core";

const transitions = {
  fade: "逐渐显现",
  "skew-up": "从上倾斜",
  "skew-down": "从下倾斜",
  "rotate-right": "右侧旋转",
  "rotate-left": "左侧旋转",
  "slide-left": "向左滑入",
  "slide-right": "向右滑入",
  "slide-down": "向下滑入",
  "slide-up": "向上滑入",
  scale: "中心缩放",
  "scale-y": "垂直缩放",
  "scale-x": "水平缩放",
  expand: "中心展开",
  "expand-x": "水平展开",
  "expand-y": "垂直展开",
  pop: "中心弹出",
  "pop-top-left": "左上弹出",
  "pop-top-right": "右上弹出",
  "pop-bottom-left": "左下弹出",
  "pop-bottom-right": "右下弹出",
};

const initial = {
  fade: false,
  "skew-up": false,
  "skew-down": false,
  "rotate-left": false,
  "rotate-right": false,
  "slide-left": false,
  "slide-right": false,
  "slide-down": false,
  "slide-up": false,
  scale: false,
  "scale-y": false,
  "scale-x": false,
  expand: false,
  "expand-x": false,
  "expand-y": false,
  pop: false,
  "pop-top-left": false,
  "pop-top-right": false,
  "pop-bottom-left": false,
  "pop-bottom-right": false,
};
function reducer(state: typeof initial, action: Record<string, any>) {
  const [[name, value]] = Object.entries(action);
  return { ...state, [name]: value };
}

export default function () {
  const [state, dispatch] = React.useReducer(reducer, initial);
  return (
    <div className="flex flex-wrap gap-4 items-center">
      {Object.entries(transitions).map((d) => {
        const [name, label] = d;
        return (
          <div key={name}>
            <Button
              type="button"
              noAnimation
              // onClick={() =>
              //   dispatch({ [name]: !state[name as keyof typeof initial] })
              // }
              onMouseEnter={() => dispatch({ [name]: true })}
              onMouseLeave={() => dispatch({ [name]: false })}
            >
              {label}
            </Button>
            <Transition
              in={state[name as keyof typeof initial]}
              transition={name as keyof typeof initial}
              duration={1000}
            >
              {(ref, styles) => (
                <div
                  ref={ref}
                  style={styles}
                  className="bg-neutral text-neutral-content p-2 rounded-md pointer-events-none w-fit"
                >
                  {name}
                </div>
              )}
            </Transition>
          </div>
        );
      })}
    </div>
  );
}
