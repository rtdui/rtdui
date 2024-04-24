import { useState } from "react";
import { Button, Divider, FloatingSelect, Slider, Switch } from "@rtdui/core";
import ColorControl from "~/src/components/ColorControl";

const sizes = ["xs", "sm", "md", "lg"];
export default function Demo() {
  const [state, setState] = useState({
    color: "default",
    size: "md",
    ghost: false,
    outline: false,
    sharp: "",
    link: false,
    fullWidth: false,
    noAnimation: false,
    loading: false,
    loadingPositon: "left",
    disabled: false,
  });
  return (
    <div className="flex">
      <div className="flex-1">
        <Button
          color={state.color as any}
          size={state.size as any}
          fullWidth={state.fullWidth}
          ghost={state.ghost}
          outline={state.outline}
          link={state.link}
          noAnimation={state.noAnimation}
          loading={state.loading}
          loadingPosition={state.loadingPositon as any}
          disabled={state.disabled}
        >
          Button
        </Button>
      </div>
      <Divider direction="horizontal" />
      <div className="flex flex-col gap-4 bg-base-100 w-56 p-4">
        Color:
        <ColorControl
          extraColors={["default"]}
          withPicker={false}
          value={state.color}
          onChange={(val) => setState((prev) => ({ ...prev, color: val }))}
        />
        Size:
        <Slider
          min={0}
          max={3}
          labelAlwaysOn
          label={(v) => sizes[v]}
          value={sizes.indexOf(state.size)}
          onChange={(val) =>
            setState((prev) => ({ ...prev, size: sizes[val] }))
          }
        />
        <Switch
          color="secondary"
          label="Disabled"
          checked={state.disabled}
          onChange={(val) => setState((prev) => ({ ...prev, disabled: val }))}
        />
        <Switch
          color="secondary"
          label="Full width"
          checked={state.fullWidth}
          onChange={(val) => setState((prev) => ({ ...prev, fullWidth: val }))}
        />
        <Switch
          color="secondary"
          label="Outline style"
          checked={state.outline}
          onChange={(val) => setState((prev) => ({ ...prev, outline: val }))}
        />
        <Switch
          color="secondary"
          label="Ghost style"
          checked={state.ghost}
          onChange={(val) => setState((prev) => ({ ...prev, ghost: val }))}
        />
        <Switch
          color="secondary"
          label="Link style"
          checked={state.link}
          onChange={(val) => setState((prev) => ({ ...prev, link: val }))}
        />
        <Switch
          color="secondary"
          label="With loading"
          checked={state.loading}
          onChange={(val) => setState((prev) => ({ ...prev, loading: val }))}
        />
        Loading positon:
        <FloatingSelect
          disabled={!state.loading}
          data={["left", "right"]}
          value={state.loadingPositon}
          onChange={(val) =>
            setState((prev) => ({ ...prev, loadingPositon: val }))
          }
        />
      </div>
    </div>
  );
}
Demo.displayName = "ButtonBasicDemo";
