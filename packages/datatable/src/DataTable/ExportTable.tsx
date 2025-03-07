import React from "react";
import type { Table } from "@tanstack/react-table";
import { utils as xlsxUtils, writeFileXLSX } from "xlsx";
import { IconDownload } from "@tabler/icons-react";
import { Button, Popover } from "@rtdui/core";

export function ExportTable(props: {
	table: Table<any>;
	tableRef: React.RefObject<HTMLTableElement>;
}) {
	const { table, tableRef } = props;
	const exportXLSX = React.useCallback(async () => {
		/* Create worksheet from HTML DOM TABLE */
		const tableEle = tableRef.current!;
		const clonedTableEle = tableEle.cloneNode(true) as HTMLTableElement;
		const dropdownEles = clonedTableEle.querySelectorAll(".dropdown ");
		Array.prototype.forEach.call(dropdownEles, (el, i) => {
			el.innerHTML = "";
		});
		const wb = xlsxUtils.table_to_book(clonedTableEle);

		/* Export to file (start a download) */
		writeFileXLSX(wb, "表格导出.xlsx");
	}, [tableRef]);
	return (
		<Popover position="bottom">
			<Popover.Target>
				<Button size="sm" ghost shape="circle">
					<IconDownload />
				</Button>
			</Popover.Target>
			<Popover.Dropdown>
				<ul className="menu p-2">
					<li>
						<a className="w-full" onClick={exportXLSX}>
							导出为Excel
						</a>
					</li>
				</ul>
			</Popover.Dropdown>
		</Popover>
	);
}
