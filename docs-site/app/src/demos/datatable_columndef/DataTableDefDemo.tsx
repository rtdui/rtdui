import React from "react";
import {
  DataTable,
  type CellContext,
  type ColumnDef,
  type HeaderContext,
} from "@rtdui/datatable";
import { makeDatumData, type Datum } from "../../demoData/makeData";

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
      return datetimeFormatter.format(date).replace(/\//g, "-");
  }
};

const DefaultFooterSumCell = (props: HeaderContext<Datum, any>) => (
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

const DefaultAggregatedCell = (props: CellContext<Datum, any>) => (
  <div className="flex justify-between">
    <span>小计:</span>
    {decimalFormatter.format(props.getValue())}
  </div>
);

const columns: ColumnDef<Datum>[] = [
  {
    id: "ID",
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "数据类型",
    columns: [
      {
        id: "枚举",
        header: (cx) => <span className="text-secondary">枚举</span>,
        accessorKey: "enum",
        meta: {
          align: "center",
          showFilterList: true,
        },
        size: 100,
        minSize: 100,
        filterFn: "equalsString",
      },
      {
        id: "枚举映射",
        header: (cx) => <span className="text-secondary">枚举映射</span>,
        accessorFn: (row) => (row.enum === "m" ? "男" : "女"),
        meta: {
          align: "center",
          showFilterList: true,
        },
        size: 100,
        minSize: 100,
        filterFn: "equalsString",
      },
      {
        id: "布尔",
        header: (cx) => <span className="text-secondary">布尔</span>,
        size: 100,
        minSize: 100,
        accessorKey: "boolean",
        meta: {
          align: "center",
          showFilterList: true,
        },
        filterFn: "equalsString",
        // cell: (cx) => cx.column.columnDef.meta?.mapping?.[cx.getValue()],
      },
      {
        id: "布尔映射",
        header: (cx) => <span className="text-secondary">布尔映射</span>,
        size: 100,
        minSize: 100,
        accessorFn: (row) => (row.boolean ? "是" : "否"),
        meta: {
          align: "center",
          showFilterList: true,
        },
        filterFn: "equalsString",
        // cell: (cx) => cx.column.columnDef.meta?.mapping?.[cx.getValue()],
      },
      {
        id: "整数",
        header: (cx) => <span className="text-secondary">整数</span>,
        meta: { align: "right" },
        size: 250,
        accessorKey: "int",
        cell: (cx) => formatNumber(cx.getValue(), "integer"),
        aggregatedCell: DefaultAggregatedCell,
        footer: DefaultFooterSumCell,
      },
      {
        id: "数字百分比",
        header: (cx) => <span className="text-secondary">数字百分比</span>,
        accessorKey: "percent",
        meta: { align: "right" },
        cell: (cx) => formatNumber(cx.getValue(), "percent"),
      },
      {
        id: "数字",
        header: (cx) => <span className="text-secondary">数字</span>,
        accessorKey: "float",
        meta: { align: "right" },
        cell: (cx) => formatNumber(cx.getValue(), "decimal"),
        aggregatedCell: DefaultAggregatedCell,
      },
      {
        id: "字符串数字",
        header: (cx) => <span className="text-secondary">字符串数字</span>,
        accessorKey: "stringNumber",
        meta: { align: "right" },
      },
      {
        id: "Date映射为字符串日期",
        header: (cx) => (
          <span className="text-secondary">Date映射为字符串日期</span>
        ),
        accessorFn: (row) => dateFormatter.format(row.date).replace(/\//g, "-"),
        meta: {
          align: "center",
        },
      },
      {
        id: "Date映射为字符串日期时间",
        header: (cx) => (
          <span className="text-secondary">Date映射为字符串日期时间</span>
        ),
        accessorFn: (row) =>
          datetimeFormatter.format(row.date).replace(/\//g, "-"),
        meta: {
          align: "center",
        },
        size: 200,
      },
      {
        id: "Date未映射",
        header: (cx) => (
          <span className="text-secondary">
            Date未映射但通过单元格格式化显示
          </span>
        ),
        accessorKey: "date",
        size: 250,
        cell: (cx) => (
          <div className="text-center">{formatDate(cx.getValue(), "time")}</div>
        ),
      },
    ],
  },
];

export default function Demo() {
  const [data, setData] = React.useState<Datum[]>([]);

  React.useEffect(() => {
    setData(makeDatumData(50));
  }, []);

  return (
    <div className="h-96">
      <DataTable data={data} columns={columns} getRowId={(row) => row.id} />
    </div>
  );
}
Demo.displayName = "DataTableDefDemo";
