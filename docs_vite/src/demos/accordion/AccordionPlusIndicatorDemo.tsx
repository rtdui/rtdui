import { Accordion } from "@rtdui/core";

const items = [
  { title: "Click to open this one and close others", content: "hello" },
  { title: "Click to open this one and close others", content: "hello" },
  { title: "Click to open this one and close others", content: "hello" },
  { title: "Click to open this one and close others", content: "hello" },
  { title: "Click to open this one and close others", content: "hello" },
];
export default function AccordionPlusIndicatorDemo() {
  return <Accordion items={items} expandIcon="plus" />;
}