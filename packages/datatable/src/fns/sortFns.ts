/*
 * Custom Sort Functions
 * All sort functions only run during client-side sorting
 */

import type { SortingFn, Row } from "@tanstack/react-table";
import { pinyinComparer } from "../utils/pinyinComparer";

export const sortFn_pinyin: SortingFn<any> = (
  rowA: Row<any>,
  rowB: Row<any>,
  columnId: string,
) => {
  return pinyinComparer(rowA.original[columnId], rowB.original[columnId]);
};
