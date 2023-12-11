import React from "react";
import type { Table } from "@tanstack/react-table";
import { utils as xlsxUtils, writeFileXLSX } from "xlsx";
import { IconDownload } from "@tabler/icons-react";

export function ExportTable(props: { table: Table<any> }) {
  const { table } = props;
  const exportXLSX = React.useCallback(async () => {
    /* Create worksheet from HTML DOM TABLE */
    const tableEle = document.querySelector(".data-table")!;
    const clonedTableEle = tableEle.cloneNode(true) as HTMLTableElement;
    const dropdownEles = clonedTableEle.querySelectorAll(".dropdown ");
    Array.prototype.forEach.call(dropdownEles, (el, i) => {
      el.innerHTML = "";
    });
    const wb = xlsxUtils.table_to_book(clonedTableEle);

    /* Export to file (start a download) */
    writeFileXLSX(wb, "表格导出.xlsx");
  }, []);
  return (
    <div className="dropdown dropdown-end">
      <label className="btn btn-ghost btn-circle btn-sm">
        <IconDownload />
      </label>
      <ul className="dropdown-content menu menu-sm p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="w-full" onClick={exportXLSX}>
            导出为Excel
          </a>
        </li>
      </ul>
    </div>
  );
}
