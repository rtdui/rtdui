import type { ColumnDef, CellContext } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "@rtdui/datatable";
import { IconX } from "@tabler/icons-react";
import { makeData, type Person, newPerson } from "../../demoData/makeData";
import { NumberInput, TextInput } from "@rtdui/core";
import clsx from "clsx";

const getRowId = (row: Person) => row.id;

function LastNameEditableInputCell(props: CellContext<any, any>) {
  const { table, getValue } = props;
  const initialValue = getValue();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const validate = (
    params: CellContext<Person, string> & { value: string }
  ) => {
    // 验证
    if (params.value.trim() === "") {
      return "名字不能为空";
    }
    return "";
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
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
  };

  return (
    <TextInput
      ghost
      bordered={false}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      onClick={(ev) => ev.stopPropagation()}
      onBlur={onBlur}
    />
  );
}

function AgeEditableInputWithValidateCell(props: CellContext<any, any>) {
  const { table, getValue } = props;
  const initialValue = getValue();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const validate = (
    params: CellContext<Person, string> & { value: string }
  ) => {
    // 验证
    if (Number(params.value) > 200) {
      return "值不能大于200";
    }
    return "";
  };

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    const newValue = ev.target.value;
    // 如果验证通过则加入变更集,否则加入错误集
    table.options.meta?.changeRow?.({
      ...props,
      value: newValue,
      validate,
    });
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <NumberInput
      ghost
      allowNegative={false}
      allowDecimal={false}
      bordered={false}
      value={value}
      onChange={setValue}
      onBlur={onBlur}
      onClick={(ev) => ev.stopPropagation()}
    />
  );
}

function GenderEditableSelectCell(props: CellContext<any, any>) {
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
      value={value}
      onChange={onChange}
      onClick={(ev) => ev.stopPropagation()}
    >
      <option value={"男"}>男</option>
      <option value={"女"}>女</option>
    </select>
  );
}

const columns: ColumnDef<Person>[] = [
  {
    id: "ID",
    header: "ID",
    accessorKey: "id",
    enableColumnFilter: false,
    minSize: 80,
    size: 80,
  },
  {
    header: "个人信息",
    columns: [
      {
        id: "名",
        accessorKey: "lastName",
        header: "名",
        cell: LastNameEditableInputCell,
      },
      {
        id: "年龄",
        minSize: 230,
        accessorKey: "age",
        header: () => "年龄",
        cell: AgeEditableInputWithValidateCell,
        aggregationFn: "mean",
        aggregatedCell: ({ getValue }) => (
          <div className="flex justify-between">
            <span>平均:</span>
            <span>{Math.round(getValue() * 100) / 100}</span>
          </div>
        ),
      },
      {
        id: "gender",
        size: 120,
        minSize: 120,
        accessorFn: (row) => (row.enum === "m" ? "男" : "女"),
        accessorKey: "enum",
        meta: {
          showFilterList: true,
        },
        filterFn: "equalsString",
        cell: GenderEditableSelectCell,
        header: (cx) => <span className="text-secondary">性别</span>,
        aggregatedCell: "",
      },
    ],
  },
];

const defaultProps = {
  getRowId,
  enableVirtualized: false,
  enablePagination: false,
  enableColumnReorder: true,
  enableColumnResizing: true,
  enableSorting: true,
  enableTree: false,
  enableGrouping: false,
  enableFilters: true,
  filterFromLeafRows: false,
  enableHiding: true,
  enableRowSelection: true,
  enableMultiRowSelection: true,
  enableSubRowSelection: false,
  enableClickRowSelection: false,
  selectAllForAllPages: false,
  enableCompactStyle: true,
  enableStickyHeader: true,
  enableAutoRowNumber: false,
  enableExport: true,
};

let newId = 0;

export default function Demo() {
  const [data, setData] = React.useState<Person[]>([]);

  React.useEffect(() => {
    // setData(makeData(50, 2));
    setData(makeData(10));
  }, []);

  const ref = React.useRef<any>(null!);
  const handleNewRowClick = () => {
    ref.current.addRow(newPerson(--newId));
  };
  const handleDeleteRowClick = () => {
    ref.current.deleteRow();
  };
  const handleSaveClick = () => {
    try {
      const changes = ref.current.getChanges();
      console.log(changes);
    } catch (ex: any) {
      setError(ex.message);
    }
  };

  const [error, setError] = React.useState("");

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <button className="btn btn-primary btn-sm" onClick={handleNewRowClick}>
          新增
        </button>
        <button
          className="btn btn-warning btn-sm"
          onClick={handleDeleteRowClick}
        >
          删除
        </button>
        <button className="btn btn-info btn-sm" onClick={handleSaveClick}>
          保存
        </button>
        (打开浏览器的开发工具(F12)的console中查看将要保存的数据结构)
      </div>
      <ul className="text-xs">
        <li>名字,年龄和性别列允许编辑: </li>
        <li>名字列使用TextInput作为编辑器;</li>
        <li>
          年龄列使用NumberInput作为编辑器,同时启用了自定义输入验证: 不能大于200;
        </li>
        <li>性别列使用下拉选择作为编辑器。</li>
      </ul>

      <DataTable ref={ref} data={data} columns={columns} {...defaultProps} />

      <div className={clsx("toast z-10", { hidden: !error })}>
        <div className="alert alert-error">
          <div className="flex items-center gap-4">
            <span>{error}</span>
            <button className="btn btn-circle btn-xs">
              <IconX size={16} onClick={() => setError("")} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Demo.displayName = "DataTableEditableDemo";
