import {
	flattenBy,
	type ColumnDef,
	type GroupColumnDef,
} from "@tanstack/react-table";

export function getAllFlatColumns<TData>(
	columnDefs: ColumnDef<TData, unknown>[],
) {
	const recurseColumns = (
		columnDefs: ColumnDef<TData, unknown>[],
	): ColumnDef<TData, unknown>[] =>
		columnDefs.flatMap((d): any => {
			const groupingColumnDef = d as GroupColumnDef<TData, unknown>;
			return [
				d,
				groupingColumnDef.columns
					? recurseColumns(groupingColumnDef.columns)
					: [],
			];
		});
	return recurseColumns(columnDefs);
}

export function getAllFlatColumns2<TData>(
	columnDefs: ColumnDef<TData, unknown>[],
) {
	return flattenBy(
		columnDefs,
		(columnDef) => (columnDef as GroupColumnDef<TData, unknown>).columns ?? [],
	);
}

export function getLeafColumns<TData>(columnDefs: ColumnDef<TData, unknown>[]) {
	const recurseColumns = (
		columnDefs: ColumnDef<TData, unknown>[],
	): ColumnDef<TData, unknown>[] =>
		columnDefs.flatMap((d): any => {
			const groupingColumnDef = d as GroupColumnDef<TData, unknown>;
			if (groupingColumnDef.columns) {
				return recurseColumns(groupingColumnDef.columns);
			}
			return d;
		});
	return recurseColumns(columnDefs);
}
