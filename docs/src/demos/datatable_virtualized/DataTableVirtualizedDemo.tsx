import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "@rtdui/datatable";
import { makePersonData, type Person } from "../../demoData/makeData";

const columns: ColumnDef<Person>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "姓名",
    accessorKey: "fullName",
  },
  {
    header: "年龄",
    accessorKey: "age",
  },
];

export default function Demo() {
  const [data, setData] = React.useState<Person[]>([]);

  React.useEffect(() => {
    setData(makePersonData(10000));
  }, []);

  return (
    <div className="h-96">
      <DataTable data={data} columns={columns} enableVirtualized />
    </div>
  );
}
Demo.displayName = "DataTableVirtualizedDemo";
