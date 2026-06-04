import clsx from "clsx";
import { flexRender } from "@tanstack/react-table";
import type { Cell, AccessorKeyColumnDef } from "@tanstack/react-table";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { getType } from "@rtdui/core";
import { shouldElevationLeft, shouldElevationRight } from "./utils";

export interface BodyCellProps {
  enableGrouping: boolean;
  cell: Cell<any, any>;
  scrollingTrigger: boolean;
  changesRef: React.MutableRefObject<any>;
  showBorder?: boolean;
}
export function BodyCell(props: BodyCellProps) {
  const {
    cell,
    scrollingTrigger,
    enableGrouping,
    changesRef,
    showBorder = false,
  } = props;
  const { row, column, table } = cell.getContext();

  const hasError =
    changesRef.current?.errors?.[row.id]?.[
      (column.columnDef as AccessorKeyColumnDef<any, any>)?.accessorKey
    ];

  const cellDataType = getType(row.getValue(column.id));
  const isStickyLeft = column.getIsPinned() === "left";
  const isStickyRight = column.getIsPinned() === "right";
  const isSticky = isStickyLeft || isStickyRight;

  const TableCell = isSticky ? "th" : "td";

  return (
    <TableCell
      key={cell.id}
      className={clsx(
        "bg-base-100 font-normal",
        "not-last:border-r not-last:border-r-transparent",
        {
          "[&&&]:not-last:border-r-base-200": showBorder,
          "elevation-left before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:right-0 before:w-1.5 before:z-1 before:shadow-[1px_0_0_0] before:shadow-base-300":
            shouldElevationLeft(table, column),
          "elevation-left-scrollOffset [&&&]:before:shadow-[2px_0_2px_0]":
            shouldElevationLeft(table, column) && scrollingTrigger,
          "elevation-right before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1.5 before:z-2 before:shadow-[-1px_0_0_0] before:shadow-base-300":
            shouldElevationRight(table, column),
          "elevation-right-scrollOffset [&&&]:before:shadow-[-2px_0_2px_0]":
            shouldElevationRight(table, column) && scrollingTrigger,
          "outline outline-error -outline-offset-2": hasError,
          "text-right": cellDataType === "Number",
          placeholder: cell.getIsPlaceholder(),
        },
      )}
      title={hasError || undefined}
      style={{
        // width: column.getSize(),
        position: isSticky ? "sticky" : undefined,
        left: isStickyLeft ? column.getStart("left") : undefined,
        right: isStickyRight ? column.getAfter("right") : undefined,
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
    </TableCell>
  );
}
