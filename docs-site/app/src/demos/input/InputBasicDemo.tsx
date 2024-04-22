import { Divider, FloatingSelect, Input, Slider, Switch } from "@rtdui/core";
import { useState } from "react";

const variant = ["outline", "default", "ghost"];
const radius = ["xs", "sm", "md", "lg", "xl", "circle"];
const size = ["xs", "sm", "md", "lg", "xl"];
export default function Demo() {
  const [state, setState] = useState({
    variant: "outline",
    size: "sm",
    radius: "md",
    disabled: false,
    pointer: false,
  });
  return (
    <div className="flex">
      <Input
        className="flex-1"
        placeholder="input"
        variant={state.variant as any}
        size={state.size as any}
        radius={state.radius}
        pointer={state.pointer}
        disabled={state.disabled}
      />
      <Divider direction="horizontal" />
      <div className="flex flex-col gap-6 w-56">
        Variant:
        <FloatingSelect
          data={variant}
          value={state.variant}
          onChange={(val) => setState((prev) => ({ ...prev, variant: val }))}
        />
        Size:
        <Slider
          min={1}
          max={5}
          label={(val) => size[val - 1]}
          labelAlwaysOn
          value={size.indexOf(state.size) + 1}
          onChange={(val) =>
            setState((prev) => ({ ...prev, size: size[val - 1] }))
          }
        />
        Radius:
        <Slider
          min={1}
          max={6}
          label={(val) => radius[val - 1]}
          labelAlwaysOn
          value={radius.indexOf(state.radius) + 1}
          onChange={(val) =>
            setState((prev) => ({ ...prev, radius: radius[val - 1] }))
          }
        />
        <Switch
          label="Disabled"
          color="secondary"
          checked={state.disabled}
          onChange={(val) => setState((prev) => ({ ...prev, disabled: val }))}
        />
        <Switch
          label="Show pointer"
          color="secondary"
          checked={state.pointer}
          onChange={(val) => setState((prev) => ({ ...prev, pointer: val }))}
        />
      </div>
    </div>
  );
}

Demo.displayName = "InputBasicDemo";
