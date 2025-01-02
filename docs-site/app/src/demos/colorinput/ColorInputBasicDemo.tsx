import React from "react";
import { ColorInput, Divider, Select, Slider, Switch } from "@rtdui/core";
import { CodeHighlight } from "@rtdui/code-highlight";

const size = ["xs", "sm", "md", "lg", "xl"];
const swatches = [
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
		value: "#fff",
		size: "md",
		disallowInput: false,
		readOnly: false,
		disabled: false,
		format: "hex",
		withPicker: true,
		withSwatches: false,
		closeOnColorSwatchClick: false,
	});

	const code = `
import { ColorInput } from '@rtdui/core';

function Demo() {
  return (
    <ColorInput${state.format !== "hex" ? ` format="${state.format}"` : ""}${state.withSwatches ? ` swatches={${JSON.stringify(swatches)}}` : ""}${state.size !== "md" ? ` size="${state.size}"` : ""}${state.disallowInput ? " disallowInput" : ""}${state.readOnly ? " readOnly" : ""}${state.readOnly ? " disabled" : ""}${state.withPicker === false ? " withPicker={false}" : ""} />
  );
}
`;

	return (
		<div className="flex flex-col gap-2">
			<div className="flex">
				<div className="flex-1">
					<ColorInput
						size={state.size as any}
						value={state.value}
						onChange={(val) => setState((prev) => ({ ...prev, value: val }))}
						readOnly={state.readOnly}
						disabled={state.disabled}
						disallowInput={state.disallowInput}
						format={state.format as any}
						withPicker={state.withPicker}
						swatches={state.withSwatches ? swatches : undefined}
						closeOnColorSwatchClick={state.closeOnColorSwatchClick}
					/>
				</div>
				<Divider direction="horizontal" />
				<div className="flex flex-col gap-4 w-72 bg-base-100 p-4">
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
						label="with swatches"
						checked={state.withSwatches}
						onChange={(val) =>
							setState((prev) => ({ ...prev, withSwatches: val }))
						}
					/>
					<Switch
						color="secondary"
						label="closeOnColorSwatchClick"
						disabled={!state.withSwatches}
						checked={state.closeOnColorSwatchClick}
						onChange={(val) =>
							setState((prev) => ({ ...prev, closeOnColorSwatchClick: val }))
						}
					/>
					<Switch
						color="secondary"
						label="withPicker"
						checked={state.withPicker}
						onChange={(val) =>
							setState((prev) => ({
								...prev,
								withPicker: val,
								withSwatches: val === false ? true : prev.withSwatches,
							}))
						}
					/>
					<div className="flex flex-col gap-8">
						Size
						<Slider
							min={1}
							max={4}
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
						label="disallowInput"
						checked={state.disallowInput}
						onChange={(val) =>
							setState((prev) => ({ ...prev, disallowInput: val }))
						}
					/>
					<Switch
						color="secondary"
						label="readOnly"
						checked={state.readOnly}
						onChange={(val) => setState((prev) => ({ ...prev, readOnly: val }))}
					/>
					<Switch
						color="secondary"
						label="disabled"
						checked={state.disabled}
						onChange={(val) => setState((prev) => ({ ...prev, disabled: val }))}
					/>
				</div>
			</div>
			<CodeHighlight code={code} language="jsx" />
		</div>
	);
}
Demo.displayName = "ColorInputBasicDemo";
