import { Steps } from "@rtdui/core";

const steps = [
  { icon: "😕", description: "步骤1" },
  { icon: "😃", description: "步骤2" },
  { icon: "😍", description: "步骤3" },
  { description: "步骤4" },
  { description: "步骤5" },
  { description: "步骤6" },
  { description: "步骤7" },
];

export default function Demo() {
  return <Steps steps={steps} />;
}
Demo.displayName = "StepsIconDemo";
