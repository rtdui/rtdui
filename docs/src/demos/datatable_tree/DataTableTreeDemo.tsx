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
  getSubRows: (row: any) => row.subRows,
  enableGrouping: false,
  enableFilters: true,
  filterFromLeafRows: false,
  enableHiding: true,
  enableRowSelection: false,
  enableMultiRowSelection: false,
  enableSubRowSelection: false,
  enableClickRowSelection: false,
  selectAllForAllPages: false,
  enableStickyHeader: true,
  enableAutoRowNumber: false,
  enableExport: true,
};
export default function Demo() {
  const [data, setData] = React.useState<Person[]>([]);

  React.useEffect(() => {
    setData(makeData(50, 3, 2));
  }, []);

  return (
    <div className="h-96">
      <DataTable data={data} columns={columns} {...tableProps} />
    </div>
  );
}
Demo.displayName = "DataTableTreeDemo";
