import type {
  CellContext,
  ColumnDef,
  HeaderContext,
} from "@tanstack/react-table";
import React from "react";
import clsx from "clsx";
import { notifications } from "@rtdui/notifications";
import { DataTable } from "@rtdui/datatable";
import { makeData, newPerson, type Person } from "../../demoData/makeData";

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

function EditableInputCell(props: CellContext<any, any>) {
  const { table, getValue } = props;
  const initialValue = getValue();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    const newValue = ev.target.value;
    table.options.meta?.changeRow?.({
      ...props,
      value: newValue,
      validate: (params: any) => {
        // 验证
        if (Number(params.value) > 1000) {
          return "值不能大于1000";
        }
        return "";
      },
    });

    // if (
    //   row.original[
    //     (column.columnDef as AccessorKeyColumnDef<any, any>).accessorKey
    //   ] !== value
    // ) {
    //   // 验证
    //   if (Number(value) > 1000) {
    //     table.options.meta?.setErrorRow?.({
    //       rowId: row.id,
    //       field: (column.columnDef as AccessorKeyColumnDef<any, any>)
    //         .accessorKey as string,
    //       errorMsg: "值不能大于1000",
    //     });
    //   } else {
    //     table.options.meta?.setErrorRow?.({
    //       rowId: row.id,
    //       field: (column.columnDef as AccessorKeyColumnDef<any, any>)
    //         .accessorKey as string,
    //       errorMsg: "",
    //     });
    //   }
    //   // 更新
    //   table.options.meta?.changeRow?.({
    //     row: row.original,
    //     field: (column.columnDef as AccessorKeyColumnDef<any, any>)
    //       .accessorKey as string,
    //     value,
    //   });
    // }
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      className="input input-ghost input-xs w-full"
      value={value as string}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      onClick={(ev) => ev.stopPropagation()}
    />
  );
}

function EditableSelectCell(props: CellContext<any, any>) {
  const { table, getValue } = props;
  const initialValue = getValue();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = ev.target.value;
    setValue(newValue);
    table.options.meta?.changeRow?.({
      ...props,
      value: newValue === "男" ? "m" : "f",
    });
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <select
      className="select select-ghost select-xs w-full"
      value={value as string}
      onChange={onChange}
      onClick={(ev) => ev.stopPropagation()}
    >
      <option value={"男"}>男</option>
      <option value={"女"}>女</option>
    </select>
  );
}

const editable = true;
const columns: ColumnDef<Person>[] = [
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
        size: 100,
        minSize: 100,
        accessorFn: (row) => (row.enum === "m" ? "男" : "女"),
        accessorKey: "enum",
        meta: {
          align: "center",
          showFilterList: true,
        },
        filterFn: "equalsString",
        cell: editable ? EditableSelectCell : (cx) => cx.getValue().toString(),
        header: (cx) => <span className="text-secondary">枚举</span>,
      },
      {
        id: "布尔",
        size: 100,
        minSize: 100,
        accessorFn: (row) => (row.boolean ? "是" : "否"),
        accessorKey: "boolean",
        meta: {
          align: "center",
          showFilterList: true,
        },
        filterFn: "equalsString",
        header: (cx) => <span className="text-secondary">布尔</span>,
        // cell: (cx) => cx.column.columnDef.meta?.mapping?.[cx.getValue()],
      },
      {
        id: "整数",
        meta: { align: "right" },
        accessorFn: (row) => row.integer,
        header: (cx) => <span className="text-secondary">整数</span>,
        cell: (cx) => formatNumber(cx.getValue(), "integer"),
        aggregatedCell: DefaultAggregatedCell,
        footer: DefaultFooterSumCell,
      },
      {
        id: "数字百分比",
        accessorKey: "percent",
        meta: { align: "right" },
        header: (cx) => <span className="text-secondary">数字百分比</span>,
        cell: (cx) => formatNumber(cx.getValue(), "percent"),
      },
      {
        id: "数字",
        accessorKey: "number",
        meta: { align: "right" },
        header: (cx) => <span className="text-secondary">数字</span>,
        cell: (cx) => formatNumber(cx.getValue(), "decimal"),
        aggregatedCell: DefaultAggregatedCell,
      },
      {
        id: "字符串数字",
        accessorKey: "stringNumber",
        meta: { align: "right" },
        header: (cx) => <span className="text-secondary">字符串数字</span>,
      },
      {
        id: "日期转字符串",
        accessorFn: (row) =>
          dateFormatter.format(row.birthdate).replace(/\//g, "-"),
        meta: {
          align: "center",
        },
        header: (cx) => <span className="text-secondary">日期</span>,
      },
      {
        id: "日期时间转字符串",
        accessorFn: (row) =>
          datetimeFormatter.format(row.birthdate).replace(/\//g, "-"),
        meta: {
          align: "center",
        },
        header: (cx) => <span className="text-secondary">日期时间</span>,
      },
      {
        id: "Date对象",
        accessorKey: "birthdate",
        header: (cx) => <span className="text-secondary">Date对象</span>,
        cell: (cx) => (
          <div className="text-center">{formatDate(cx.getValue(), "time")}</div>
        ),
      },
    ],
  },
  {
    header: "个人信息",
    columns: [
      {
        id: "姓名",
        accessorFn: (row) => `${row.firstName}${row.lastName}`,
        header: "姓名",
        meta: {
          showFilterList: true,
        },
      },
      {
        id: "年龄",
        accessorKey: "age",
        header: () => "年龄",
        cell: editable ? EditableInputCell : (cx) => cx.getValue().toString(),
        aggregationFn: "mean",
        aggregatedCell: ({ getValue }: any) => (
          <div className="flex justify-between">
            <span>平均:</span>
            <span>{Math.round(getValue() * 100) / 100}</span>
          </div>
        ),
      },
    ],
  },
];

export default function DataTableDemo() {
  const [data, setData] = React.useState<Person[]>([]);

  React.useEffect(() => {
    setData(makeData(50, 2));
    // setData(makeData(500));
  }, []);

  const ref = React.useRef<any>(null);
  const handleNewRowClick = () => {
    ref.current.addRow(newPerson());
  };
  const handleDeleteRowClick = () => {
    ref.current.deleteRow();
  };
  const handleSaveClick = () => {
    try {
      const changes = ref.current.getChanges();
      console.log(changes);
    } catch (ex) {
      notifications.show({
        content: (ex as Error).message,
      });
    }
  };

  const [rowSelection, setRowSelection] = React.useState({});

  return (
    <div className="flex-1 w-screen h-full overflow-hidden flex flex-col">
      <div>
        <button
          className="btn btn-ghost btn-primary"
          onClick={handleNewRowClick}
        >
          新增
        </button>
        <button
          className="btn btn-ghost btn-primary"
          onClick={handleDeleteRowClick}
        >
          删除
        </button>
        <button className="btn btn-ghost btn-primary" onClick={handleSaveClick}>
          保存
        </button>
      </div>

      <DataTable
        ref={ref}
        className={clsx("flex-1 basis-0 overflow-hidden")}
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        enableAutoRowNumber
        state={{ rowSelection }}
        enableRowSelection
        enableClickRowSelection={false}
        onRowSelectionChange={setRowSelection}
        // getSubRows={(row) => row.subRows}
        // enableGrouping={false}
      />
    </div>
  );
}
