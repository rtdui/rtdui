import { Popover, Button } from "@rtdui/core";
import { IconEyeCheck } from "@tabler/icons-react";
import type { Table } from "@tanstack/react-table";
import { getAllLeafOrderColumns } from "./utils";

export function ColumnsVisibility(props: { table: Table<any> }) {
	const { table } = props;
	const columns = getAllLeafOrderColumns(table);

	return (
		<Popover position="bottom">
			<Popover.Target>
				<Button size="sm" ghost shape="circle">
					<IconEyeCheck />
				</Button>
			</Popover.Target>
			<Popover.Dropdown>
				<ul className="menu p-2">
					{columns.map((column) => (
						<li
							key={column.id}
							className={!column.getCanHide() ? "menu-disabled" : undefined}
						>
							<label>
								<input
									type="checkbox"
									disabled={!column.getCanHide()}
									checked={column.getIsVisible()}
									onChange={column.getToggleVisibilityHandler()}
									className="checkbox checkbox-xs"
								/>
								{column.id}
							</label>
						</li>
					))}
				</ul>
			</Popover.Dropdown>
		</Popover>
	);
}
