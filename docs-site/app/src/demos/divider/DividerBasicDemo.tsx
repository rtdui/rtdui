import { useState } from "react";
import clsx from "clsx";
import { Divider, FloatingSelect, Switch } from "@rtdui/core";
import { CodeHighlight } from "@rtdui/code-highlight";
import ColorControl from "~/src/components/ColorControl";

const sizes = ["xs", "sm", "md", "lg"];
export default function Demo() {
  const [state, setState] = useState({
    showLabel: true,
    labelPostion: "center",
    direction: "vertical",
    color: "default",
  });

  const code = `
  <Divider${state.direction && state.direction !== "vertical" ? ' direction="' + state.direction + '"' : ""}${state.color !== "default" ? ' color="' + state.color + '"' : ""}${state.showLabel ? ' label="Label"' : ""}${state.showLabel && state.labelPostion !== "center" ? ' labelPostion="' + state.labelPostion + '"' : ""} />
`;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <div
          className={clsx("flex-1 h-96", {
            flex: state.direction === "horizontal",
            "flex flex-col": state.direction === "vertical",
          })}
        >
          <div className="flex-1 bg-base-200"></div>
          <Divider
            direction={state.direction as any}
            label={state.showLabel ? "Label" : undefined}
            labelPostion={state.labelPostion as any}
            color={(state.color !== "default" ? state.color : undefined) as any}
          />
          <div className="flex-1 bg-base-200"></div>
        </div>
        <Divider direction="horizontal" />
        <div className="flex flex-col gap-4 bg-base-100 w-56 p-4">
          Color:
          <ColorControl
            withPicker={false}
            extraColors={["default"]}
            value={state.color}
            onChange={(val) => setState((prev) => ({ ...prev, color: val }))}
          />
          Direction:
          <FloatingSelect
            data={["vertical", "horizontal"]}
            value={state.direction}
            onChange={(val) =>
              setState((prev) => ({ ...prev, direction: val }))
            }
          />
          <Switch
            color="secondary"
            label="Show label"
            checked={state.showLabel}
            onChange={(val) =>
              setState((prev) => ({ ...prev, showLabel: val }))
            }
          />
          Label position:
          <FloatingSelect
            disabled={!state.showLabel}
            data={["start", "center", "end"]}
            value={state.labelPostion}
            onChange={(val) =>
              setState((prev) => ({
                ...prev,
                labelPostion: val,
              }))
            }
          />
        </div>
      </div>
      <CodeHighlight language="tsx" code={code} />
    </div>
  );
}
Demo.displayName = "DividerBasicDemo";
