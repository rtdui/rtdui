import React from "react";
import { ColorPicker, Divider, Select, Slider, Switch } from "@rtdui/core";
import { CodeHighlight } from "@rtdui/code-highlight";

const size = ["xs", "sm", "md", "lg", "xl"];
const swatches = [
	"primary",
	"secondary",
	"accent",
	"info",
	"warning",
	"error",
	"success",
	"neutral",
	"#2e2e2e",
	"#868e96",
	"#fa5252",
	"#e64980",
	"#be4bdb",
	"#7950f2",
	"#4c6ef5",
	"#228be6",
	"#15aabf",
	"#12b886",
	"#40c057",
	"#82c91e",
	"#fab005",
	"#fd7e14",
];
export default function Demo() {
	const [state, setState] = React.useState({
		format: "hex",
		color: "#fff",
		size: "md",
		fullWidth: false,
		withSwatches: false,
	});

	const code = `
import { ColorPicker } from '@rtdui/core';

function Demo() {
  return (
    <ColorPicker${state.format !== "hex" ? ` format="${state.format}"` : ""}${state.withSwatches ? ` swatches={${JSON.stringify(swatches)}}` : ""}${state.size !== "md" && !state.fullWidth ? ` size="${state.size}"` : ""} ${state.fullWidth ? "fullWidth" : ""}/>
  );
}
`;

	return (
		<div className="flex flex-col gap-2">
			<div className="flex">
				<div className="flex-1">
					<ColorPicker
						color={state.color}
						onChange={(val) => setState((prev) => ({ ...prev, color: val }))}
						format={state.format as any}
						size={state.size}
						fullWidth={state.fullWidth}
						swatches={state.withSwatches ? swatches : undefined}
						className="bg-base-100"
					/>
					<p className="ml-1 mt-4 bg-base-100">{state.color}</p>
				</div>
				<Divider direction="horizontal" />
				<div className="flex flex-col gap-4 w-64 bg-base-100 p-4">
					<Select
						label="Format"
						value={state.format}
						onChange={(val) =>
							setState((prev) => ({
								...prev,
								format: val as string,
							}))
						}
						data={[
							{ value: "hex", label: "hex" },
							{ value: "rgb", label: "rgb" },
							{ value: "hsl", label: "hsl" },
							{ value: "hwb", label: "hwb" },
							{ value: "lch", label: "lch" },
							{ value: "oklch", label: "oklch" },
							{ value: "lab", label: "lab" },
							{ value: "oklab", label: "oklab" },
						]}
					/>
					<Switch
						color="secondary"
						label="With swatches"
						checked={state.withSwatches}
						onChange={(val) =>
							setState((prev) => ({ ...prev, withSwatches: val }))
						}
					/>
					<div className="flex flex-col gap-8">
						Size
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
					</div>
					<Switch
						color="secondary"
						label="Full width"
						checked={state.fullWidth}
						onChange={(val) =>
							setState((prev) => ({ ...prev, fullWidth: val }))
						}
					/>
				</div>
			</div>
			<CodeHighlight code={code} language="jsx" />
		</div>
	);
}
Demo.displayName = "ColorPickerBasicDemo";
