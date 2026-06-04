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
    id: "gender",
    header: "性别",
    accessorFn: (row) => (row.gender === "male" ? "男" : "女"),
    meta: {
      align: "center",
    },
    size: 80,
    minSize: 80,
  },
  {
    id: "age",
    header: "年龄",
    accessorKey: "age",
    size: 80,
    minSize: 80,
  },
];

export default function Demo() {
  const [data, setData] = React.useState<Person[]>([]);

  React.useEffect(() => {
    setData(makePersonData(50));
  }, []);

  return (
    <div className="h-96">
      <DataTable data={data} columns={columns} showBorder />
    </div>
  );
}
Demo.displayName = "DataTableBasicDemo";
