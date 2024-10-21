export * from "./DataTable";
export * from "./DataTableSelect";

export * from "./utils/getSelectedRows";
export * from "./utils/getColumnDefId";
export * from "./utils/getAllFlatColumns";

export type * from "@tanstack/table-core";

import type { CellContext, RowData } from "@tanstack/table-core";
import {
  RowActiveInstance,
  RowActiveOptions,
  RowActiveRow,
  RowActiveTableState,
} from "./DataTable/features/RowActive";

declare module "@tanstack/table-core" {
  //merge our new feature's state with the existing table state
  interface TableState extends RowActiveTableState {}
  //merge our new feature's options with the existing table options
  interface TableOptionsResolved<TData extends RowData>
    extends RowActiveOptions<TData> {}
  //merge our new feature's instance APIs with the existing table instance APIs
  interface Table<TData extends RowData> extends RowActiveInstance<TData> {}
  // if you need to add row instance APIs...
  interface Row<TData extends RowData> extends RowActiveRow {}

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
