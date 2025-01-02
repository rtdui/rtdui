import { CodeHighlight } from "@rtdui/code-highlight";
import { Divider, FloatingSelect, Slider, Switch, Tabs } from "@rtdui/core";
import { useState } from "react";

const radius = ["xs", "sm", "md", "lg", "circle"];
export default function Demo() {
	const [state, setState] = useState({
		activedTab: "tab1",
		variant: "default",
		radius: "md",
		grow: false,
		justify: "start",
		tab2Disabled: false,
	});

	const code = `
import { Tabs } from '@rtdui/core';

function Demo() {
  return (
    <Tabs inverted defaultValue="tab1">
      <Tabs.Panel value="tab1">
        tab1 content
      </Tabs.Panel>
      <Tabs.Panel value="tab2">
        tab2 content
      </Tabs.Panel>
      <Tabs.Panel value="tab3">
        tab3 content
      </Tabs.Panel>
      <Tabs.List>
        <Tabs.Tab value="tab1">tab1</Tabs.Tab>
        <Tabs.Tab value="tab2">tab2</Tabs.Tab>
        <Tabs.Tab value="tab3">tab3</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
`;
	return (
		<div>
			<div className="inverted-demo flex">
				<div className="flex-1 flex bg-base-100">
					<Tabs
						value={state.activedTab}
						onChange={(val) =>
							setState((prev) => ({ ...prev, activedTab: val as any }))
						}
						variant={state.variant as any}
						radius={state.radius}
						className="flex-1"
						inverted
					>
						<Tabs.Panel value="tab1" className="p-4">
							tab1 content
						</Tabs.Panel>
						<Tabs.Panel value="tab2" className="p-4">
							tab2 content
						</Tabs.Panel>
						<Tabs.Panel value="tab3" className="p-4">
							tab3 content
						</Tabs.Panel>
						<Tabs.List grow={state.grow} justify={state.justify as any}>
							<Tabs.Tab value="tab1">tab1</Tabs.Tab>
							<Tabs.Tab value="tab2" disabled={state.tab2Disabled}>
								tab2
							</Tabs.Tab>
							<Tabs.Tab value="tab3">tab3</Tabs.Tab>
						</Tabs.List>
					</Tabs>
				</div>
				<Divider direction="horizontal" />
				<div className="flex flex-col gap-4 w-72 bg-base-100 p-4">
					Variant:
					<FloatingSelect
						value={state.variant}
						onChange={(val) =>
							setState((prev) => ({ ...prev, variant: val as string }))
						}
						data={["default", "outline", "pills"]}
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
Demo.displayName = "TabsInvertedDemo";
