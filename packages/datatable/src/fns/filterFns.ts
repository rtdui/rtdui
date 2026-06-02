/*
 * Custom Filter Functions
 * All filter functions only run during client-side filtering
 */

import type { FilterFn, Row } from "@tanstack/react-table";

/**
 * 值包含在filterValue数组中行
 * 该过滤函数会内置在`@tanstack/react-table` v9版本中
 */
export const filterFn_arrHas: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValue: Array<unknown>,
) => {
  return filterValue.some((val) => row.getValue<unknown>(columnId) === val);
};
// 当为空数组时自动设置为undefined
filterFn_arrHas.autoRemove = (val: any) => !val?.length;

/**
 * 值包含在filterValue数组中行
 * 该过滤函数会内置在`@tanstack/react-table` v9版本中
 */
export const filterFn_arrNot: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValue: Array<unknown>,
) => {
  return !filterValue.some((val) => row.getValue<unknown>(columnId) === val);
};
// 当为空数组时自动设置为undefined
filterFn_arrNot.autoRemove = (val: any) => !val?.length;
