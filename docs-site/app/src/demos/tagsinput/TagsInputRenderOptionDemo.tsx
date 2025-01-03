import { TagsInput, type TagsInputProps } from "@rtdui/core";
import { IconCat, IconDog } from "@tabler/icons-react";

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
const customRenderOption: TagsInputProps["renderOption"] = ({ option }) => (
	<div className="flex items-center gap-1">
		<IconCat className="stroke-sky-500" />
		<span className="font-bold">{option.value}</span>
	</div>
);
export default function Demo() {
	return (
		<TagsInput
			data={data}
			placeholder="Enter或,确认"
			renderOption={customRenderOption}
			comboboxProps={{}}
		/>
	);
}
Demo.displayName = "TagsInputRenderOptionDemo";
