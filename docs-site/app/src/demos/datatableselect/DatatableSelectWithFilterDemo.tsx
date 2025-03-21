import React from "react";
import { DataTableSelect, type ColumnDef } from "@rtdui/datatable";
import { IconAt } from "@tabler/icons-react";
import { makePersonData, type Person } from "../../demoData/makeData";

const dataTableColumns: ColumnDef<Person>[] = [
	{
		id: "姓名",
		header: "姓名",
		accessorKey: "fullName",
		size: 260,
		minSize: 260,
		meta: {
			expandable: true,
		},
	},
];

const getRowId = (row: any) => row.id;

export default function Demo() {
	const [data, setData] = React.useState<Person[]>([]);
	React.useEffect(() => {
		setData(makePersonData(20, 3));
	}, []);

	return (
		<DataTableSelect
			defaultValue="1"
			placeholder="--请选择--"
			displayField="fullName"
			leftSection={<IconAt strokeWidth={1} size="1.2rem" />}
			tableProps={{
				columns: dataTableColumns,
				data: data,
				getRowId,
				getSubRows: (row: any) => row.subRows,
				enableFilters: true,
				filterFromLeafRows: true,
			}}
		/>
	);
}
Demo.displayName = "DatatableSelectWithFilterDemo";
