import React from "react";
import { DataTable, type ColumnDef, type CellContext } from "@rtdui/datatable";
import { makePersonData, type Person } from "../../demoData/makeData";

const DepositAggregatedCell = (props: CellContext<Person, any>) => (
	<div className="flex justify-between">
		<span>范围:</span>[{props.getValue()[0]}, {props.getValue()[1]}]
	</div>
);

const columns: ColumnDef<Person>[] = [
	{
		id: "ID",
		header: "ID",
		accessorKey: "id",
	},
	{
		id: "信息",
		header: "信息",
		columns: [
			{
				id: "姓名",
				header: "姓名",
				accessorKey: "fullName",
			},
			{
				id: "年龄",
				header: "年龄",
				accessorKey: "age",
			},
		],
	},

	{
		id: "存款",
		header: "存款",
		size: 280,
		accessorKey: "deposit",
		aggregatedCell: DepositAggregatedCell,
		aggregationFn: "extent",
	},
];

export default function Demo() {
	const [data, setData] = React.useState<Person[]>([]);

	React.useEffect(() => {
		setData(makePersonData(50));
	}, []);

	return (
		<div className="h-96">
			<DataTable
				data={data}
				columns={columns}
				enableGrouping
				initialState={{ expanded: true }}
			/>
		</div>
	);
}
Demo.displayName = "DataTableGroupingDemo";
