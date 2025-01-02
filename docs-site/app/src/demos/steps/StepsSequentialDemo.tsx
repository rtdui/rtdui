import React from "react";
import { Steps, Button } from "@rtdui/core";

const items = ["步骤1", "步骤2", "步骤3", "步骤4", "步骤5", "步骤6", "步骤7"];

export default function Demo() {
	const ref = React.useRef(null!);
	return (
		<>
			<Steps ref={ref} steps={items} sequential={true} />
			<Button onClick={(e) => (ref.current as any).next()}>下一步</Button>
		</>
	);
}
Demo.displayName = "StepsSequentialDemo";
