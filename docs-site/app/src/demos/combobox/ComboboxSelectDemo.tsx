import { useState } from "react";
import { Combobox, useCombobox, InputBase } from "@rtdui/core";
import { IconCheck } from "@tabler/icons-react";
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
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");

  const shouldFilterOptions = !data.some((item) => item === value);
  const filteredOptions = shouldFilterOptions
    ? data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim())
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
        <InputBase
          rightSection={
            value ? (
              <Combobox.ClearButton
                title="Combobox.ClearButton"
                onClear={() => {
                  setValue("");
                }}
              />
            ) : (
              <Combobox.Chevron size={18} />
            )
          }
          rightSectionPointerEvents={value ? "auto" : undefined}
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
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Combobox.Search"
        />
        <Combobox.Header className="bg-base-200 p-1 text-xs">
          Combobox.Header
        </Combobox.Header>
        <Combobox.Options className="max-h-52 overflow-auto">
          {options.length === 0 ? (
            <Combobox.Empty>无匹配</Combobox.Empty>
          ) : (
            <Combobox.Group label="Combobox.Group">{options}</Combobox.Group>
          )}
        </Combobox.Options>
        <Combobox.Footer className="bg-base-200 p-1 text-xs">
          Combobox.Footer
        </Combobox.Footer>
      </Combobox.Dropdown>
    </Combobox>
  );
}

Demo.displayName = "ComboboxSelectDemo";
