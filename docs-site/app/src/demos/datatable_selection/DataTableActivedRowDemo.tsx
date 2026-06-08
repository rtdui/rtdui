import React from "react";
import {
  DataTable,
  type DataTableProps,
  type RowActiveState,
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
  enableRowSelection: false,
  enableMultiRowSelection: false,
  enableSubRowSelection: false,
  enableClickRowSelection: false,
  selectAllForAllPages: true,
  enableStickyHeader: true,
  enableAutoRowNumber: false,
  enableExport: true,
};
export default function Demo() {
  const [data, setData] = React.useState<Person[]>([]);

  const [activedRowId, setActivedRowId] = React.useState<RowActiveState>(null);

  React.useEffect(() => {
    setData(makePersonData(50));
  }, []);

  const ref = React.useRef<any>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="h-96">
        <DataTable
          ref={ref}
          data={data}
          columns={columns}
          {...tableProps}
          state={{
            rowActive: activedRowId,
          }}
          onRowActiveChange={setActivedRowId}
          className="[&&&_tbody_tr.actived_td]:bg-info/10 [&&&_tbody_tr.actived_th]:bg-info/10"
        />
      </div>
      <output>当前激活的行id: {activedRowId}</output>
    </div>
  );
}
Demo.displayName = "DataTableClickRowSelectionDemo";
