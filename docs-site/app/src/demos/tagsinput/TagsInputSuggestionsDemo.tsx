import { TagsInput } from "@rtdui/core";

const data = [
  "Apple",
  "Banana",
  "Cabbage",
  "Dried Plums",
  "Eggplant",
  "Feijoa",
  "Garlic",
  "Hominy",
  "Iceberg Lettuce",
  "Jicama",
  "Kale",
  "Leeks",
  "Madarins",
  "Napa",
  "Okra",
  "Papayas",
  "Quince",
  "Radicchio",
  "Shallots",
  "Tangelo",
  "Ugli Fruit",
  "Water Chestnuts",
  "Yams",
  "Zucchini Squash",
];
export default function Demo() {
  return <TagsInput data={data} placeholder="请选择或输入" />;
}
Demo.displayName = "TagsInputSuggestionsDemo";
