import { forwardRef, useState, useRef, FocusEvent } from "react";
import { useUncontrolled } from "@rtdui/hooks";
import { Popover, TextInput, type TextInputProps } from "@rtdui/core";
import clsx from "clsx";
import { IconChevronDown } from "@tabler/icons-react";
import { DataTable } from "../DataTable/DataTable";
import { getSelectedRows } from "../utils/getSelectedRows";
import type { DataTableProps } from "../DataTable/DataTable";

export interface DataTableSelectProps
  extends Omit<TextInputProps, "value" | "defaultValue" | "onChange" | "slots">,
    Pick<
      DataTableProps,
      | "columns"
      | "data"
      | "initialState"
      | "getRowId"
      | "getSubRows"
      | "enableGrouping"
      | "enableFilters"
      | "autoExpandAll"
    > {
  displayField?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (ids: string | string[]) => void;
  slots?: TextInputProps["slots"] & {
    dropdown?: string;
  };
}

/** ref属性会转发至内部的input元素 */
export const DataTableSelect = forwardRef<
  HTMLInputElement,
  DataTableSelectProps
>((props, ref) => {
  const {
    name,
    rightSection,
    defaultValue,
    value,
    onChange,
    className,
    slots,
    children,
    readOnly,
    columns,
    data,
    getRowId = (row) => row.id,
    initialState,
    getSubRows,
    multiple = false,
    displayField,
    enableFilters,
    enableGrouping,
    autoExpandAll = true,
    onFocus,
    ...other
  } = props;

  const tableRef = useRef<any>();

  const right = (
    <>
      {rightSection}
      <IconChevronDown size="1rem" />
    </>
  );
  const [open, setOpen] = useState(false);
  const [valueState, handleChange] = useUncontrolled({
    defaultValue,
    value,
    finalValue: "",
    onChange,
  });
  const selectedIds = valueState
    .toString()
    .split(",")
    .map((d) => d.trim());
  const displayValue = getSelectedRows(data, selectedIds, getRowId, getSubRows)
    .map((d) => d[displayField!])
    .join(", ");
  const tableState = {
    rowSelection: selectedIds.reduce((acc: any, item: string) => {
      if (item) {
        acc[item] = true;
      }
      return acc;
    }, {} as any),
    ...initialState,
  };

  const handleRowSelectionChange = (updater: any) => {
    const rowSelection =
      typeof updater === "function"
        ? updater(tableState.rowSelection)
        : updater;
    const newSelectedIds = Object.keys(rowSelection);
    handleChange(newSelectedIds.join(","));
    if (!multiple) {
      setOpen(false);
    }
  };

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    onFocus?.(e);
    setOpen(true);
  };

  return (
    <Popover withArrow opened={open} onChange={setOpen} position="bottom-start">
      <input type="hidden" name={name} value={selectedIds} />
      <Popover.Target>
        <TextInput
          ref={ref}
          readOnly
          size="sm"
          slots={{
            ...slots,
            right: clsx(slots?.right, "pointer-events-none"),
          }}
          rightSection={right}
          value={displayValue}
          className={className}
          {...other}
          onFocus={handleInputFocus}
        />
      </Popover.Target>
      <Popover.Dropdown
        className={clsx("max-h-60 overflow-auto", slots?.dropdown)}
      >
        <DataTable
          ref={tableRef}
          showHeader={false}
          showToolbar={false}
          showBorder={false}
          columns={columns}
          data={data}
          getRowId={getRowId}
          getSubRows={getSubRows}
          state={tableState}
          initialState={initialState}
          onRowSelectionChange={handleRowSelectionChange}
          enableVirtualized={false}
          enablePagination={false}
          enableColumnReorder
          enableColumnResizing
          enableSorting
          enableGrouping={enableGrouping}
          enableFilters={enableFilters}
          filterFromLeafRows={false}
          enableHiding={false}
          enableRowSelection
          enableMultiRowSelection={multiple}
          enableSubRowSelection={false}
          enableClickRowSelection={!multiple}
          selectAllForAllPages
          enableStickyHeader
          enableAutoRowNumber={false}
          enableExport={false}
          debouncedWait={500}
          autoExpandAll={autoExpandAll}
        />
      </Popover.Dropdown>
    </Popover>
  );
});

DataTableSelect.displayName = "@rtdui/DataTableSelect";
