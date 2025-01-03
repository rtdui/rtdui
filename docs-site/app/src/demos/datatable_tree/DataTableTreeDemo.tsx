import React from "react";
import {
	DataTable,
	type DataTableProps,
	type ColumnDef,
} from "@rtdui/datatable";
import { makePersonData, type Person } from "../../demoData/makeData";

const columns: ColumnDef<Person>[] = [
	{
		id: "ID",
		header: "ID",
		accessorKey: "id",
	},
	{
		id: "姓名",
		header: "姓名",
		accessorKey: "fullName",
		size: 180,
		meta: {
			expandable: true,
		},
	},
	{
		id: "年龄",
		header: "年龄",
		accessorKey: "age",
	},
];
const tableProps: Partial<DataTableProps> = {
	enableVirtualized: false,
	enablePagination: false,
	enableColumnReorder: true,
	enableColumnResizing: true,
	enableSorting: true,
	getSubRows: (row: any) => row.subRows,
	enableGrouping: false,
	enableFilters: true,
	filterFromLeafRows: false,
	enableHiding: true,
	enableRowSelection: false,
	enableMultiRowSelection: false,
	enableSubRowSelection: false,
	enableClickRowSelection: false,
	selectAllForAllPages: false,
	enableStickyHeader: true,
	enableAutoRowNumber: false,
	enableExport: true,
};
export default function Demo() {
	const [data, setData] = React.useState<Person[]>([]);

	React.useEffect(() => {
		setData(makePersonData(50, 3, 2));
	}, []);

	return (
		<div className="h-96">
			<DataTable data={data} columns={columns} {...tableProps} />
		</div>
	);
}
Demo.displayName = "DataTableTreeDemo";
