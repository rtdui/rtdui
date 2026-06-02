import { flattenBy } from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnDefResolved,
  GroupColumnDef,
} from "@tanstack/react-table";

/** 将嵌套的columnDefs展平为一维数组 */
export function getAllFlatColumns<TData>(
  columnDefs: ColumnDef<TData, unknown>[],
) {
  return flattenBy(
    columnDefs,
    (columnDef) => (columnDef as GroupColumnDef<TData, unknown>).columns ?? [],
  );
}

/**
 * 从列定义数组中得到所有叶子列
 */
export function getLeafColumns<TData>(columnDefs: ColumnDef<TData, unknown>[]) {
  const recurseColumns = (
    columnDefs: ColumnDef<TData, unknown>[],
  ): ColumnDef<TData, unknown>[] =>
    columnDefs.flatMap((d): any => {
      const groupingColumnDef = d as GroupColumnDef<TData, unknown>;
      if (groupingColumnDef.columns) {
        return recurseColumns(groupingColumnDef.columns);
      }
      return d;
    });
  return recurseColumns(columnDefs);
}

/**
 * 从列定义得到列ID
 * 如果有id字段定义, 则id字段值作为列ID
 * 否则, 如果有accessorKey字段定义, 则accessorKey字段值作为列ID
 * 否则, 如果有header字段定义且为字符串值, 则header字段值作为列ID
 * 最后, 列ID为undefined
 */
export function getColumnDefId<TData>(columnDef: ColumnDef<TData>) {
  const resolvedColumnDef = columnDef as ColumnDefResolved<TData>;
  const { id, accessorKey, header } = resolvedColumnDef;
  return (
    id ??
    (accessorKey ? accessorKey.replace(".", "_") : undefined) ??
    (typeof header === "string" ? header : undefined)
  );
}

/**
 * 从列定义数组中得到需要固定在左侧和右侧的列ID
 * @returns 返回 [pinLefts, pinRights] 的元组
 */
export function getPinColumnId<TData>(columnDef: ColumnDef<TData>[]) {
  const leafColumns = getLeafColumns(columnDef);
  const pinLeftColumnIDs = leafColumns
    .filter((d) => d.meta?.pinToLeft)
    .map((d) => getColumnDefId(d))
    .filter((d) => d !== undefined);

  const pinRigtColumnIDs = leafColumns
    .filter((d) => d.meta?.pinToRight)
    .map((d) => getColumnDefId(d))
    .filter((d) => d !== undefined);

  return [pinLeftColumnIDs, pinRigtColumnIDs];
}
