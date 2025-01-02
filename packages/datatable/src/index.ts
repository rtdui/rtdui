export * from "./DataTable";
export * from "./DataTableSelect";

export * from "./utils/getSelectedRows";
export * from "./utils/getColumnDefId";
export * from "./utils/getAllFlatColumns";

export type * from "@tanstack/table-core";

import type { CellContext, RowData } from "@tanstack/table-core";
import type {
	RowActiveInstance,
	RowActiveOptions,
	RowActiveRow,
	RowActiveTableState,
} from "./DataTable/features/RowActive";

export type { RowActiveState } from "./DataTable/features/RowActive";

declare module "@tanstack/table-core" {
	//merge our new feature's state with the existing table state
	interface TableState extends RowActiveTableState {}
	//merge our new feature's state with the existing table state
	interface InitialTableState extends Partial<RowActiveTableState> {}
	//merge our new feature's options with the existing table options
	interface TableOptionsResolved<TData extends RowData>
		extends RowActiveOptions<TData> {}
	//merge our new feature's instance APIs with the existing table instance APIs
	interface Table<TData extends RowData> extends RowActiveInstance<TData> {}
	// if you need to add row instance APIs...
	interface Row<TData extends RowData> extends RowActiveRow {
		/**
     行的id值, 它是`options.getRowId`选项的解析结果, 与getRowId的扩展后的返回类型保持一致
     */
		id: string | number;
	}

	interface TableOptions<TData extends RowData> {
		/**
		 * 定义获取行id的函数
		 * 原生的getRowId的返回类型为string但实现中却可以返回任意值类型, 这导致一些困惑
		 * 扩展它的返回类型允许为string或number, 因为后台返回的数据行的id类型通常为string或number
		 * @default (row)=>row.id
		 */
		getRowId?: (
			originalRow: TData,
			index?: number, // 重新定义index为可选的
			parent?: Row<TData>,
		) => string | number;
		/**
		 * 定义获取行的孩子行集的函数
		 * 一旦定义,则会以树形显示
		 */
		getSubRows?: (
			originalRow: TData,
			index?: number, // 重新定义index为可选的
		) => undefined | TData[];
	}

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
			},
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
