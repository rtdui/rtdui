import { CodeHighlight } from "@rtdui/code-highlight";
import {
  Radio,
  RadioGroup,
  Slider,
  Switch,
  Tabs,
  ColorSwatch,
  Popover,
  ColorPicker,
  TextInput,
} from "@rtdui/core";
import { IconCheck, IconPalette } from "@tabler/icons-react";
import { useState } from "react";

const radius = ["xs", "sm", "md", "lg", "circle"];
export default function Demo() {
  const [state, setState] = useState({
    activedTab: "tab1",
    selectedColor: "primary",
    variant: "default",
    orientation: "horizontal",
    placement: "left",
    radius: "md",
    grow: false,
    justify: "start",
    tab2Disabled: false,
  });
  const code = `
import { Tabs } from '@rtdui/core';

function Demo() {
  return (
    <Tabs defaultValue="tab1"${state.variant !== "default" ? ' variant="' + state.variant + '"' : ""}${state.orientation !== "horizontal" ? ' orientation="' + state.orientation + '"' : ""}${state.placement !== "left" && state.orientation !== "horizontal" ? ' placement="' + state.placement + '"' : ""}${state.radius !== "md" ? ' radius="' + state.radius + '"' : ""}${state.selectedColor !== "primary" ? ' color="' + state.selectedColor + '"' : ""}>
      <Tabs.Panel value="tab1">
        tab1 content
      </Tabs.Panel>
      <Tabs.Panel value="tab2">
        tab2 content
      </Tabs.Panel>
      <Tabs.Panel value="tab3">
        tab3 content
      </Tabs.Panel>
      <Tabs.List${state.grow ? " grow" : ""}${state.justify !== "start" && !state.grow ? ' justify="' + state.justify + '"' : ""}>
        <Tabs.Tab value="tab1">tab1</Tabs.Tab>
        <Tabs.Tab value="tab2"${state.tab2Disabled ? " disabled" : ""}>tab2</Tabs.Tab>
        <Tabs.Tab value="tab3">tab3</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
`;
  return (
    <div>
      <div className="flex gap-32 p-4 bg-base-100">
        <div className="flex-1 flex">
          <Tabs
            value={state.activedTab}
            onChange={(val) =>
              setState((prev) => ({ ...prev, activedTab: val as any }))
            }
            variant={state.variant as any}
            radius={state.radius}
            color={state.selectedColor}
            orientation={state.orientation as any}
            placement={state.placement as any}
            className="flex-1"
          >
            <Tabs.List grow={state.grow} justify={state.justify as any}>
              <Tabs.Tab value="tab1">tab1</Tabs.Tab>
              <Tabs.Tab value="tab2" disabled={state.tab2Disabled}>
                tab2
              </Tabs.Tab>
              <Tabs.Tab value="tab3">tab3</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="tab1" className="p-4">
              tab1 content
            </Tabs.Panel>
            <Tabs.Panel value="tab2" className="p-4">
              tab2 content
            </Tabs.Panel>
            <Tabs.Panel value="tab3" className="p-4">
              tab3 content
            </Tabs.Panel>
          </Tabs>
        </div>
        <div className="flex flex-col gap-4 w-64">
          Color
          <div className="colors flex flex-wrap gap-0.5">
            {[
              "primary",
              "secondary",
              "accent",
              "info",
              "warning",
              "error",
              "success",
              "neutral",
            ].map((d) => (
              <ColorSwatch
                size="28px"
                radius="sm"
                key={d}
                color={d}
                onClick={() =>
                  setState((prev) => ({ ...prev, selectedColor: d }))
                }
              >
                {d === state.selectedColor && (
                  <IconCheck size="20" color="white" />
                )}
              </ColorSwatch>
            ))}
            <Popover>
              <Popover.Trigger>
                <ColorSwatch withShadow size="28px" radius="sm" color="white">
                  <IconPalette className="stroke-amber-500" />
                </ColorSwatch>
              </Popover.Trigger>
              <Popover.Dropdown>
                <div className="flex flex-col gap-2 bg-base-100 p-4 border border-base-300 rounded shadow">
                  <ColorPicker
                    format="hexa"
                    value={state.selectedColor}
                    onChange={(val) =>
                      setState((prev) => ({ ...prev, selectedColor: val }))
                    }
                  />
                  <TextInput value={state.selectedColor} readOnly />
                </div>
              </Popover.Dropdown>
            </Popover>
          </div>
          <RadioGroup
            value={state.variant}
            onChange={(val) =>
              setState((prev) => ({ ...prev, variant: val as string }))
            }
            label="Variant"
          >
            <Radio value="default" label="default" />
            <Radio value="outline" label="outline" />
            <Radio value="pills" label="pills" />
          </RadioGroup>
          <div className="flex flex-col gap-8">
            <RadioGroup
              value={state.orientation}
              onChange={(val) =>
                setState((prev) => ({ ...prev, orientation: val as string }))
              }
              label="Orientation"
            >
              <Radio value="horizontal" label="horizontal" />
              <Radio value="vertical" label="vertical" />
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-8">
            <RadioGroup
              value={state.placement}
              onChange={(val) =>
                setState((prev) => ({ ...prev, placement: val as string }))
              }
              label="Placement"
              disabled={state.orientation === "horizontal"}
            >
              <Radio value="left" label="left" />
              <Radio value="right" label="right" />
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-8">
            Radius
            <Slider
              min={1}
              max={5}
              value={radius.indexOf(state.radius) + 1}
              onChange={(val) =>
                setState((prev) => ({ ...prev, radius: radius[val - 1] }))
              }
              label={(v) => radius[v - 1]}
              labelAlwaysOn
            />
          </div>
          <div className="flex flex-col gap-8">
            <Switch
              color="secondary"
              checked={state.grow}
              onChange={(val) => setState((prev) => ({ ...prev, grow: val }))}
              label="Grow"
            />
          </div>
          <div className="flex flex-col gap-8">
            <RadioGroup
              disabled={state.grow}
              value={state.justify}
              onChange={(val) =>
                setState((prev) => ({ ...prev, justify: val as string }))
              }
              label="Justify"
            >
              <Radio value="start" label="start" />
              <Radio value="center" label="center" />
              <Radio value="end" label="end" />
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-8">
            <Switch
              color="secondary"
              checked={state.tab2Disabled}
              onChange={(val) =>
                setState((prev) => ({ ...prev, tab2Disabled: val }))
              }
              label="disable tab2"
            />
          </div>
        </div>
      </div>
      <CodeHighlight code={code} language="jsx" />
    </div>
  );
}
Demo.displayName = "TabsBasicDemo";
