export * from "./DataTable";
import type { CellContext, RowData } from "@tanstack/react-table";

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
        validate?: (cx: CellContext<TData, any> & { value: any }) => string;
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
