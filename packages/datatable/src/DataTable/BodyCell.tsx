import clsx from "clsx";
import { flexRender } from "@tanstack/react-table";
import type { Cell, AccessorKeyColumnDef } from "@tanstack/react-table";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { getType } from "@rtdui/core";
import { shouldElevation } from "./utils";

export interface BodyCellProps {
	enableGrouping: boolean;
	cell: Cell<any, any>;
	scrollingTrigger: boolean;
	changesRef: React.MutableRefObject<any>;
}
export function BodyCell(props: BodyCellProps) {
	const { cell, scrollingTrigger, enableGrouping, changesRef } = props;
	const { row, column, table } = cell.getContext();

	const hasError =
		changesRef.current?.errors?.[row.id]?.[
			(column.columnDef as AccessorKeyColumnDef<any, any>)?.accessorKey
		];

	const cellDataType = getType(row.getValue(column.id));
	const isSticky = column.getIsPinned();

	return (
		<td
			key={cell.id}
			className={clsx({
				elevation: shouldElevation(table, column, scrollingTrigger),
				"outline outline-1 outline-error outline-offset-[-2px]": hasError,
				"text-right": cellDataType === "Number",
				placeholder: cell.getIsPlaceholder(),
			})}
			title={hasError || undefined}
			style={{
				// width: column.getSize(),
				position: isSticky ? "sticky" : "relative",
				left: column.getIsPinned() ? column.getStart("left") : undefined,
				zIndex: isSticky ? 1 : undefined,
			}}
		>
			{cell.getIsGrouped() ? (
				// 如果是分组单元格则添加展开按钮
				<div className="flex items-center gap-1">
					<button
						type="button"
						onClick={row.getToggleExpandedHandler()}
						className="btn btn-ghost btn-circle btn-xs"
					>
						{row.getIsExpanded() ? (
							<IconChevronDown size={16} />
						) : (
							<IconChevronRight size={16} />
						)}
					</button>
					{flexRender(column.columnDef.cell, cell.getContext())} (
					{row.subRows.length})
				</div>
			) : enableGrouping && cell.getIsAggregated() ? (
				// 如果是聚合的单元格
				flexRender(column.columnDef.aggregatedCell, cell.getContext())
			) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null, Otherwise just render the regular cell
				flexRender(column.columnDef.cell, cell.getContext())
			)}
		</td>
	);
}
