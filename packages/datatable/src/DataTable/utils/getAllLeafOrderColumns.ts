import type { Table } from "@tanstack/react-table";

/**
 * table.getAllLeafColumns()和table.getVisibleLeafColumns()得到的顺序和显示的顺序是不一致的.
 *
 * table.getAllLeafColumns()和table.getVisibleLeafColumns()以及row.getAllCells()得到是:分组列=>pinned列=>unpinned列ordering, 而row.getVisibleCells()以及headerGroup.headers中的是: pinned列=>分组列=>unpinned列ordering
 *
 * 该方法是按row.getVisibleCells()的顺序得到可见列的列表.
 * @param table
 * @returns
 */
export function getAllLeafOrderColumns(table: Table<any>) {
  return [
    ...table.getLeftLeafColumns(),
    ...table.getCenterLeafColumns(),
    ...table.getRightLeafColumns(),
  ];
}
