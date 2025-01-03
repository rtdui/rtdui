import { forwardRef, useState, useRef, type FocusEvent } from "react";
import { useUncontrolled } from "@rtdui/hooks";
import { Popover, TextInput, type TextInputProps } from "@rtdui/core";
import clsx from "clsx";
import { IconChevronDown } from "@tabler/icons-react";
import { DataTable } from "../DataTable/DataTable";
import { getSelectedRows } from "../utils/getSelectedRows";
import type { DataTableProps } from "../DataTable/DataTable";

export interface DataTableSelectProps
	extends Omit<
		TextInputProps,
		"value" | "defaultValue" | "onChange" | "slots"
	> {
	displayField?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (ids: string | string[]) => void;
	slots?: TextInputProps["slots"] & {
		dropdown?: string;
	};
	tableProps: DataTableProps;
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
		onFocus,
		className,
		slots,
		children,
		readOnly,
		displayField,
		tableProps,
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
	const displayValue = getSelectedRows(
		tableProps.data,
		selectedIds,
		tableProps.getRowId,
		tableProps.getSubRows,
	)
		.map((d) => d[displayField!])
		.join(", ");
	const tableState = {
		rowSelection: selectedIds.reduce((acc: any, item: string) => {
			if (item) {
				acc[item] = true;
			}
			return acc;
		}, {} as any),
	};

	const handleRowSelectionChange = (updater: any) => {
		const rowSelection =
			typeof updater === "function"
				? updater(tableState.rowSelection)
				: updater;
		const newSelectedIds = Object.keys(rowSelection);
		handleChange(newSelectedIds.join(","));
		if (!tableProps.enableMultiRowSelection) {
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
					enableVirtualized={false}
					enablePagination={false}
					enableColumnReorder
					enableColumnResizing
					enableSorting
					enableHiding={false}
					enableRowSelection
					enableSubRowSelection={false}
					enableClickRowSelection={!tableProps.enableMultiRowSelection}
					selectAllForAllPages
					enableStickyHeader
					enableAutoRowNumber={false}
					enableExport={false}
					slots={{
						...tableProps.slots,
						container: "overflow-visible",
					}}
					{...tableProps}
					state={tableState}
					onRowSelectionChange={handleRowSelectionChange}
				/>
			</Popover.Dropdown>
		</Popover>
	);
});

DataTableSelect.displayName = "@rtdui/DataTableSelect";
