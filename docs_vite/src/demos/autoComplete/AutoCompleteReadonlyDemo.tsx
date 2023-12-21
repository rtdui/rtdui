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
  return <AutoComplete options={fruits} readOnly />;
}
Demo.displayName = "AutoCompleteReadonlyDemo";
