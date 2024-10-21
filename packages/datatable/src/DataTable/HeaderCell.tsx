import clsx from "clsx";
import {
  IconTriangleFilled,
  IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import { flexRender } from "@tanstack/react-table";
import type { Table, Header, Column } from "@tanstack/react-table";
import { useDrop, useDrag } from "react-dnd";
import { shouldElevation, shouldIgnoreSticky, reorderColumn } from "./utils";
import { FilterEditor } from "./FilterEditor";

export interface HeaderCellProps {
  enableColumnReorder: boolean;
  enableColumnResizing: boolean;
  showHeader: boolean;
  debouncedWait: number;
  header: Header<any, any>;
  table: Table<any>;
  scrollingTrigger: boolean;
}
export function HeaderCell(props: HeaderCellProps) {
  const {
    header,
    table,
    enableColumnReorder,
    enableColumnResizing,
    showHeader,
    debouncedWait,
    scrollingTrigger,
  } = props;
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const canDragDrop =
    enableColumnReorder! &&
    !header.isPlaceholder &&
    !column.getIsPinned() &&
    column.columns.length === 0;

  // eslint-disable-next-line
  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: (moniter) => {
      return canDragDrop;
    },
    item: () => column,
    type: "column",
  });

  const [{ isOver, isRight }, dropRef] = useDrop({
    accept: "column",
    drop: (item: Column<any>) => {
      const newColumnOrder = reorderColumn(item.id, column.id, columnOrder);
      setColumnOrder(newColumnOrder);
    },
    canDrop: (item, monitor) => {
      return canDragDrop;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isRight: (monitor.getDifferenceFromInitialOffset()?.x ?? 0) > 0,
    }),
  });

  const isSticky = column.getIsPinned() && !shouldIgnoreSticky(header);

  return (
    <th
      ref={dropRef}
      className={clsx({
        // 只有最后一个冻结列应用突起样式
        elevation:
          shouldElevation(table, column, scrollingTrigger) &&
          !shouldIgnoreSticky(header),
        "opacity-50": isDragging,
        placeholder: header.isPlaceholder,
        "py-px": !showHeader,
      })}
      colSpan={header.colSpan > 1 ? header.colSpan : undefined}
      style={{
        transform: isOver ? `translateX(${isRight ? -4 : 4}px)` : undefined,
        // width: header.getSize(),
        position: isSticky ? "sticky" : "relative",
        left: isSticky ? header.getStart("left") : undefined,
        zIndex: isSticky ? 1 : undefined,
      }}
    >
      {header.isPlaceholder ? null : (
        <div className="flex flex-col gap-1">
          {showHeader && (
            <div
              ref={dragRef}
              className={clsx(
                "select-none flex items-center justify-center relative",
                {
                  "cursor-pointer": canDragDrop,
                }
              )}
              onClick={column.getToggleSortingHandler()}
            >
              {flexRender(column.columnDef.header, header.getContext())}
              {{
                asc: (
                  <span className="text-info flex items-center ml-1">
                    <IconTriangleFilled
                      size={10}
                      className="inline fill-info"
                    />
                    {table.getState().sorting.length > 1 &&
                      column.getSortIndex() >= 0 && (
                        <sub>{column.getSortIndex() + 1}</sub>
                      )}
                  </span>
                ),
                desc: (
                  <span className="text-info flex items-center ml-1">
                    <IconTriangleInvertedFilled
                      size={10}
                      className="inline fill-info"
                    />
                    {table.getState().sorting.length > 1 &&
                      column.getSortIndex() >= 0 && (
                        <sub>{column.getSortIndex() + 1}</sub>
                      )}
                  </span>
                ),
              }[column.getIsSorted() as string] ?? null}
            </div>
          )}
          {column.getCanFilter() && (
            <div>
              <FilterEditor
                column={column}
                table={table}
                debouncedWait={debouncedWait!}
              />
            </div>
          )}
        </div>
      )}
      {enableColumnResizing && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={clsx("resizer", column.getIsResizing() && "resizing")}
        />
      )}
    </th>
  );
}
