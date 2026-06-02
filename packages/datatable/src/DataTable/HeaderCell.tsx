import { useId } from "react";
import clsx from "clsx";
import {
  IconCaretUpFilled,
  IconCaretDownFilled,
  IconFilter,
  IconFilterFilled,
  IconPin,
  IconPinnedFilled,
} from "@tabler/icons-react";
import { flexRender } from "@tanstack/react-table";
import type { Table, Header, Column } from "@tanstack/react-table";
import { useDrop, useDrag } from "react-dnd";
import {
  shouldElevationLeft,
  shouldIgnoreSticky,
  reorderColumn,
  shouldElevationRight,
} from "./utils";
// import { FilterEditor } from "./FilterEditor";
import { UniqueValueFilterPopover } from "./UniqueValueFilterPopover";

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

  const isStickyLeft =
    column.getIsPinned() === "left" && !shouldIgnoreSticky(header);
  const isStickyRight =
    column.getIsPinned() === "right" && !shouldIgnoreSticky(header);
  const isSticky = isStickyLeft || isStickyRight;

  const uniqueValueFilterPopoverId = useId();
  const uniqueValueFilterPopoverAnchor = `--${useId()}`;

  return (
    <th
      ref={dropRef as any}
      className={clsx(
        "group",
        "bg-base-200",
        "not-last:border-r border-r-base-300",
        {
          // 只有最后一个冻结列应用突起样式
          "elevation-left before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:right-0 before:w-1.5 before:z-1 before:shadow-[1px_0_0_0] before:shadow-base-300":
            shouldElevationLeft(table, column) && !shouldIgnoreSticky(header),
          "elevation-left-scrollOffset [&&&]:before:shadow-[2px_0_2px_0]":
            shouldElevationLeft(table, column) &&
            !shouldIgnoreSticky(header) &&
            scrollingTrigger,
          "elevation-right before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1.5 before:z-1 before:shadow-[-1px_0_0_0] before:shadow-base-300":
            shouldElevationRight(table, column) && !shouldIgnoreSticky(header),
          "elevation-right-scrollOffset [&&&]:before:shadow-[-2px_0_2px_0] [&&&]:before:shadow-base-300":
            shouldElevationRight(table, column) &&
            !shouldIgnoreSticky(header) &&
            scrollingTrigger,
          "opacity-50": isDragging,
          placeholder: header.isPlaceholder,
          "py-px": !showHeader,
        },
      )}
      colSpan={header.colSpan > 1 ? header.colSpan : undefined}
      style={{
        transform: isOver ? `translateX(${isRight ? -4 : 4}px)` : undefined,
        // width: header.getSize(),
        position: isSticky ? "sticky" : "relative",
        left: isStickyLeft ? column.getStart("left") : undefined,
        right: isStickyRight ? column.getAfter("right") : undefined,
        zIndex: isSticky ? 1 : undefined,
      }}
    >
      {header.isPlaceholder
        ? null
        : showHeader && (
            <div className="flex flex-col gap-1">
              <div
                ref={dragRef as any}
                className={clsx(
                  "select-none flex items-center justify-center relative",
                  {
                    "cursor-pointer": canDragDrop,
                  },
                )}
              >
                {flexRender(column.columnDef.header, header.getContext())}
                <div
                  className={clsx(
                    "columnhead-toolbar flex items-center justify-center gap-0.5 opacity-0 group-hover:opacity-100",
                    {
                      "opacity-100":
                        column.getIsSorted() ||
                        column.getFilterValue() ||
                        column.getIsPinned() === "left",
                    },
                  )}
                >
                  <div
                    className={clsx(
                      "sortings relative w-[14px] opacity-0 group-hover:opacity-100",
                      {
                        "opacity-100": column.getIsSorted(),
                      },
                    )}
                    title="排序"
                    onClick={column.getToggleSortingHandler()}
                  >
                    <IconCaretUpFilled
                      size={14}
                      className={clsx("absolute -top-2", {
                        "fill-info": column.getIsSorted() === "asc",
                      })}
                    />
                    <IconCaretDownFilled
                      size={14}
                      className={clsx("absolute -top-[3px]", {
                        "fill-info": column.getIsSorted() === "desc",
                      })}
                    />
                    {column.getSortIndex() > 0 && (
                      <sub className="absolute left-[12px] top-1">
                        {column.getSortIndex() + 1}
                      </sub>
                    )}
                  </div>
                  <div
                    className={clsx(
                      "filter-list relative opacity-0 group-hover:opacity-100",
                      {
                        "opacity-100": column.getFilterValue(),
                      },
                    )}
                    title="筛选"
                  >
                    {column.getCanFilter() && (
                      <>
                        <button
                          popoverTarget={uniqueValueFilterPopoverId}
                          style={
                            {
                              anchorName: uniqueValueFilterPopoverAnchor,
                            } as React.CSSProperties
                          }
                        >
                          {column.getFilterValue() ? (
                            <IconFilterFilled
                              size={14}
                              color="var(--color-info)"
                              className="translate-y-[3px]"
                            />
                          ) : (
                            <IconFilter
                              size={14}
                              className="translate-y-[3px]"
                            />
                          )}
                        </button>
                        <UniqueValueFilterPopover
                          id={uniqueValueFilterPopoverId}
                          anchor={uniqueValueFilterPopoverAnchor}
                          column={column}
                          table={table}
                          debouncedWait={debouncedWait!}
                        />
                      </>
                    )}
                  </div>
                  <div
                    className={clsx(
                      "pin-left relative opacity-0 group-hover:opacity-100",
                      {
                        "opacity-100": !!column.getIsPinned(),
                      },
                    )}
                    title="固定"
                    onClick={() => {
                      if (column.getIsPinned()) {
                        // 复原
                        column.pin(false);
                      } else {
                        column.pin("left");
                      }
                    }}
                  >
                    {column.getIsPinned() ? (
                      <IconPinnedFilled
                        size={14}
                        color="var(--color-info)"
                        className="translate-y-[2px]"
                      />
                    ) : (
                      <IconPin size={14} className="translate-y-[2px]" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
      {enableColumnResizing && showHeader && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={clsx(
            "resizer",
            "absolute z-1 top-0 bottom-0 -right-px w-[3px] bg-info/20 opacity-0 cursor-col-resize select-none touch-none",
            "hover:opacity-100",
            {
              "resizing opacity-100 cursor-col-resize": column.getIsResizing(),
            },
          )}
        />
      )}
    </th>
  );
}
