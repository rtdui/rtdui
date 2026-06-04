import React from "react";
import { DataTable, type ColumnDef } from "@rtdui/datatable";
import { makePersonData, type Person } from "../../demoData/makeData";

const columns: ColumnDef<Person>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "fullName",
    header: "姓名",
    accessorKey: "fullName",
    sortingFn: "pinyin",
  },
  {
    id: "age",
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
