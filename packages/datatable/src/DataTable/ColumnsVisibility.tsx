import { Popover, Button } from "@rtdui/core";
import { IconEyeCheck } from "@tabler/icons-react";
import type { Table } from "@tanstack/react-table";
import { getAllLeafOrderColumns } from "./utils";

export function ColumnsVisibility(props: { table: Table<any> }) {
  const { table } = props;
  const columns = getAllLeafOrderColumns(table);

  return (
    <Popover placement="bottom">
      <Popover.Trigger>
        <Button size="sm" ghost sharp="circle">
          <IconEyeCheck />
        </Button>
      </Popover.Trigger>
      <Popover.Dropdown>
        <ul className="menu p-2 shadow bg-base-100 rounded-box">
          {columns.map((column) => (
            <li
              key={column.id}
              className={!column.getCanHide() ? "disabled" : undefined}
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
