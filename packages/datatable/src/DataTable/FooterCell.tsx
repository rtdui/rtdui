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

	const isSticky = column.getIsPinned() && !shouldIgnoreSticky(header);

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
				// width: header.getSize(),
				position: isSticky ? "sticky" : "relative",
				left: isSticky ? header.getStart("left") : undefined,
				zIndex: isSticky ? 1 : undefined,
			}}
		>
			{header.isPlaceholder
				? null
				: flexRender(column.columnDef.footer, header.getContext())}
		</th>
	);
}
