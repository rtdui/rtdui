import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable, DataTableProps } from "@rtdui/datatable";
import { makeData, type Person } from "../../demoData/makeData";

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "姓名",
    accessorFn: (row) => `${row.firstName}${row.lastName}`,
  },
  {
    accessorKey: "age",
    header: "年龄",
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
  const [data, setData] = React.useState<Person[]>([]);

  React.useEffect(() => {
    setData(makeData(50));
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
      <output>当前选择: {JSON.stringify(rowSelection, undefined, 2)}</output>
    </div>
  );
}
Demo.displayName = "DataTableMultiSelectionDemo";
