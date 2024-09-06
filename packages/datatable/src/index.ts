export * from "./DataTable";
export * from "./DataTableSelect";

export * from "./utils/getSelectedRows";
export * from "./utils/getColumnDefId";
export * from "./utils/getAllFlatColumns";

export type * from "@tanstack/table-core";

import type { CellContext, RowData } from "@tanstack/table-core";
declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: "left" | "center" | "right";
    showFilterList?: boolean;
    expandable?: boolean;
  }
  interface TableMeta<TData extends RowData> {
    addRow?: (newRow: TData) => void;
    changeRow?: (
      params: CellContext<TData, any> & {
        value: any;
      }
    ) => void;
    deleteRow?: () => void;
    getChanges?: () => {
      added: any[];
      changed: Record<string, any>;
      deleted: any[];
    };
    getSelectedRowIds?: () => any[];
  }
}
