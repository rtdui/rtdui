import { useState } from "react";
import { Combobox, TextInput, useCombobox } from "@rtdui/core";
import { IconCheck } from "@tabler/icons-react";

const data = [
	"🍎 Apples",
	"🍌 Bananas",
	"🥦 Broccoli",
	"🥕 Carrots",
	"🍫 Chocolate",
];
export default function Demo() {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});
	const [value, setValue] = useState("");
	const shouldFilterOptions = !data.some((item) => item === value);
	const filteredOptions = shouldFilterOptions
		? data.filter((item) =>
				item.toLowerCase().includes(value.toLowerCase().trim()),
			)
		: data;

	const options = filteredOptions.map((item) => (
		<Combobox.Option
			key={item}
			value={item}
			active={item === value}
			disabled={item === "🥦 Broccoli"}
			className="flex items-center"
		>
			<span className="flex-1">{item}</span>
			{item === value ? <IconCheck size={20} /> : null}
		</Combobox.Option>
	));
	return (
		<Combobox
			store={combobox}
			onOptionSubmit={(val) => {
				setValue(val);
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<TextInput
					rightSection={<Combobox.Chevron />}
					slots={{
						right: "pointer-events-none",
					}}
					value={value}
					onChange={(event) => {
						setValue(event.currentTarget.value);
						combobox.openDropdown();
						combobox.updateSelectedOptionIndex();
					}}
					onClick={() => combobox.openDropdown()}
					onFocus={() => combobox.openDropdown()}
					onBlur={() => combobox.closeDropdown()}
				/>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options>
					{options.length === 0 ? (
						<Combobox.Empty>无匹配</Combobox.Empty>
					) : (
						options
					)}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}

Demo.displayName = "ComboboxBasicDemo";
