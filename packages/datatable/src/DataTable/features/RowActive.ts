import {
  OnChangeFn,
  Table,
  Row,
  RowModel,
  Updater,
  RowData,
  TableFeature,
  getMemoOptions,
  makeStateUpdater,
  memo,
} from "@tanstack/react-table";

export type RowActiveState = string | number | null;

export interface RowActiveTableState {
  rowActive: RowActiveState;
}

// define types for our new feature's table options
export interface RowActiveOptions<TData extends RowData> {
  /**
   * - Enables/disables row active for all rows in the table OR
   * - A function that given a row, returns whether to enable/disable row active for that row
   * @default true
   */
  enableRowActive?: boolean | ((row: Row<TData>) => boolean);
  /**
   * If provided, this function will be called with an `updaterFn` when `state.rowActive` changes.
   * This overrides the default internal state management,
   * so you will need to persist the state change either fully or partially outside of the table.
   */
  onRowActiveChange?: OnChangeFn<RowActiveState>;
}

// define types for our new feature's row instance APIs
export interface RowActiveRow {
  /**
   * Returns whether or not the row can be actived.
   */
  getCanActive: () => boolean;
  /**
   * Returns whether or not the row is actived.
   */
  getIsActived: () => boolean;
  /**
   * Returns a handler that can be used to toggle the row.
   */
  getToggleActivedHandler: () => (event: unknown) => void;
  /**
   * Active/deActive the row.
   */
  toggleActived: (value?: boolean) => void;
}

// Define types for our new feature's table instance APIs
export interface RowActiveInstance<TData extends RowData> {
  /**
   * Returns the row model of all rows that are actived after filtering has been applied.
   */
  getFilteredActivedRowModel: () => RowModel<TData>;
  /**
   * Returns the row model of all rows that are actived after grouping has been applied.
   */
  getGroupedActivedRowModel: () => RowModel<TData>;
  /**
   * Returns whether or not any rows on the current page are actived.
   */
  getIsSomePageRowsActived: () => boolean;
  /**
   * Returns whether or not any rows in the table are actived.
   */
  getIsSomeRowsActived: () => boolean;
  /**
   * Returns the core row model of all rows before row active has been applied.
   */
  getPreActivedRowModel: () => RowModel<TData>;
  /**
   * Returns the row model of all rows that are actived.
   */
  getActivedRowModel: () => RowModel<TData>;
  /**
   * Resets the **rowActive** state to the `initialState.rowActive`, or `true` can be passed to force a default blank state reset to `{}`.
   */
  resetRowActive: (defaultState?: boolean) => void;
  /**
   * Sets or updates the `state.rowActive` state.
   */
  setRowActive: (updater: Updater<RowActiveState>) => void;
}

// Here is all of the actual code for our new feature
export const RowActive: TableFeature = {
  getInitialState: (state): RowActiveTableState => {
    return {
      rowActive: null,
      ...state,
    };
  },

  getDefaultOptions: <TData extends RowData>(
    table: Table<TData>
  ): RowActiveOptions<TData> => {
    return {
      onRowActiveChange: makeStateUpdater("rowActive", table),
      enableRowActive: true,
    };
  },

  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.setRowActive = (updater) =>
      table.options.onRowActiveChange?.(updater);
    table.resetRowActive = (defaultState) =>
      table.setRowActive(
        defaultState ? null : table.initialState.rowActive ?? null
      );

    table.getPreActivedRowModel = () => table.getCoreRowModel();
    table.getActivedRowModel = memo(
      () => [table.getState().rowActive, table.getCoreRowModel()],
      (rowActive, rowModel) => {
        if (rowActive === null) {
          return {
            rows: [],
            flatRows: [],
            rowsById: {},
          };
        }

        return activeRowsFn(table, rowModel);
      },
      getMemoOptions(table.options, "debugTable", "getActivedRowModel")
    );

    table.getFilteredActivedRowModel = memo(
      () => [table.getState().rowActive, table.getFilteredRowModel()],
      (rowActive, rowModel) => {
        if (rowActive === null) {
          return {
            rows: [],
            flatRows: [],
            rowsById: {},
          };
        }

        return activeRowsFn(table, rowModel);
      },
      getMemoOptions(table.options, "debugTable", "getFilteredActivedRowModel")
    );

    table.getGroupedActivedRowModel = memo(
      () => [table.getState().rowActive, table.getSortedRowModel()],
      (rowActive, rowModel) => {
        if (rowActive === null) {
          return {
            rows: [],
            flatRows: [],
            rowsById: {},
          };
        }

        return activeRowsFn(table, rowModel);
      },
      getMemoOptions(table.options, "debugTable", "getGroupedActivedRowModel")
    );

    table.getIsSomeRowsActived = () => {
      const totalActived = table.getState().rowActive !== null ? 1 : 0;
      return (
        totalActived > 0 &&
        totalActived < table.getFilteredRowModel().flatRows.length
      );
    };

    table.getIsSomePageRowsActived = () => {
      const paginationFlatRows = table.getPaginationRowModel().flatRows;
      return paginationFlatRows
        .filter((row) => row.getCanActive())
        .some((d) => d.getIsActived());
    };
  },

  createRow: <TData extends RowData>(
    row: Row<TData>,
    table: Table<TData>
  ): void => {
    row.toggleActived = (value) => {
      const isActived = row.getIsActived();
      // 如果行已经激活则什么也不做
      if (isActived) return;

      table.setRowActive((old) => {
        value = typeof value !== "undefined" ? value : !isActived;

        if (row.getCanActive() && isActived === value) {
          return old;
        }

        let activedRowId = old;

        if (value) {
          if (row.getCanActive()) {
            activedRowId = row.id;
          }
        } else {
          activedRowId = null;
        }

        return activedRowId;
      });
    };
    row.getIsActived = () => {
      const { rowActive } = table.getState();
      return isRowActived(row, rowActive);
    };

    row.getCanActive = () => {
      if (typeof table.options.enableRowActive === "function") {
        return table.options.enableRowActive(row);
      }

      return table.options.enableRowActive ?? true;
    };

    row.getToggleActivedHandler = () => {
      const canActive = row.getCanActive();

      return (e: unknown) => {
        if (!canActive) return;
        row.toggleActived(
          ((e as MouseEvent).target as HTMLInputElement)?.checked
        );
      };
    };
  },
};

export function activeRowsFn<TData extends RowData>(
  table: Table<TData>,
  rowModel: RowModel<TData>
): RowModel<TData> {
  const rowActive = table.getState().rowActive;

  const newActivedFlatRows: Row<TData>[] = [];
  const newActivedRowsById: Record<string, Row<TData>> = {};

  // Filters top level and nested rows
  const recurseRows = (rows: Row<TData>[], depth = 0): Row<TData>[] => {
    return rows
      .map((row) => {
        const isActived = isRowActived(row, rowActive);

        if (isActived) {
          newActivedFlatRows.push(row);
          newActivedRowsById[row.id] = row;
        }

        if (row.subRows?.length) {
          row = {
            ...row,
            subRows: recurseRows(row.subRows, depth + 1),
          };
        }

        if (isActived) {
          return row;
        }
      })
      .filter(Boolean) as Row<TData>[];
  };

  return {
    rows: recurseRows(rowModel.rows),
    flatRows: newActivedFlatRows,
    rowsById: newActivedRowsById,
  };
}

export function isRowActived<TData extends RowData>(
  row: Row<TData>,
  active: RowActiveState
): boolean {
  return active === row.id;
}
