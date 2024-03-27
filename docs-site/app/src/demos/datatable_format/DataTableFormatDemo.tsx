import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "@rtdui/datatable";
import { makePersonData, type Person } from "../../demoData/makeData";

const integerFormatter = new Intl.NumberFormat("zh-Hans-CN");
const decimalFormatter = new Intl.NumberFormat("zh-Hans-CN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const percentFormatter = new Intl.NumberFormat("zh-Hans-CN", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatNumber = (
  val: number,
  style: "integer" | "decimal" | "percent"
) => {
  switch (style) {
    case "integer":
      return integerFormatter.format(val);
    case "percent":
      return percentFormatter.format(val);
    case "decimal":
    default:
      return decimalFormatter.format(val);
  }
};

const columns: ColumnDef<Person>[] = [
  {
    id: "ID",
    header: "ID",
    accessorKey: "id",
    size: 80,
  },
  {
    header: "个人信息",
    columns: [
      {
        id: "姓名",
        header: "姓名",
        accessorKey: "fullName",
        meta: {
          showFilterList: true,
        },
        footer: (cx) => (
          <div className="flex justify-between">
            <span>总人数:</span>
            <span>
              {formatNumber(cx.table.getRowModel().rows.length, "integer")}
            </span>
          </div>
        ),
      },
      {
        id: "性别",
        header: () => "性别",
        accessorKey: "gender",
        cell: (cx) => (
          <div className="text-center">
            {cx.getValue() === "male" ? "男 👨" : "女 👩"}
          </div>
        ),
        footer: (cx) => (
          <div className="flex justify-between">
            <span>男女比例:</span>
            <span>
              {formatNumber(
                cx.table
                  .getRowModel()
                  .rows.filter((d) => d.original.gender === "male").length /
                  cx.table
                    .getRowModel()
                    .rows.filter((d) => d.original.gender === "female").length,
                "decimal"
              )}
            </span>
          </div>
        ),
      },
      {
        id: "年龄",
        header: () => "年龄",
        accessorKey: "age",
        cell: (cx) => {
          const value = cx.getValue();
          return value > 30 ? (
            <span className="text-red-500">{value} ↑</span>
          ) : (
            <span className="text-green-500">{value} ↓</span>
          );
        },
        footer: (cx) => (
          <div className="flex justify-between">
            <span>平均年龄: </span>
            <span>
              {formatNumber(
                cx.table
                  .getRowModel()
                  .rows.reduce(
                    (pre, cur) => pre + (cur.getValue(cx.column.id) as number),
                    0
                  ) / cx.table.getRowModel().rows.length,
                "decimal"
              )}
            </span>
          </div>
        ),
      },
      {
        id: "存款",
        header: (cx) => <span className="text-pink-500">存款</span>,
        size: 200,
        accessorKey: "deposit",
        cell: (cx) => (
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            {formatNumber(cx.getValue(), "decimal")}
          </span>
        ),
        footer: (cx) => (
          <div className="flex justify-between text-pink-500">
            <span>总计:</span>
            <span>
              {formatNumber(
                cx.table
                  .getRowModel()
                  .rows.reduce(
                    (pre, cur) => pre + (cur.getValue(cx.column.id) as number),
                    0
                  ),
                "decimal"
              )}
            </span>
          </div>
        ),
      },
    ],
  },
];

export default function Demo() {
  const [data, setData] = React.useState<Person[]>([]);

  React.useEffect(() => {
    setData(makePersonData(50));
  }, []);

  return (
    <div className="h-96">
      <DataTable data={data} columns={columns} getRowId={(row) => row.id} />
    </div>
  );
}
Demo.displayName = "DataTableFormatDemo";
