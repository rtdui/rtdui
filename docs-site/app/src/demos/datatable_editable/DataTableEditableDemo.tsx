import type { ColumnDef, CellContext } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "@rtdui/datatable";
import { CloseButton, NumberInput, TextInput } from "@rtdui/core";
import clsx from "clsx";
import {
  makePersonData,
  newEmptyPerson,
  type Person,
} from "../../demoData/makeData";

const getRowId = (row: Person) => row.id;

function FullNameEditableInputCell(props: CellContext<any, any>) {
  const { table, getValue } = props;
  const initialValue = getValue();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    table.options.meta?.changeRow?.({
      ...props,
      value: newValue,
    });
  };

  return (
    <TextInput
      variant="ghost"
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

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    const newValue = ev.target.value;
    // 如果验证通过则加入变更集,否则加入错误集
    table.options.meta?.changeRow?.({
      ...props,
      value: newValue,
    });
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <NumberInput
      variant="ghost"
      allowNegative={false}
      allowDecimal={false}
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
      value: newValue === "男" ? "male" : "female",
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
        id: "姓名",
        header: "姓名",
        accessorKey: "fullName",
        cell: FullNameEditableInputCell,
      },
      {
        id: "年龄",
        header: "年龄",
        size: 230,
        accessorKey: "age",
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
        id: "性别",
        header: "性别",
        size: 120,
        minSize: 120,
        accessorKey: "gender",
        accessorFn: (row) =>
          row.gender === "male"
            ? "男"
            : row.gender === "female"
              ? "女"
              : row.gender,
        meta: {
          showFilterList: true,
        },
        filterFn: "equalsString",
        cell: GenderEditableSelectCell,
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
    setData(makePersonData(10));
  }, []);

  const ref = React.useRef<any>(null!);
  const handleNewRowClick = () => {
    ref.current.addRow(newEmptyPerson(--newId));
  };
  const handleDeleteRowClick = () => {
    ref.current.deleteRow();
  };
  const handleSaveClick = () => {
    try {
      const changes = ref.current.getChanges();
      outputRef.current!.innerHTML = JSON.stringify(changes, undefined, 2);
    } catch (ex: any) {
      setError(ex.message);
    }
  };

  const [error, setError] = React.useState("");

  const outputRef = React.useRef<HTMLPreElement>(null);

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
        保存的数据结构查看底部的输出
      </div>
      <ul className="text-xs">
        <li>名字,年龄和性别列允许编辑: </li>
        <li>名字列使用TextInput作为编辑器;</li>
        <li>
          年龄列使用NumberInput作为编辑器,同时启用了自定义输入验证: 不能大于200;
        </li>
        <li>性别列使用下拉选择作为编辑器。</li>
      </ul>

      <DataTable
        ref={ref}
        data={data}
        columns={columns}
        {...defaultProps}
        validate={{
          fullName: (val, row, data) => {
            if (val === "") {
              return "姓名必须";
            }
          },
          age: (val, row, data) => {
            // 验证
            if (val === "") {
              return "年龄必须";
            }
            if (Number(val) > 200) {
              return "值不能大于200";
            }
          },
        }}
      />

      <output className="mt-4 flex flex-col gap-4">
        output:
        <pre ref={outputRef} className="bg-base-100"></pre>
      </output>

      <div className={clsx("toast z-10", { hidden: !error })}>
        <div className="alert alert-error">
          <div className="flex items-center gap-4">
            <span>{error}</span>
            <CloseButton onClick={() => setError("")} />
          </div>
        </div>
      </div>
    </div>
  );
}

Demo.displayName = "DataTableEditableDemo";
