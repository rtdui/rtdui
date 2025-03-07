import { useState } from "react";
import { Avatar, Divider, FloatingSelect, Slider, Switch } from "@rtdui/core";
import { CodeHighlight } from "@rtdui/code-highlight";

const sizes = ["xs", "sm", "md", "lg", "xl"];
export default function Demo() {
	const [state, setState] = useState({
		size: "md",
		variant: "circle",
		showOnlineIndicator: false,
		online: false,
	});

	const code = `
  <Avatar${state.size && state.size !== "md" ? ` size="${state.size}"` : ""}${state.variant && state.variant !== "circle" ? ` variant="${state.variant}"` : ""}${state.showOnlineIndicator ? (state.online ? " online" : " online={false}") : ""} src="/photo-1534528741775-53994a69daeb.jpg" />
`;
	return (
		<div className="flex flex-col gap-2">
			<div className="flex">
				<div className="flex-1">
					<Avatar
						variant={state.variant as any}
						size={state.size as any}
						online={state.showOnlineIndicator ? state.online : undefined}
						src="/photo-1534528741775-53994a69daeb.jpg"
					/>
				</div>
				<Divider direction="horizontal" />
				<div className="flex flex-col gap-4 bg-base-100 w-56 p-4">
					Variant:
					<FloatingSelect
						data={["circle", "square"]}
						value={state.variant}
						onChange={(val) => setState((prev) => ({ ...prev, variant: val }))}
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
						label="Show online indicator"
						checked={state.showOnlineIndicator}
						onChange={(val) =>
							setState((prev) => ({ ...prev, showOnlineIndicator: val }))
						}
					/>
					Online:
					<FloatingSelect
						data={["true", "false"]}
						value={state.online ? "true" : "false"}
						onChange={(val) =>
							setState((prev) => ({
								...prev,
								online: val === "true",
							}))
						}
					/>
				</div>
			</div>
			<CodeHighlight language="tsx" code={code} />
		</div>
	);
}
Demo.displayName = "AvatarSizeDemo";
