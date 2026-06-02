import { CloseButton, DebouncedInput, getType } from "@rtdui/core";
import type { Table, Column } from "@tanstack/react-table";
import { pinyinComparer } from "../utils";

export interface FilterEditorProps {
  column: Column<any, unknown>;
  table: Table<any>;
  debouncedWait: number;
}
export function FilterEditor(props: FilterEditorProps) {
  const { column, table, debouncedWait } = props;
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnDataType = getType(firstValue);

  const columnFilterValue = column.getFilterValue();

  const showFilterList =
    column.columnDef.meta?.showFilterList && columnDataType !== "Number";

  const sortedUniqueValues = Array.from(
    column.getFacetedUniqueValues().keys(),
  ).sort((a, b) => {
    // js 默认排序规则会将数字会转换为字符串, 然后按字符串进行排序, 因此排序不正确.
    switch (columnDataType) {
      case "Date":
        return a > b ? 1 : a < b ? -1 : 0; // Date对象不能使用等于比较
      case "String":
        return pinyinComparer(a, b);
      default:
        return a - b; //
    }
  });

  return columnDataType === "Number" ? (
    <div className="font-normal flex gap-1">
      <DebouncedInput
        className="flex-1"
        size="xs"
        wait={debouncedWait}
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        placeholder={`最小 ${
          column.getFacetedMinMaxValues()?.[0]
            ? `(${column.getFacetedMinMaxValues()?.[0]})`
            : ""
        }`}
        defaultValue={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [value, old?.[1]])
        }
        slots={{
          input: "[--input-padding-left:8px] [--input-padding-right:8px]",
        }}
      />
      <DebouncedInput
        className="flex-1"
        size="xs"
        wait={debouncedWait}
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        placeholder={`最大 ${
          column.getFacetedMinMaxValues()?.[1]
            ? `(${column.getFacetedMinMaxValues()?.[1]})`
            : ""
        }`}
        defaultValue={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], value])
        }
        slots={{
          input: "[--input-padding-left:8px] [--input-padding-right:8px]",
        }}
      />
    </div>
  ) : (
    <div className="font-normal dropdown w-full">
      <div className="relative rounded-md">
        <DebouncedInput
          tabIndex={0}
          size="xs"
          wait={debouncedWait}
          placeholder={`过滤 (${column.getFacetedUniqueValues().size})`}
          value={(columnFilterValue ?? "") as string}
          onChange={(value) => column.setFilterValue(value)}
          slots={{
            input: "[--input-padding-left:8px] [--input-padding-right:8px]",
          }}
        />
        {column.getIsFiltered() && (
          <div className="absolute inset-y-0 right-0.5 flex items-center">
            <CloseButton
              size="xs"
              onClick={() => {
                column.setFilterValue(null);
              }}
            />
          </div>
        )}
      </div>
      {showFilterList && (
        <ul
          tabIndex={0}
          className="dropdown-content menu p-1 bg-base-200 rounded-md max-h-40 overflow-y-auto flex-nowrap"
        >
          {sortedUniqueValues.map((value) => (
            <li
              key={value}
              onClick={(ev) => {
                ev.currentTarget.parentElement?.blur();
                column.setFilterValue(value);
              }}
            >
              <span>{value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
