import type { ColumnDef, CellContext } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "@rtdui/datatable";
import { makePersonData, type Person } from "../../demoData/makeData";

const DepositAggregatedCell = (props: CellContext<Person, any>) => (
  <div className="flex justify-between">
    <span>范围:</span>[{props.getValue()[0]}, {props.getValue()[1]}]
  </div>
);

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    header: "姓名",
    accessorKey: "fullName",
  },
  {
    header: "年龄",
    accessorKey: "age",
  },
  {
    header: "存款",
    size: 280,
    accessorKey: "deposit",
    aggregatedCell: DepositAggregatedCell,
    aggregationFn: "extent",
  },
];

export default function Demo() {
  const [data, setData] = React.useState<Person[]>([]);

  React.useEffect(() => {
    setData(makePersonData(50));
  }, []);

  return (
    <div className="h-96">
      <DataTable data={data} columns={columns} enableGrouping autoExpandAll />
    </div>
  );
}
Demo.displayName = "DataTableGroupingDemo";
