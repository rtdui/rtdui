import React from "react";
import { DataTable, type ColumnDef } from "@rtdui/datatable";
import { makePersonData, type Person } from "../../demoData/makeData";

const columns: ColumnDef<Person>[] = [
	{
		id: "ID",
		header: "ID",
		accessorKey: "id",
		enableColumnFilter: false,
	},
	{
		id: "姓名",
		header: "姓名",
		accessorKey: "fullName",
		meta: {
			showFilterList: true,
		},
	},
	{
		id: "性别",
		header: "性别",
		accessorFn: (row) => (row.gender === "male" ? "男" : "女"),
		meta: {
			align: "center",
			showFilterList: true,
		},
	},
	{
		id: "年龄",
		header: "年龄",
		accessorKey: "age",
		enableColumnFilter: false,
	},
];

export default function Demo() {
	const [data, setData] = React.useState<Person[]>([]);

	React.useEffect(() => {
		setData(makePersonData(50));
	}, []);

	return (
		<div className="h-96">
			<DataTable data={data} columns={columns} enableFilters />
		</div>
	);
}
Demo.displayName = "DataTableFilterListDemo";
