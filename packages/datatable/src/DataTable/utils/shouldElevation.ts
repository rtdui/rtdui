import type { Table, Column } from "@tanstack/react-table";

/**
 * 是否是最后一个固定列并且正在滚动中
 * @param table
 * @param column
 * @param scrolling
 * @returns
 */
export function shouldElevation(
	table: Table<unknown>,
	column: Column<unknown>,
	scrolling: boolean,
) {
	const leftPinned = table.getState().columnPinning.left!;
	const index = leftPinned.findIndex((d) => d === column.id);
	if (index === leftPinned.length - 1) {
		return scrolling;
	}
	return false;
}
