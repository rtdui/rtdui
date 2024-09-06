import React from "react";
import { DataTable, DataTableProps, type ColumnDef } from "@rtdui/datatable";
import { makePersonData, type Person } from "../../demoData/makeData";

const columns: ColumnDef<Person>[] = [
  {
    id: "ID",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "姓名",
    header: "姓名",
    accessorKey: "fullName",
  },
  {
    id: "年龄",
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

  React.useEffect(() => {
    setData(makePersonData(50));
  }, []);

  const ref = React.useRef<any>();

  const [rowSelection, setRowSelection] = React.useState({});

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
        />
      </div>
      <output>当前的选择: {JSON.stringify(rowSelection, undefined, 2)}</output>
    </div>
  );
}
Demo.displayName = "DataTableSelectionDemo";
