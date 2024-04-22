import React from "react";
import { AutoComplete } from "@rtdui/core";

const fruits = [
  "Apple",
  "Banana",
  "Cabbage",
  "Dates",
  "Endive",
  "Fennel",
  "Garlic",
  "Hominy",
  "Iceberg Lettuce",
  "Jicama",
  "Kale",
  "Lemons",
  "Madarins",
  "Napa",
  "Oranges",
  "Pears",
  "Quince",
  "Radicchio",
  "Shallots",
  "Tangelo",
  "Ugli Fruit",
  "Watermelon",
  "Yams",
  "Zucchini Squash",
];

export default function Demo() {
  const [value, setValue] = React.useState("");
  return <AutoComplete data={fruits} value={value} onChange={setValue} />;
}
Demo.displayName = "AutoCompleteControlledDemo";
