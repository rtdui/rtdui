import { useState } from "react";
import { Button, Card, Divider, FloatingSelect, Switch } from "@rtdui/core";

export default function Demo() {
	const [state, setState] = useState({
		showImage: true,
		imagePositon: "top",
		shadow: "none",
	});
	return (
		<div className="flex">
			<div className="flex-1">
				<div>
					<Card
						shadow={(state.shadow === "none" ? undefined : state.shadow) as any}
						imageSrc={state.showImage ? "/shoe.jpg" : undefined}
						imagePositon={state.imagePositon as any}
						title="Shoes!"
						content="If a dog chews shoes whose shoes does he choose?"
						action={<Button color="primary">Buy Now</Button>}
						className="bg-base-100"
						style={{
							width:
								state.imagePositon !== "left" && state.imagePositon !== "right"
									? 300
									: 600,
						}}
						slots={{
							figure:
								state.imagePositon !== "left" && state.imagePositon !== "right"
									? "w-full h-48"
									: "shrink-0 w-2/5",
						}}
					/>
				</div>
			</div>
			<Divider direction="horizontal" />
			<div className="flex flex-col gap-4 bg-base-100 w-96 p-4">
				<Switch
					color="secondary"
					label="Show image"
					checked={state.showImage}
					onChange={(val) => setState((prev) => ({ ...prev, showImage: val }))}
				/>
				Image positon:
				<FloatingSelect
					disabled={!state.showImage}
					data={["top", "right", "bottom", "left", "overlay"]}
					value={state.imagePositon}
					onChange={(val) =>
						setState((prev) => ({ ...prev, imagePositon: val }))
					}
				/>
				Card shadow:
				<FloatingSelect
					data={["none", "xs", "sm", "md", "lg", "xl", "2xl"]}
					value={state.shadow}
					onChange={(val) => setState((prev) => ({ ...prev, shadow: val }))}
				/>
			</div>
		</div>
	);
}
Demo.displayName = "CardBasicDemo";
