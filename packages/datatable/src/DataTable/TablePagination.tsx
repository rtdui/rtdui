import React from "react";
import { Pagination, Select, TextInput } from "@rtdui/core";
import type { Table } from "@tanstack/react-table";

export function TablePagination(props: { table: Table<any> }) {
  const { table } = props;
  const [page, setPage] = React.useState(1);
  return (
    <div className="flex flex-col gap-3 my-4 md:flex-row md:items-center">
      <Pagination
        count={table.getPageCount()}
        size="sm"
        page={page}
        onChange={(page) => {
          setPage(page);
          table.setPageIndex(page - 1);
        }}
      />
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <div className="divider divider-horizontal mx-0"></div>
      <span className="flex items-center gap-1">
        Go to page:
        <TextInput
          type="number"
          min={1}
          max={table.getPageCount()}
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            setPage(page + 1);
            table.setPageIndex(page);
          }}
        />
      </span>
      <div className="divider divider-horizontal mx-0"></div>
      <Select
        value={table.getState().pagination.pageSize.toString()}
        onChange={(val) => {
          table.setPageSize(Number(val));
        }}
        className="w-20"
        options={["10", "20", "30", "40", "50"]}
      />
    </div>
  );
}
