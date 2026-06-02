import clsx from "clsx";
import { flexRender } from "@tanstack/react-table";
import type { Table, Header, Column } from "@tanstack/react-table";
import {
  shouldElevationLeft,
  shouldIgnoreSticky,
  shouldElevationRight,
} from "./utils";

export interface FooterCellProps {
  header: Header<any, any>;
  table: Table<any>;
  scrollingTrigger: boolean;
}
export function FooterCell(props: FooterCellProps) {
  const { header, table, scrollingTrigger } = props;
  const { column } = header;

  const isStickyLeft =
    column.getIsPinned() === "left" && !shouldIgnoreSticky(header);
  const isStickyRight =
    column.getIsPinned() === "right" && !shouldIgnoreSticky(header);
  const isSticky = isStickyLeft || isStickyRight;

  return (
    <th
      className={clsx(
        "bg-base-200",
        "border-t-0", // 因此dasyui默认的表脚上边框
        "not-last:border-r border-r-base-300",
        {
          "elevation-left before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:right-0 before:w-1.5 before:z-1 before:shadow-[1px_0_0_0] before:shadow-base-300":
            shouldElevationLeft(table, column) && !shouldIgnoreSticky(header),
          "elevation-left-scrollOffset [&&&]:before:shadow-[2px_0_2px_0]":
            shouldElevationLeft(table, column) &&
            !shouldIgnoreSticky(header) &&
            scrollingTrigger,
          "elevation-right before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1.5 before:z-1 before:shadow-[-1px_0_0_0] before:shadow-base-300":
            shouldElevationRight(table, column) && !shouldIgnoreSticky(header),
          "elevation-right-scrollOffset [&&&]:before:shadow-[-2px_0_2px_0]":
            shouldElevationRight(table, column) &&
            !shouldIgnoreSticky(header) &&
            scrollingTrigger,
          placeholder: header.isPlaceholder,
        },
      )}
      colSpan={header.colSpan > 1 ? header.colSpan : undefined}
      style={{
        // width: header.getSize(),
        position: isSticky ? "sticky" : "relative",
        left: isStickyLeft ? column.getStart("left") : undefined,
        right: isStickyRight ? column.getAfter("right") : undefined,
        zIndex: isSticky ? 1 : undefined,
      }}
    >
      {header.isPlaceholder
        ? null
        : flexRender(column.columnDef.footer, header.getContext())}
    </th>
  );
}
