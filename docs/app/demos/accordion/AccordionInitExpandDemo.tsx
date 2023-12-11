import { Accordion } from "@rtdui/core";

const items = [
  { title: "Click to open this one and close others", content: "hello" },
  { title: "Click to open this one and close others", content: "hello" },
  { title: "Click to open this one and close others", content: "hello" },
  { title: "Click to open this one and close others", content: "hello" },
  { title: "Click to open this one and close others", content: "hello" },
];
export default function () {
  return <Accordion items={items} initExpandIndex={4} />;
}
