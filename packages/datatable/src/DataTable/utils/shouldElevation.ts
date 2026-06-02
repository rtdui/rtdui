import type { Table, Column } from "@tanstack/react-table";

/**
 * 是否是左侧最后一个固定列
 * @param table
 * @param column
 * @param scrolling
 * @returns
 */
export function shouldElevationLeft(
  table: Table<unknown>,
  column: Column<unknown>,
) {
  const leftPinned = table.getState().columnPinning.left!;
  const index = leftPinned.findIndex((d) => d === column.id);
  if (index === leftPinned.length - 1) {
    return true;
  }
  return false;
}

/**
 * 是否是右侧第一个固定列
 * @param table
 * @param column
 * @param scrolling
 * @returns
 */
export function shouldElevationRight(
  table: Table<unknown>,
  column: Column<unknown>,
) {
  const rightPinned = table.getState().columnPinning.right!;
  const index = rightPinned.findIndex((d) => d === column.id);
  // if (index === rightPinned.length - 1) {
  if (index === 0) {
    return true;
  }
  return false;
}
