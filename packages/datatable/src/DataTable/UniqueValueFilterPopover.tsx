import { useState } from "react";
import { CloseButton, DebouncedInput, getType } from "@rtdui/core";
import type { Table, Column } from "@tanstack/react-table";
import { pinyinComparer } from "../utils";

export interface UniqueValueFilterPopoverProps {
  id: string;
  anchor: string;
  column: Column<any, unknown>;
  table: Table<any>;
  debouncedWait: number;
}
export function UniqueValueFilterPopover(props: UniqueValueFilterPopoverProps) {
  const { id, anchor, column, table, debouncedWait } = props;
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

  const checkedTotal =
    sortedUniqueValues.length - ((columnFilterValue as any[])?.length ?? 0);

  const [keyWord, setKeyWord] = useState<string>();

  const filteredSortedUniqueValues = sortedUniqueValues.filter((d) =>
    d.toString().includes(keyWord),
  );

  // HTML标准的Popover API, 它要求触发器只能是button或input.
  return (
    <ul
      id={id}
      popover="auto"
      className="dropdown list w-96 max-h-80 overflow-y-auto rounded-box bg-base-100 shadow-sm relative"
      style={{ positionAnchor: anchor } as React.CSSProperties}
    >
      <li className="p-1 sticky top-0 z-1 bg-base-100">
        <div className="relative rounded-md">
          <DebouncedInput
            tabIndex={0}
            size="xs"
            wait={debouncedWait}
            placeholder="请输入关键字"
            value={keyWord}
            onChange={(val) => setKeyWord(val)}
            slots={{
              input:
                "[--input-padding-left:8px] [--input-padding-right:8px] [&&&]:rounded-md",
            }}
            rightSection={
              keyWord ? (
                <CloseButton
                  size="xs"
                  onClick={() => {
                    setKeyWord("");
                  }}
                  className="[--size:18px]"
                />
              ) : undefined
            }
            rightSectionPointerEvents="auto"
          />
        </div>
      </li>
      {showFilterList &&
        filteredSortedUniqueValues.map((value) => (
          <li key={value} className="list-row py-1 after:border-b-0">
            <div>
              <input
                type="checkbox"
                className="checkbox checkbox-xs"
                checked={
                  !((columnFilterValue as any[])?.includes(value) ?? false)
                }
                onChange={(ev) => {
                  const checked = ev.target.checked;

                  column.setFilterValue((old: any[]) => {
                    let newFilterValue: undefined | any[] = [];
                    if (checked) {
                      newFilterValue = (old ?? []).filter((d) => d !== value);
                    } else {
                      newFilterValue = [...(old ?? [])];
                      newFilterValue.push(value);
                    }
                    return newFilterValue;
                  });
                }}
              />
            </div>
            <div className="text-xs">{value}</div>
          </li>
        ))}
      <li className="list-row [&&&]:py-1 [&&&]:rounded-none sticky bottom-0 bg-base-100 border-t border-base-300">
        <div>
          <input
            type="checkbox"
            className="checkbox checkbox-xs"
            checked={checkedTotal === sortedUniqueValues.length}
            onChange={(ev) => {
              const checked = ev.target.checked;

              column.setFilterValue((old: any[]) => {
                let newFilterValue: undefined | any[] = [];
                if (checked) {
                  newFilterValue = [];
                } else {
                  newFilterValue = [...sortedUniqueValues];
                }
                return newFilterValue;
              });
            }}
          />
        </div>
        <div className="text-xs text-primary">
          {`${checkedTotal} / ${sortedUniqueValues.length}`}
        </div>
      </li>
    </ul>
  );
}
