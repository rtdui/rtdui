import { AutoComplete, TextInput, Button } from "@rtdui/core";
import { useState } from "react";

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
	const [submitData, setSubmitData] = useState<FormData | null>(null);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		setSubmitData(formData);
	};
	let output = "";

	if (submitData) {
		for (const [key, value] of submitData) {
			output += `${key}: ${value}\n`;
		}
	}

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
			<TextInput name="input1" placeholder="this is text input" />
			<AutoComplete
				name="input2"
				data={fruits}
				placeholder="this is autocomplete"
			/>
			<Button type="submit" color="primary" className="self-center">
				submit
			</Button>
			<output className="bg-base-100 mt-4 p-4">
				提交的数据:
				<pre>{output}</pre>
			</output>
		</form>
	);
}
Demo.displayName = "AutoCompleteInFormDemo";
