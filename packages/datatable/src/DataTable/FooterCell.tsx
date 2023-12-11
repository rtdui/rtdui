import clsx from "clsx";
import { flexRender } from "@tanstack/react-table";
import type { Table, Header, Column } from "@tanstack/react-table";
import { shouldElevation, shouldIgnoreSticky, reorderColumn } from "./utils";

export interface FooterCellProps {
  header: Header<any, any>;
  table: Table<any>;
  scrollingTrigger: boolean;
}
export function FooterCell(props: FooterCellProps) {
  const { header, table, scrollingTrigger } = props;
  const { column } = header;

  return (
    <th
      className={clsx({
        elevation:
          shouldElevation(table, column, scrollingTrigger) &&
          !shouldIgnoreSticky(header),
        sticky: column.getIsPinned() && !shouldIgnoreSticky(header),
        placeholder: header.isPlaceholder,
      })}
      colSpan={header.colSpan > 1 ? header.colSpan : undefined}
      style={{
        width: header.getSize(),
        left:
          column.getIsPinned() && !shouldIgnoreSticky(header)
            ? header.getStart("left")
            : undefined,
        zIndex: -header.index,
      }}
    >
      {header.isPlaceholder
        ? null
        : flexRender(column.columnDef.footer, header.getContext())}
    </th>
  );
}
