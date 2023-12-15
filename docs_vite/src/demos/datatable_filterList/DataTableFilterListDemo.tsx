import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "@rtdui/datatable";
import { makeData, type Person } from "../../demoData/makeData";

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableColumnFilter: false,
  },
  {
    id: "姓名",
    accessorFn: (row) => `${row.firstName}${row.lastName}`,
    meta: {
      showFilterList: true,
    },
  },
  {
    accessorKey: "age",
    header: "年龄",
    enableColumnFilter: false,
  },
];

export default function DataTableFilterListDemo() {
  const [data, setData] = React.useState<Person[]>([]);

  React.useEffect(() => {
    setData(makeData(50));
  }, []);

  return (
    <div className="h-96">
      <DataTable data={data} columns={columns} enableFilters />
    </div>
  );
}
