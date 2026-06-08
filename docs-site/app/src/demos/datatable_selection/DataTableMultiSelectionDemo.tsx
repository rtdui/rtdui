import { useEffect, useRef, useState } from "react";
import {
  DataTable,
  type DataTableProps,
  type ColumnDef,
} from "@rtdui/datatable";
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
const tableProps: Partial<DataTableProps> = {
  enableVirtualized: false,
  enablePagination: false,
  enableColumnReorder: true,
  enableColumnResizing: true,
  enableSorting: true,
  enableGrouping: false,
  enableFilters: true,
  filterFromLeafRows: false,
  enableHiding: true,
  enableRowSelection: true,
  enableMultiRowSelection: true,
  enableSubRowSelection: false,
  enableClickRowSelection: false,
  selectAllForAllPages: true,
  enableStickyHeader: true,
  enableAutoRowNumber: false,
  enableExport: true,
};
export default function Demo() {
  const [data, setData] = useState<Person[]>([]);

  useEffect(() => {
    setData(makePersonData(50));
  }, []);

  const ref = useRef<any>(null);

  const [rowSelection, setRowSelection] = useState({});
  const [activedRowId, setActivedRowId] = useState<string | number>("");

  return (
    <div className="flex flex-col gap-4">
      <div className="h-96">
        <DataTable
          ref={ref}
          data={data}
          columns={columns}
          {...tableProps}
          onRowSelectionChange={setRowSelection}
          state={{
            rowSelection,
          }}
          onRowClick={(e, row) => {
            setActivedRowId(row.id);
          }}
          onRowDoubleClick={(e, row) => {
            console.log("双击事件触发", row.id);
          }}
          className="[&&&_tbody_tr.actived_td]:bg-info/10 [&&&_tbody_tr.actived_th]:bg-info/10"
        />
      </div>
      <output>当前选择: {JSON.stringify(rowSelection, undefined, 2)}</output>
      <output>当前激活行: {activedRowId}</output>
    </div>
  );
}
Demo.displayName = "DataTableMultiSelectionDemo";
