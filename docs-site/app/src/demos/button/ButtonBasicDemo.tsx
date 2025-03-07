import { useState } from "react";
import { Button, Divider, FloatingSelect, Slider, Switch } from "@rtdui/core";
import ColorControl from "~/src/components/ColorControl";

const sizes = ["xs", "sm", "md", "lg", "xl"];
export default function Demo() {
	const [state, setState] = useState({
		color: "primary",
		size: "md",
		ghost: false,
		outline: false,
		shape: "",
		link: false,
		wide: false,
		fullWidth: false,
		loading: false,
		loadingPositon: "left",
		disabled: false,
		soft: false, // v5 new
		dash: false, // v5 new
	});
	return (
		<div className="flex">
			<div className="flex-1">
				<Button
					color={state.color as any}
					size={state.size as any}
					wide={state.wide}
					fullWidth={state.fullWidth}
					loading={state.loading}
					loadingPosition={state.loadingPositon as any}
					disabled={state.disabled}
					link={state.link}
					ghost={state.ghost}
					outline={state.outline}
					soft={state.soft}
					dash={state.dash}
				>
					Button
				</Button>
			</div>
			<Divider direction="horizontal" />
			<div className="flex flex-col gap-4 bg-base-100 w-56 p-4">
				Color:
				<ColorControl
					extraColors={["neutral", "default"]}
					withPicker={false}
					value={state.color}
					onChange={(val) => setState((prev) => ({ ...prev, color: val }))}
				/>
				Size:
				<Slider
					min={0}
					max={4}
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
					label="wide"
					checked={state.wide}
					onChange={(val) => setState((prev) => ({ ...prev, wide: val }))}
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
					label="Soft style"
					checked={state.soft}
					onChange={(val) => setState((prev) => ({ ...prev, soft: val }))}
				/>
				<Switch
					color="secondary"
					label="Dash style"
					checked={state.dash}
					onChange={(val) => setState((prev) => ({ ...prev, dash: val }))}
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
