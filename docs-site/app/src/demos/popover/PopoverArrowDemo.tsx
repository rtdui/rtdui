import React, { useState } from "react";
import { Popover, Button, FloatingSelect, Divider, Slider } from "@rtdui/core";

export default function Demo() {
	const [state, setState] = useState({
		arrowSize: 7,
		arrowRadius: 0,
		arrowOffset: 10,
		arrowPosition: "side",
	});
	return (
		<div className="flex gap-1">
			<div className="flex-1">
				<Popover
					defaultOpened={true}
					closeOnClickOutside={false}
					position="bottom-start"
					withArrow
					arrowSize={state.arrowSize}
					arrowPosition={state.arrowPosition as any}
					arrowRadius={state.arrowRadius}
					arrowOffset={state.arrowOffset}
					dropdownColor="primary"
				>
					<Popover.Target>
						<Button>popover</Button>
					</Popover.Target>
					<Popover.Dropdown>
						<div className="w-56 h-30 p-8">dropdown content</div>
					</Popover.Dropdown>
				</Popover>
			</div>
			<Divider direction="horizontal" />
			<div className="flex flex-col gap-2 p-4 bg-base-100">
				Arrow position:
				<FloatingSelect
					data={["side", "center"]}
					value={state.arrowPosition}
					onChange={(val) =>
						setState((prev) => ({ ...prev, arrowPosition: val }))
					}
				/>
				Arrow size:
				<Slider
					min={4}
					max={16}
					value={state.arrowSize}
					onChange={(val) => setState((prev) => ({ ...prev, arrowSize: val }))}
				/>
				Arrow radius:
				<Slider
					min={0}
					max={12}
					value={state.arrowRadius}
					onChange={(val) =>
						setState((prev) => ({ ...prev, arrowRadius: val }))
					}
				/>
				Arrow offset:
				<Slider
					min={10}
					max={50}
					value={state.arrowOffset}
					onChange={(val) =>
						setState((prev) => ({ ...prev, arrowOffset: val }))
					}
				/>
			</div>
		</div>
	);
}
Demo.displayName = "PopoverArrowDemo";
