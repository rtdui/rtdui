import type {
  CellContext,
  ColumnDef,
  HeaderContext,
} from "@tanstack/react-table";
import React from "react";
import { DataTable } from "@rtdui/datatable";
import { makePersonData, type Person } from "../../demoData/makeData";

const integerFormatter = new Intl.NumberFormat("zh-Hans-CN");
const decimalFormatter = new Intl.NumberFormat("zh-Hans-CN", {
  minimumFractionDigits: 2,
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

const dateFormatter = new Intl.DateTimeFormat("zh-Hans-CN", {
  hour12: false,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const timeFormatter = new Intl.DateTimeFormat("zh-Hans-CN", {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
const datetimeFormatter = new Intl.DateTimeFormat("zh-Hans-CN", {
  hour12: false,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
const formatDate = (date: Date, style: "date" | "time" | "datetime") => {
  switch (style) {
    case "date":
      return dateFormatter.format(date).replace(/\//g, "-");
    case "datetime":
      return datetimeFormatter.format(date).replace(/\//g, "-");
    case "time":
      return timeFormatter.format(date);
    default:
      break;
  }
};

const DefaultFooterSumCell = (props: HeaderContext<Person, any>) => (
  <div className="flex justify-between">
    <span>总计:</span>
    <span>
      {decimalFormatter.format(
        props.table
          .getRowModel()
          .rows.reduce(
            (pre, cur) => pre + (cur.getValue(props.column.id) as number),
            0
          )
      )}
    </span>
  </div>
);

const DefaultAggregatedCell = (props: CellContext<Person, any>) => (
  <div className="flex justify-between">
    <span>小计:</span>
    {decimalFormatter.format(props.getValue())}
  </div>
);

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
              {integerFormatter.format(cx.table.getRowModel().rows.length)}
            </span>
          </div>
        ),
      },
      {
        id: "性别",
        header: () => "性别",
        accessorKey: "gender",
        cell: (cx) =>
          cx.getValue() === "male" ? "男\u{1F466}" : "女\u{1F469}",
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
              {decimalFormatter.format(
                cx.table
                  .getRowModel()
                  .rows.reduce(
                    (pre, cur) => pre + (cur.getValue(cx.column.id) as number),
                    0
                  ) / cx.table.getRowModel().rows.length
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
            {decimalFormatter.format(cx.getValue())}
          </span>
        ),
        footer: (cx) => (
          <div className="flex justify-between text-pink-500">
            <span>总计:</span>
            <span>
              {decimalFormatter.format(
                cx.table
                  .getRowModel()
                  .rows.reduce(
                    (pre, cur) => pre + (cur.getValue(cx.column.id) as number),
                    0
                  )
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
