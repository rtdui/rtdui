import { Divider, FloatingSelect, MultiSelect, Slider } from "@rtdui/core";
import { useState } from "react";

const fruits = [
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

const maxSelectdValues = [1, 2, 3, Number.POSITIVE_INFINITY];
export default function Demo() {
  const [state, setState] = useState({
    clearable: false,
    searchable: false,
    withCheckIcon: true,
    checkIconPosition: "left",
    maxValues: Number.POSITIVE_INFINITY,
    hidePickedOptions: false,
  });
  return (
    <div className="flex gap-4">
      <MultiSelect
        data={fruits}
        onChange={(val: any) => console.log("select多选:", val)}
        className="flex-1"
        clearable={state.clearable}
        searchable={state.searchable}
        placeholder={state.searchable ? "Search" : undefined}
        withCheckIcon={state.withCheckIcon}
        checkIconPosition={state.checkIconPosition as any}
        maxValues={state.maxValues}
        hidePickedOptions={state.hidePickedOptions}
      />
      <Divider direction="horizontal" />
      <div className="flex flex-col gap-2 bg-base-100 p-4 w-56">
        Clearable:
        <FloatingSelect
          data={["true", "false"]}
          value={state.clearable.toString()}
          onChange={(val) =>
            setState((prev) => ({ ...prev, clearable: val === "true" }))
          }
        />
        Searchable:
        <FloatingSelect
          data={["true", "false"]}
          value={state.searchable.toString()}
          onChange={(val) =>
            setState((prev) => ({ ...prev, searchable: val === "true" }))
          }
        />
        With checked icon:
        <FloatingSelect
          data={["true", "false"]}
          value={state.withCheckIcon.toString()}
          onChange={(val) =>
            setState((prev) => ({ ...prev, withCheckIcon: val === "true" }))
          }
        />
        Checked icon position:
        <FloatingSelect
          disabled={!state.withCheckIcon}
          data={["left", "right"]}
          value={state.checkIconPosition}
          onChange={(val) =>
            setState((prev) => ({ ...prev, checkIconPosition: val }))
          }
        />
        Hide picked options:
        <FloatingSelect
          data={["true", "false"]}
          value={state.hidePickedOptions.toString()}
          onChange={(val) =>
            setState((prev) => ({ ...prev, hidePickedOptions: val === "true" }))
          }
        />
        Max selected values:
        <Slider
          min={1}
          max={4}
          labelAlwaysOn
          label={(v) => maxSelectdValues[v - 1]}
          className="mt-6"
          value={maxSelectdValues.indexOf(state.maxValues) + 1}
          onChange={(val) =>
            setState((prev) => ({
              ...prev,
              maxValues: maxSelectdValues[val - 1],
            }))
          }
        />
      </div>
    </div>
  );
}
Demo.displayName = "MultiSelectBasicDemo";
