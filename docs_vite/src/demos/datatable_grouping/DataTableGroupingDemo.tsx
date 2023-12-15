import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "@rtdui/datatable";
import { makeData, type Person } from "../../demoData/makeData";

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "姓名",
    accessorFn: (row) => `${row.firstName}${row.lastName}`,
  },
  {
    accessorKey: "age",
    header: "年龄",
  },
];

export default function DataTableGroupingDemo() {
  const [data, setData] = React.useState<Person[]>([]);

  React.useEffect(() => {
    setData(makeData(50));
  }, []);

  return (
    <div className="h-96">
      <DataTable data={data} columns={columns} enableGrouping autoExpandAll />
    </div>
  );
}
