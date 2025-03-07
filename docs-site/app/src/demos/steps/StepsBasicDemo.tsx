import { Steps } from "@rtdui/core";

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
	return <Steps steps={steps} />;
}
Demo.displayName = "StepsBasicDemo";
