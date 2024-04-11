import { Divider, FloatingSelect, Slider, Switch } from "@rtdui/core";
import { useState } from "react";
import ColorControl from "~/src/components/ColorControl";
import { transitions } from "../../../../../packages/core/src/Transition/transitions";

const size = ["xs", "sm", "md", "lg", "xl"];
const radius = ["xs", "sm", "md", "lg"];

export default function Demo() {
  const data = ["React", "Vue", "Angular"];
  const [state, setState] = useState({
    color: "",
    orientation: "horizontal",
    fullWidth: false,
    withItemsSeparator: true,
    size: "sm",
    radius: "sm",
    disabled: false,
    readOnly: false,
    transitionDuration: 150,
  });
  return (
    <div className="flex">
      <div className="flex-1">
        <FloatingSelect
          data={data}
          color={state.color !== "" ? state.color : undefined}
          orientation={state.orientation as any}
          fullWidth={state.fullWidth}
          withItemsSeparator={state.withItemsSeparator}
          size={state.size as any}
          radius={state.radius as any}
          disabled={state.disabled}
          readOnly={state.readOnly}
          transitionDuration={state.transitionDuration}
        />
      </div>
      <Divider direction="horizontal" />
      <div className="flex flex-col gap-4 bg-base-100 p-4 w-72">
        Color:
        <ColorControl
          value={state.color}
          onChange={(val) => setState((prev) => ({ ...prev, color: val }))}
        />
        Orientation:
        <FloatingSelect
          data={["horizontal", "vertical"]}
          value={state.orientation}
          onChange={(val) =>
            setState((prev) => ({ ...prev, orientation: val }))
          }
        />
        Transition duration:
        <Slider
          min={0}
          max={9}
          value={state.transitionDuration / 100}
          onChange={(val) =>
            setState((prev) => ({ ...prev, transitionDuration: val * 100 }))
          }
          label={(v) => `${state.transitionDuration} ms`}
          labelAlwaysOn
          className="mt-2"
        />
        <Switch
          color="secondary"
          label="Full width:"
          checked={state.fullWidth}
          onChange={(val) => setState((prev) => ({ ...prev, fullWidth: val }))}
        />
        <Switch
          color="secondary"
          label="Width items separator:"
          checked={state.withItemsSeparator}
          onChange={(val) =>
            setState((prev) => ({ ...prev, withItemsSeparator: val }))
          }
        />
        Size:
        <Slider
          min={1}
          max={5}
          value={size.indexOf(state.size) + 1}
          onChange={(val) =>
            setState((prev) => ({ ...prev, size: size[val - 1] }))
          }
          label={(v) => size[v - 1]}
          labelAlwaysOn
        />
        Radius:
        <Slider
          min={1}
          max={4}
          value={radius.indexOf(state.radius) + 1}
          onChange={(val) =>
            setState((prev) => ({ ...prev, radius: radius[val - 1] }))
          }
          label={(v) => radius[v - 1]}
          labelAlwaysOn
        />
        <Switch
          color="secondary"
          label="ReadOnly"
          checked={state.readOnly}
          onChange={(val) => setState((prev) => ({ ...prev, readOnly: val }))}
        />
        <Switch
          color="secondary"
          label="Disabled"
          checked={state.disabled}
          onChange={(val) => setState((prev) => ({ ...prev, disabled: val }))}
        />
      </div>
    </div>
  );
}

Demo.displayName = "FloatingSelectBasicDemo";
