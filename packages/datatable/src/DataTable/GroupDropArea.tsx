import clsx from "clsx";
import { IconX } from "@tabler/icons-react";
import type { Table, Column } from "@tanstack/react-table";
import { useDrop } from "react-dnd";

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
      className={clsx("w-full h-full flex items-center", className)}
    >
      {grouping.map((columnId: any) => {
        return (
          <div
            key={columnId}
            className="rounded-full bg-base-200 flex items-center px-3 mr-1"
          >
            {columnId}{" "}
            <button
              type="button"
              className="btn btn-ghost btn-circle btn-xs"
              onClick={() => handleCloseClick(columnId)}
            >
              <IconX size={16} />
            </button>
          </div>
        );
      })}
      {"\u00A0"}
      <div className="flex-1">拖拉列头到此进行分组</div>
    </div>
  ) : null;
}
