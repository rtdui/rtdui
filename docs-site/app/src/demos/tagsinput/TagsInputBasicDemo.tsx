import { useState } from "react";
import { Divider, Slider, Switch, TagsInput } from "@rtdui/core";

const maxTagsValues = [1, 2, 3, Number.POSITIVE_INFINITY];

export default function Demo() {
  const [state, setState] = useState({
    readOnly: false,
    disabled: false,
    clearable: false,
    allowDuplicates: false,
    maxTags: Number.POSITIVE_INFINITY,
  });
  return (
    <div className="flex">
      <TagsInput
        inputWrapperOrder={["label", "input", "description"]}
        label="tags input"
        description="输入值然后按回车键或逗号键试试"
        placeholder="请输入"
        className="flex-1"
        clearable={state.clearable}
        allowDuplicates={state.allowDuplicates}
        maxTags={state.maxTags}
        disabled={state.disabled}
        readOnly={state.readOnly}
      />
      <Divider direction="horizontal" />
      <div className="flex flex-col gap-6 p-4 bg-base-100 w-56">
        <Switch
          label="Clearable"
          checked={state.clearable}
          onChange={(val) => setState((prev) => ({ ...prev, clearable: val }))}
        />
        <Switch
          label="Allow duplicates"
          checked={state.allowDuplicates}
          onChange={(val) =>
            setState((prev) => ({ ...prev, allowDuplicates: val }))
          }
        />
        <Switch
          label="ReadOnly"
          checked={state.readOnly}
          onChange={(val) => setState((prev) => ({ ...prev, readOnly: val }))}
        />
        <Switch
          label="Disabled"
          checked={state.disabled}
          onChange={(val) => setState((prev) => ({ ...prev, disabled: val }))}
        />
        MaxTags:
        <Slider
          min={1}
          max={4}
          labelAlwaysOn
          label={(v) => maxTagsValues[v - 1]}
          value={maxTagsValues.indexOf(state.maxTags) + 1}
          onChange={(val) =>
            setState((prev) => ({ ...prev, maxTags: maxTagsValues[val - 1] }))
          }
        />
      </div>
    </div>
  );
}
Demo.displayName = "TagsInputBasicDemo";
