import React from "react";
import { Steps, Button } from "@rtdui/core";

const steps = [
	{ description: "步骤1" },
	{ description: "步骤2" },
	{ description: "步骤3" },
	{ description: "步骤4" },
	{ description: "步骤5" },
	{ description: "步骤6" },
	{ description: "步骤7" },
];

export default function Demo() {
	const ref = React.useRef(null!);
	return (
		<>
			<Steps ref={ref} steps={steps} sequential={true} />
			<Button onClick={(e) => (ref.current as any).next()}>下一步</Button>
		</>
	);
}
Demo.displayName = "StepsSequentialDemo";
