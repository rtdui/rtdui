import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "@rtdui/datatable";
import { makePersonData, type Person } from "../../demoData/makeData";

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableColumnFilter: false,
  },
  {
    header: "姓名",
    accessorKey: "fullName",
    meta: {
      showFilterList: true,
    },
  },
  {
    header: "性别",
    accessorFn: (row) => (row.gender === "male" ? "男" : "女"),
    meta: {
      align: "center",
      showFilterList: true,
    },
  },
  {
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
