import clsx from "clsx";
import type { Table, Column } from "@tanstack/react-table";
import { useDrop } from "react-dnd";
import { CloseButton } from "@rtdui/core";

export interface GroupDropAreaProps {
	table: Table<any>;
	enableGrouping: boolean;
	className: string;
}
export function GroupDropArea(props: GroupDropAreaProps) {
	const { table, enableGrouping, className } = props;
	const { getState } = table;
	const { grouping } = getState();
	const [, dropRef] = useDrop({
		accept: "column",
		canDrop(item, monitor) {
			return enableGrouping;
		},
		drop: (item: Column<any>) => {
			item.toggleGrouping();
		},
	});

	const handleCloseClick = (columnId: string) => {
		const column = table.getColumn(columnId)!;
		column.toggleGrouping();
	};

	return enableGrouping ? (
		<div
			ref={dropRef}
			className={clsx("w-full h-full flex items-center gap-1", className)}
		>
			{grouping.map((columnId: any) => {
				return (
					<div
						key={columnId}
						className="rounded-full bg-base-200 flex items-center pl-3 pr-1 mr-1"
					>
						{columnId}
						<CloseButton size="xs" onClick={() => handleCloseClick(columnId)} />
					</div>
				);
			})}
			<div className="flex-1">拖拉列头到此进行分组</div>
		</div>
	) : null;
}
