import {
	forwardRef,
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
	useImperativeHandle,
	CSSProperties,
} from "react";
import type {
	AccessorKeyColumnDef,
	CellContext,
	Row,
	TableOptions,
} from "@tanstack/react-table";
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	getGroupedRowModel,
	getExpandedRowModel,
	getPaginationRowModel,
	getFilteredRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFacetedMinMaxValues,
	flattenBy,
} from "@tanstack/react-table";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";

import {
	IconChevronDown,
	IconChevronRight,
	IconDirection,
} from "@tabler/icons-react";
import { klona } from "klona/full";
import { useScrollTrigger } from "@rtdui/hooks";
import { Checkbox, isMobile, getType, filterProps } from "@rtdui/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import { getLeafColumns, getColumnDefId } from "../utils";
import { getVisibleColumns } from "./utils";
import { HeaderCell } from "./HeaderCell";
import { FooterCell } from "./FooterCell";
import { BodyCell } from "./BodyCell";
import { TablePagination } from "./TablePagination";
import { ColumnsVisibility } from "./ColumnsVisibility";
import { GroupDropArea } from "./GroupDropArea";
import { ExportTable } from "./ExportTable";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { RowActive } from "./features/RowActive";

let isMobileDevice = false;
if (typeof document !== "undefined") {
	isMobileDevice = isMobile();
}

export interface Changes {
	changes: {
		added: any[];
		changed: Record<string, Record<string, any>>;
		deleted: any[];
	};
	errors: Record<string, Record<string, string>>;
}

export type Rule = (
	value: any,
	row: Row<any>,
	data: any[],
) => string | null | undefined;

export interface DataTableProps
	extends React.ComponentPropsWithoutRef<"div">,
		Omit<TableOptions<any>, "_features" | "getCoreRowModel"> {
	className?: string;
	/** 样式槽 */
	slots?: {
		container?: string;
		toolbar?: string;
		groupDropArea?: string;
		table?: string;
	};
	/** 表行的高度
	 * @default "sm"
	 */
	size?: "xs" | "sm" | "md" | "lg";
	/**
	 * 是否显示表头行
	 * @default true
	 */
	showHeader?: boolean;
	/**
	 * 是否显示工具栏
	 * @default true
	 */
	showToolbar?: boolean;
	/**
	 * 是否显示表格和单元格的边框
	 * @default true
	 */
	showBorder?: boolean;
	/**
	 * 是否显示表格和单元格的边框大小
	 * @default 1
	 */
	borderWidth?: number;
	/**
	 * use CSS table-layout fixed
	 * @default true
	 */
	fixedLayout?: boolean;
	/**
	 * 表格滚动时列头固定在视图顶部
	 * @default true
	 */
	enableStickyHeader?: boolean;
	/**
	 * 自动创建行号列, 自动行号在初始化确定, 后续的排序过滤将不受影响.
	 * @default false
	 */
	enableAutoRowNumber?: boolean;
	/**
	 * 是否启用表格导出
	 * @default false
	 */
	enableExport?: boolean;
	/**
	 * 过滤编辑器中用户输入生效的延迟毫秒数
	 * @default 500
	 */
	debouncedWait?: number;
	/**
	 * 滚动虚拟化器
	 * @default false
	 */
	enableVirtualized?: boolean;
	/**
	 * 是否允许用户拖放调整列序
	 * @default true
	 */
	enableColumnReorder?: boolean;
	/**
	 * 启用行选择功能时, 是否启动点击行选择.
	 * @default true
	 */
	enableClickRowSelection?: boolean;
	/**
	 * 启用多行选择功能时, 全选时的范围是所有行还是当前页内的行.
	 * @default true
	 */
	selectAllForAllPages?: boolean;
	/**
	 * 是否启用分页
	 * @default false
	 */
	enablePagination?: boolean;

	/**
	 * 行点击事件处理, 只针对数据行触发, 不会对分组行等附加行触发
	 */
	onRowClick?: (
		e: React.MouseEvent<HTMLTableRowElement>,
		row: Row<any>,
	) => void;
	/**
	 * 行双击事件处理,, 只针对数据行触发, 不会对分组行等附加行触发
	 */
	onRowDoubleClick?: (
		e: React.MouseEvent<HTMLTableRowElement>,
		row: Row<any>,
	) => void;

	/**
	 * 在编辑模式下, 字段的验证规则
	 * @param row
	 * @returns
	 */
	validate?: Record<string, Rule>;
}

/** 属性扩展于TableOptions */
export const DataTable = forwardRef<any, DataTableProps>((props, ref) => {
	const {
		columns: columnsProp,
		data: dataProp,
		getRowId = (row) => row.id as string | number,
		initialState,
		state,
		onColumnFiltersChange,
		onColumnOrderChange,
		onColumnPinningChange,
		onColumnSizingChange,
		onColumnSizingInfoChange,
		onColumnVisibilityChange,
		onExpandedChange,
		onGlobalFilterChange,
		onGroupingChange,
		onPaginationChange,
		onRowPinningChange,
		onSortingChange,
		onRowSelectionChange,
		onStateChange,
		onRowActiveChange, // 自定义功能
		enableColumnReorder = true,
		groupedColumnMode = "reorder",
		enableColumnResizing = true,
		columnResizeMode = "onChange",
		enableSorting = true,
		enableMultiSort = true,
		enableSortingRemoval = true,
		sortDescFirst = false,
		getSubRows,
		enableGrouping: enableGroupingProp = false,
		enableFilters = false,
		filterFromLeafRows = false,
		enableHiding = true,
		enablePagination = false,
		enableRowSelection = true,
		enableMultiRowSelection = false,
		enableSubRowSelection = false,
		enableClickRowSelection = true,
		selectAllForAllPages = true,
		enableStickyHeader = true,
		enableAutoRowNumber = false,
		enableExport = false,
		debouncedWait = 500,
		enableVirtualized = false,
		className,
		slots,
		size = "sm",
		showHeader = true,
		showToolbar = true,
		showBorder = true,
		borderWidth: borderWidthProp = 1,
		fixedLayout = true,
		onRowClick,
		onRowDoubleClick,
		validate,
		...other
	} = props;

	const borderWidth = showBorder ? borderWidthProp : 0;

	const enableTree = !!getSubRows;
	const enableGrouping = enableTree ? false : enableGroupingProp;

	const [data, setData] = useState(dataProp);

	useEffect(() => {
		setData(dataProp);
	}, [dataProp]);

	if (enableGrouping && enableTree) {
		throw new Error("数据分组和树形表格不能同时启用");
	}

	if (enableExport && enableVirtualized) {
		throw new Error("行虚拟化和导出不能同时启用");
	}

	const changesRef = useRef<Changes>({
		changes: { added: [], changed: {}, deleted: [] },
		errors: {},
	});

	const setErrorRow = (params: {
		rowId: string | number;
		field: string;
		errorMsg: string;
	}) => {
		const { rowId, field, errorMsg } = params;
		if (!errorMsg) {
			delete changesRef.current.errors[rowId]?.[field];
			if (Object.keys(changesRef.current.errors[rowId] ?? {}).length === 0) {
				delete changesRef.current.errors[rowId];
			}
			return;
		}
		changesRef.current.errors[rowId] = {
			...changesRef.current.errors[rowId],
			[field]: errorMsg,
		};
		// setData((prev) => [...prev]);
	};

	const addRow = (newRow: any) => {
		Object.keys(newRow).forEach((d) => {
			const validateRule = validate?.[d];
			const validateError = validateRule?.(newRow[d], newRow, data);
			if (validateError) {
				setErrorRow({
					rowId: getRowId(newRow),
					field: d,
					errorMsg: validateError,
				});
			}
		});
		changesRef.current.changes.added.push(newRow);
		setData((prev) => [...prev, newRow]);
	};
	const changeRow = (
		params: CellContext<any, any> & {
			value: any;
		},
	) => {
		const { row, column, value } = params;
		const rowId = getRowId(row);
		const field = (column.columnDef as AccessorKeyColumnDef<any, any>)
			.accessorKey as string;
		const fieldDataType = getType(row.original[field]);
		if (
			row.original[field] !==
			(fieldDataType === "Number" ? Number(value) : value)
		) {
			const validateRule = validate?.[field];
			const validateError = validateRule?.(value, row.original, data);
			if (!validateError) {
				setErrorRow({
					rowId: row.id,
					field: field,
					errorMsg: "",
				});
				// 如果修改的值在新增集中则直接更新新增行的字段值
				const addedRow = changesRef.current.changes.added.find(
					(d) => getRowId(d) === rowId,
				);
				if (addedRow) {
					addedRow[field] = fieldDataType === "Number" ? Number(value) : value;
				} else {
					// 如果不在新增集中则加入到修改集对应id键的字段中.
					changesRef.current.changes.changed[rowId] = {
						...changesRef.current.changes.changed[rowId],
						[field]: fieldDataType === "Number" ? Number(value) : value,
					};
				}
			} else {
				setErrorRow({
					rowId: row.id,
					field: field,
					errorMsg: validateError,
				});
			}
			setData((prev) =>
				prev.map((row) => {
					if (getRowId(row) === rowId) {
						// changesRef.current.changes.changed[rowId] = {
						//   ...changesRef.current.changes.changed[rowId],
						//   [field]: fieldDataType === "Number" ? Number(value) : value,
						// };
						return {
							...row,
							[field]: fieldDataType === "Number" ? Number(value) : value,
						};
					}
					return row;
				}),
			);
		}
	};
	const deleteRow = () => {
		const { rowSelection } = table.getState();
		const selectedRowId = Object.keys(rowSelection).filter(
			(d) => rowSelection[d] === true,
		);
		selectedRowId.forEach((d) => {
			// 如果删除的行在新增集中则直接删除新增集中的行
			const addedRowIndex = changesRef.current.changes.added.findIndex(
				(d2) => String(getRowId(d2)) === d,
			);
			if (addedRowIndex >= 0) {
				changesRef.current.changes.added.splice(addedRowIndex, 1);
			} else {
				// 如果不在新增集中则加入到删除集.
				changesRef.current.changes.deleted.push(d);
			}
		});
		table.resetRowSelection(true);
		setData((prev) =>
			prev.filter((d) => !selectedRowId.includes(String(getRowId(d)))),
		);
	};
	const getChanges = () => {
		if (Object.keys(changesRef.current.errors).length) {
			throw new Error("数据表格中存在错误无法保存");
		}
		return changesRef.current.changes;
	};

	const getSelectedRowIds = (): any[] => {
		const { rowSelection } = table.getState();
		return Object.keys(rowSelection).filter((d) => rowSelection[d] === true);
	};

	const getSelectedRows = (): any[] => {
		return table.getSelectedRowModel().flatRows.map((d) => d.original);
	};

	const getState = () => {
		return table.getState();
	};

	useImperativeHandle(
		ref,
		() => ({
			addRow,
			changeRow,
			deleteRow,
			getChanges,
			getSelectedRowIds,
			getSelectedRows,
			getState,
		}),
		[],
	);

	// 微调列定义
	const columns = useMemo(() => {
		const cloneColumns = klona(columnsProp);

		if (enableTree) {
			// 用户列中第一个定义了meta.expandable为true的列为tree的可展开列
			const expandColumnDef = flattenBy(
				cloneColumns,
				(item: any) => item.columns,
			).find((d) => d.meta?.expandable);

			if (!expandColumnDef) {
				throw new Error(
					"启用树形表格时必须提供至少一个定义了meta.expandable为true的column",
				);
			}
			expandColumnDef.enableHiding = false;

			const oldHeaderDef = expandColumnDef.header;
			expandColumnDef.size ??= 140;
			expandColumnDef.minSize ??= 140;
			expandColumnDef.header = (cx) => {
				const { column, table } = cx;
				return (
					<>
						{enableRowSelection && !enableClickRowSelection && (
							<IndeterminateCheckbox
								className="absolute left-0.5 checkbox-sm"
								checked={
									selectAllForAllPages
										? table.getIsAllRowsSelected()
										: table.getIsAllPageRowsSelected()
								}
								indeterminate={
									selectAllForAllPages
										? table.getIsSomeRowsSelected()
										: table.getIsSomePageRowsSelected()
								}
								onChange={
									selectAllForAllPages
										? table.getToggleAllRowsSelectedHandler()
										: table.getToggleAllPageRowsSelectedHandler()
								}
							/>
						)}
						<button
							type="button"
							className="btn btn-ghost btn-circle btn-xs absolute left-5"
							title="展开/收缩所有行"
							onClick={(ev: React.MouseEvent) => {
								ev.stopPropagation();
								table.toggleAllRowsExpanded();
							}}
						>
							<IconDirection />
						</button>

						{typeof oldHeaderDef === "function"
							? oldHeaderDef(cx)
							: oldHeaderDef}
					</>
				);
			};
			const oldCellDef = expandColumnDef.cell;
			expandColumnDef.cell = (cx: CellContext<any, any>) => {
				const { row, column, table } = cx;

				return (
					<div
						style={{
							paddingLeft: `${row.depth * 2}em`,
						}}
						className="flex items-center gap-1"
					>
						{enableRowSelection && !enableClickRowSelection && (
							<Checkbox
								size="xs"
								checked={row.getIsSelected()}
								disabled={!row.getCanSelect()}
								// indeterminate={row.getIsSomeSelected()}
								onChange={row.getToggleSelectedHandler()}
								onClick={(ev) => ev.stopPropagation()}
								slots={{
									input: "rounded",
								}}
							/>
						)}
						{cx.row.getCanExpand() ? (
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									row.getToggleExpandedHandler()();
								}}
								className="btn btn-ghost btn-circle btn-xs"
							>
								{row.getIsExpanded() ? (
									<IconChevronDown size={16} />
								) : (
									<IconChevronRight size={16} />
								)}
							</button>
						) : (
							"\u00A0"
						)}
						{typeof oldCellDef === "function"
							? oldCellDef(cx)
							: oldCellDef === undefined
								? cx.getValue()
								: oldCellDef}
					</div>
				);
			};
		} else if (enableRowSelection && !enableClickRowSelection) {
			cloneColumns.unshift({
				id: "选择",
				size: 50,
				minSize: 50,
				enableHiding: false,
				header: ({ table }) => (
					<IndeterminateCheckbox
						className="checkbox-sm"
						disabled={!enableMultiRowSelection}
						checked={
							selectAllForAllPages
								? table.getIsAllRowsSelected()
								: table.getIsAllPageRowsSelected()
						}
						indeterminate={
							selectAllForAllPages
								? table.getIsSomeRowsSelected()
								: table.getIsSomePageRowsSelected()
						}
						onChange={
							selectAllForAllPages
								? table.getToggleAllRowsSelectedHandler()
								: table.getToggleAllPageRowsSelectedHandler()
						}
					/>
				),
				cell: ({ row }) => (
					<div className="flex justify-center">
						<IndeterminateCheckbox
							className="rounded"
							checked={row.getIsSelected()}
							disabled={!row.getCanSelect()}
							indeterminate={row.getIsSomeSelected()}
							onChange={row.getToggleSelectedHandler()}
							onClick={(ev) => ev.stopPropagation()}
						/>
					</div>
				),
			});
		}

		if (enableAutoRowNumber) {
			cloneColumns.unshift({
				id: "行号",
				size: 60,
				minSize: 60,
				header: "行号",
				cell: (cx) => (
					<span style={{ paddingLeft: `${cx.row.depth * 1}em` }}>
						{cx.row.index + 1}
					</span>
				),
			});
		}

		return cloneColumns;
	}, [
		columnsProp,
		enableTree,
		enableRowSelection,
		selectAllForAllPages,
		enableClickRowSelection,
		enableAutoRowNumber,
		enableMultiRowSelection,
	]);

	const tableOptions: TableOptions<any> = {
		_features: [RowActive], // 行激活的自定义功能
		columns,
		data,
		getRowId,
		initialState, //初始状态
		state, //实时状态
		onStateChange,
		autoResetAll: false, // 覆盖所有功能提供`autoReset*`的选项, `autoReset*`表示当表格状态改变时自动重置功能的状态. 如:autoResetExpanded,autoResetPageIndex
		// 默认列定义, 会和columns中每个列定义进行合并,为列定义提供缺省属性
		defaultColumn: {
			size: 140,
			minSize: 80,
			maxSize: Number.MAX_SAFE_INTEGER,
			cell: (cx) => {
				const value = cx.getValue() as any;
				const valueType = getType(value);
				const align = cx.column.columnDef.meta?.align;
				return (
					<div
						className={clsx("overflow-hidden whitespace-nowrap text-ellipsis", {
							"text-right": valueType === "Number" || align === "right",
							"text-center": valueType === "Boolean" || align === "center",
						})}
					>
						{cx.renderValue<any>()?.toString() ?? ""}
					</div>
				);
			},
			aggregatedCell: "", // 覆盖默认行为, 使分组行中不显示列的聚合值, 除非手动指定.
		},
		// 列隐藏/显示功能
		enableHiding,
		// 设置列宽调整选项
		enableColumnResizing,
		columnResizeMode,
		// 行选择
		enableRowSelection,
		enableMultiRowSelection,
		enableSubRowSelection,
		// 核心行模型, 这是必须的
		getCoreRowModel: getCoreRowModel(),
		getSubRows: enableTree ? getSubRows : undefined, // 注意, 启用数据分组时不能设置该属性, 否则会有冲突.
		// 数据过滤功能
		enableFilters,
		// filterFromLeafRows: enableTree || enableGrouping ? true : false,
		filterFromLeafRows,
		getFilteredRowModel: enableFilters ? getFilteredRowModel() : undefined,
		getFacetedRowModel: enableFilters ? getFacetedRowModel() : undefined,
		getFacetedUniqueValues: enableFilters
			? getFacetedUniqueValues()
			: undefined,
		getFacetedMinMaxValues: enableFilters
			? getFacetedMinMaxValues()
			: undefined,
		// 数据分组功能
		enableGrouping,
		groupedColumnMode,
		getGroupedRowModel: enableGrouping ? getGroupedRowModel() : undefined,
		// 数据排序功能
		enableSorting,
		enableSortingRemoval,
		enableMultiSort,
		sortDescFirst,
		getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
		// 展开功能, 树行表格和数据分组功能依赖该功能.
		enableExpanding: enableTree || enableGrouping,
		getExpandedRowModel:
			enableTree || enableGrouping ? getExpandedRowModel() : undefined,
		// 数据分页功能
		getPaginationRowModel: enablePagination
			? getPaginationRowModel()
			: undefined,
		// 受控状态处理
		onColumnFiltersChange,
		onColumnOrderChange,
		onColumnPinningChange,
		onColumnSizingChange,
		onColumnSizingInfoChange,
		onColumnVisibilityChange,
		onExpandedChange,
		onGlobalFilterChange,
		onGroupingChange,
		onPaginationChange,
		onRowPinningChange,
		onSortingChange,
		onRowSelectionChange,
		onRowActiveChange, // 自定义功能
		// 用于列定义中访问表的自定义元数据
		meta: {
			addRow,
			changeRow,
			deleteRow,
			getChanges,
			getSelectedRowIds,
		},
	};
	// `@tanstack/react-table` 所有功能默认都是启用的, 除非手动禁用
	// `@tanstack/react-table` 的rowModel的处理顺序: CoreRowModel=>FilteredRowModel=>GroupedRowModel=>SortedRowModel=>ExpandedRowModel=>PaginationRowModel
	// 必须清除tableOptions中的undefined的键, 否则useReactTable会有异常情况发生.
	const table = useReactTable(filterProps(tableOptions));

	const getLeftPinning = () => {
		const result: string[] = [];
		result.push(...table.getState().grouping);
		if (enableAutoRowNumber) {
			result.push("行号");
		}
		if (enableTree) {
			result.push(
				flattenBy(columnsProp, (item: any) => item.columns).find((d) => d.id)!
					.id!,
			);
		} else if (!enableTree && enableRowSelection && !enableClickRowSelection) {
			result.push("选择");
		}
		// 分组列必须在其它固定列之后. 因为在有列头组的情况下数据分组的列头的列头组的getPinnedIndex()为-1, 从而导致getPinnedSize()方法计算时无法得知其位置.
		// result.push(...table.getState().grouping);
		return result;
	};

	// table实例的选项中加入预设
	table.setOptions((prev) => {
		const prevState = prev.state;
		if (!prevState.columnOrder?.length) {
			prevState.columnOrder = getLeafColumns(columnsProp).map(
				(d) => getColumnDefId(d) as string,
			);
		}
		prevState.columnPinning!.left = getLeftPinning();
		return prev;
	});

	const tableContainerRef = useRef<HTMLDivElement>(null);
	const tableRef = useRef<HTMLTableElement>(null);
	//#region 行虚拟化
	const estimateRowHeight = useCallback(
		() => (size === "sm" ? 36 : 56),
		[size],
	);
	const { rows } = table.getRowModel();
	const rowVirtualizer = useVirtualizer({
		getScrollElement: () =>
			enableVirtualized ? tableContainerRef.current : null,
		count: rows.length,
		estimateSize: estimateRowHeight,
		overscan: 10,
	});
	const { getVirtualItems, getTotalSize } = rowVirtualizer;
	const virtualRows = getVirtualItems();
	const totalSize = getTotalSize();
	const paddingTop = virtualRows.length > 0 ? virtualRows[0].start || 0 : 0; // 为了保持原始滚动条的尺寸
	const paddingBottom =
		virtualRows.length > 0
			? totalSize - (virtualRows[virtualRows.length - 1].end || 0)
			: 0; // 为了保持原始滚动条的尺寸
	//#endregion 行虚拟化

	// 是否发生了水平滚动, 固定列时可以运用效果
	const scrollingTrigger = useScrollTrigger({
		target: tableContainerRef.current,
		direction: "horizontal",
		disabled: table.getState().columnPinning.left?.length === 0,
	});

	const handleRowClick = (
		e: React.MouseEvent<HTMLTableRowElement>,
		row: Row<any>,
	) => {
		onRowClick?.(e, row);
		if (
			(enableRowSelection === true ||
				(typeof enableRowSelection === "function" &&
					enableRowSelection(row))) &&
			enableClickRowSelection &&
			!row.getIsGrouped()
		) {
			row.getToggleSelectedHandler()(e);
		}
		row.getToggleActivedHandler()(e);
	};

	const handleRowDoubleClick = (
		e: React.MouseEvent<HTMLTableRowElement>,
		row: Row<any>,
	) => {
		onRowDoubleClick?.(e, row);
		row.getToggleActivedHandler()(e);
	};

	return (
		<DndProvider
			backend={isMobileDevice ? TouchBackend : HTML5Backend}
			// 防止同一页面放置多个报错问题
			context={typeof document !== "undefined" ? window : undefined}
			options={{
				delayTouchStart: 200,
				ignoreContextMenu: true,
			}}
		>
			<div
				className={clsx("data-table-root h-full flex flex-col", className)}
				{...other}
			>
				{showToolbar && (
					<div
						className={clsx(
							"data-table-toolbar navbar flex items-center bg-base-300 relative z-10 py-0 min-h-0",
							slots?.toolbar,
						)}
					>
						<div className="flex-1">
							<GroupDropArea
								table={table}
								enableGrouping={enableGrouping ?? false}
								className={clsx(slots?.groupDropArea)}
							/>
						</div>
						{enableExport && <ExportTable table={table} tableRef={tableRef} />}
						{enableHiding && <ColumnsVisibility table={table} />}
					</div>
				)}
				<div
					ref={tableContainerRef}
					className={clsx(
						"data-table-container flex-1 overflow-auto relative z-0",
						slots?.container,
					)}
					style={
						{
							"--borderWidth": `${borderWidth}px`,
						} as CSSProperties
					}
				>
					<table
						ref={tableRef}
						className={clsx(
							"data-table table rounded-none", // 移除daisyUI中table的默认圆角
							{
								"table-fixed": fixedLayout,
								"table-pin-rows": enableStickyHeader,
								"no-border": !showBorder,
								"table-xs": size === "xs",
								"table-sm": size === "sm",
								"table-md": size === "md",
								"table-lg": size === "lg",
							},
							slots?.table,
						)}
						style={{
							width: fixedLayout ? table.getTotalSize() : undefined,
						}}
					>
						{/* 用于table-layout:fixed时,多行列头宽度失效的问题 */}
						<colgroup>
							{getVisibleColumns(table).map((column) =>
								column.getIsVisible() ? (
									<col
										key={column.id}
										style={{
											width: column.getSize(),
										}}
									/>
								) : null,
							)}
						</colgroup>
						<thead
							// 为了使thead中的固定表头行在滚动时不会被tbody中的行盖住
							className={enableStickyHeader ? "relative z-10" : undefined}
						>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<HeaderCell
											key={header.id}
											header={header}
											table={table}
											enableColumnReorder={enableColumnReorder}
											enableColumnResizing={enableColumnResizing}
											showHeader={showHeader}
											debouncedWait={debouncedWait}
											scrollingTrigger={scrollingTrigger}
										/>
									))}
								</tr>
							))}
						</thead>
						<tbody
							// 创建一个新的层叠上下文
							className="relative z-0"
						>
							{table.getRowModel().rows.length === 0 && (
								<tr>
									<td
										colSpan={table.getVisibleLeafColumns().length}
										className="text-center"
									>
										无数据
									</td>
								</tr>
							)}
							{enableVirtualized ? (
								<>
									{paddingTop > 0 && (
										<tr>
											<td style={{ height: `${paddingTop}px` }} />
										</tr>
									)}
									{virtualRows.map((virtualRow) => {
										const row = table.getRowModel().rows[virtualRow.index];
										return (
											<tr
												key={row.id}
												onClick={(e) => handleRowClick(e, row)}
												onDoubleClick={(e) => handleRowDoubleClick(e, row)}
												className={clsx({
													selected: row.getIsSelected(),
													actived: row.getIsActived(),
												})}
											>
												{row.getVisibleCells().map((cell) => (
													<BodyCell
														key={cell.id}
														cell={cell}
														enableGrouping={enableGrouping}
														scrollingTrigger={scrollingTrigger}
														changesRef={changesRef}
													/>
												))}
											</tr>
										);
									})}
									{paddingBottom > 0 && (
										<tr>
											<td style={{ height: `${paddingBottom}px` }} />
										</tr>
									)}
								</>
							) : (
								table.getRowModel().rows.map((row) => (
									<tr
										key={row.id}
										onClick={(e) => handleRowClick(e, row)}
										onDoubleClick={(e) => handleRowDoubleClick(e, row)}
										className={clsx({
											selected: row.getIsSelected(),
											actived: row.getIsActived(),
										})}
									>
										{row.getVisibleCells().map((cell) => (
											<BodyCell
												key={cell.id}
												cell={cell}
												enableGrouping={enableGrouping}
												scrollingTrigger={scrollingTrigger}
												changesRef={changesRef}
											/>
										))}
									</tr>
								))
							)}
						</tbody>
						{table
							.getFooterGroups()[0]
							.headers.some((d) => d.column.columnDef.footer) && (
							<tfoot className="relative z-10">
								{table
									.getFooterGroups()
									.slice(0, 1)
									.map((footerGroup) => (
										<tr key={footerGroup.id}>
											{footerGroup.headers.map((header) => (
												<FooterCell
													key={header.id}
													header={header}
													table={table}
													scrollingTrigger={scrollingTrigger}
												/>
											))}
										</tr>
									))}
							</tfoot>
						)}
					</table>
				</div>
				{enablePagination && <TablePagination table={table} />}
			</div>
		</DndProvider>
	);
});

// export default React.memo(DataTable);

DataTable.displayName = "@rtdui/DataTable";
