import { CodeHighlight } from "@rtdui/code-highlight";
import { Slider, Switch, Tabs, Divider, FloatingSelect } from "@rtdui/core";
import { useState } from "react";
import ColorControl from "~/src/components/ColorControl";

const radius = ["xs", "sm", "md", "lg", "circle"];
export default function Demo() {
  const [state, setState] = useState({
    activedTab: "tab1",
    color: "primary",
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
    <Tabs defaultValue="tab1"${state.variant !== "default" ? ' variant="' + state.variant + '"' : ""}${state.orientation !== "horizontal" ? ' orientation="' + state.orientation + '"' : ""}${state.placement !== "left" && state.orientation !== "horizontal" ? ' placement="' + state.placement + '"' : ""}${state.radius !== "md" ? ' radius="' + state.radius + '"' : ""}${state.color !== "primary" ? ' color="' + state.color + '"' : ""}>
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
      <div className="flex">
        <div className="flex-1 flex bg-base-100 p-4">
          <Tabs
            value={state.activedTab}
            onChange={(val) =>
              setState((prev) => ({ ...prev, activedTab: val as any }))
            }
            variant={state.variant as any}
            radius={state.radius}
            color={state.color}
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
        <Divider direction="horizontal" />
        <div className="flex flex-col gap-4 w-72 bg-base-100 p-4">
          Color
          <ColorControl
            value={state.color}
            onChange={(val) => setState((prev) => ({ ...prev, color: val }))}
          />
          Variant:
          <FloatingSelect
            value={state.variant}
            onChange={(val) =>
              setState((prev) => ({ ...prev, variant: val as string }))
            }
            data={["default", "outline", "pills"]}
          />
          Orientation:
          <FloatingSelect
            value={state.orientation}
            onChange={(val) =>
              setState((prev) => ({ ...prev, orientation: val as string }))
            }
            data={["horizontal", "vertical"]}
          />
          Placement:
          <FloatingSelect
            value={state.placement}
            onChange={(val) =>
              setState((prev) => ({ ...prev, placement: val as string }))
            }
            data={["left", "right"]}
          />
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
          Justify:
          <FloatingSelect
            value={state.justify}
            onChange={(val) =>
              setState((prev) => ({ ...prev, justify: val as string }))
            }
            data={["start", "center", "end"]}
          />
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
