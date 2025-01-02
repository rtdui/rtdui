export function getSelectedRows(
	data: Record<string, any>[],
	selectedIds: string[],
	getRowId: (row: any) => any = (row) => row.id,
	getSubRows?: (originalRow: any) => undefined | Record<string, any>[],
) {
	const selectedRows: Record<string, any>[] = [];
	// const selectedRowsById: Record<string, any> = {};

	// Filters top level and nested rows
	const recurseRows = (rows: Record<string, any>[], depth = 0) =>
		rows.forEach((row, index) => {
			const rowId = String(getRowId(row));
			const isSelected = selectedIds.includes(rowId);

			if (isSelected) {
				selectedRows.push(row);
				// selectedRowsById[rowId] = row;
			}
			const subRows = getSubRows?.(row);
			if (subRows?.length) {
				recurseRows(subRows, depth + 1);
			}
		});

	recurseRows(data);

	// return {
	//   selectedRows,
	//   selectedRowsById,
	// };

	return selectedRows;
}
