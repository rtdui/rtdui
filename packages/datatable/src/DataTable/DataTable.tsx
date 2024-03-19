/* eslint-disable @typescript-eslint/no-use-before-define */
import type {
  AccessorKeyColumnDef,
  CellContext,
  ColumnDef,
  ColumnOrderTableState,
  ColumnPinningTableState,
  ColumnSizingTableState,
  ExpandedTableState,
  FiltersTableState,
  GroupingTableState,
  OnChangeFn,
  PaginationTableState,
  Row,
  RowSelectionState,
  RowSelectionTableState,
  SortingTableState,
  TableOptions,
  TableState,
  Updater,
  VisibilityTableState,
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
import React from "react";
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

let isMobileDevice = false;
if (typeof document !== "undefined") {
  isMobileDevice = isMobile();
}

export interface DataTableProps {
  className?: string;
  /** 样式槽 */
  slots?: {
    container: string;
    toolbar: string;
    groupDropArea: string;
    table: string;
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
   * 当table可展开时是否自动展开所有
   * @default false
   */
  autoExpandAll?: boolean;
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

  //#region TableOptions的原生选项说明

  //#region 核心选项
  /**
   * 列定义对象数组
   *
   * 自动生成列id规则: 最优先使用id键,如果没有指定则以accessorKey作为列id, 如果accessorKey没有指定并且header是字符串时, 则使用header的字符串值作为列id, 都不符合时报错
   *
   * 列id在许多地方会用到, 包括作为组名, 显示/隐藏列的列名等. 因此对于中文列名, 必须手动设定列id, 并且用中文作为id值.
   */
  columns: ColumnDef<any, any>[];

  /**
   * 数据行对象数组
   *
   * 注意: 如果需要树形展示, data必须是层次结构的.不支持id-parentId形式的平面数据.
   * 可以使用@rtdui/core包中的工具函数`flatToTree()`先将id-parentId形式的平面数据转化为层次结构的数据. 然后再赋值给data属性
   */
  data: any[];

  /**
   * 定义如何获得行id
   * @default (row) => row.id
   */
  getRowId?: (row: any) => any;

  /**
   * 获取每行孩子的方法,如果定义该函数则启用可展示/收缩的树形展示, 列定义中第一个定义了id属性的列为可展开列
   * 注意: 当启用数据分组时不能设置该属性, 否则会有冲突.
   */
  getSubRows?: (row: any) => any[];

  /**
   * 数据表的初始状态, 这个属性是非受控的. 数据表组件挂载后更新该属性不会导致数据表状态改变.
   * 注意: 该属性和state属性不是互斥的. 最终会合并到table.options.state属性中
   */
  initialState?: Partial<
    VisibilityTableState &
      ColumnOrderTableState &
      ColumnPinningTableState &
      FiltersTableState &
      SortingTableState &
      ExpandedTableState &
      GroupingTableState &
      ColumnSizingTableState &
      PaginationTableState &
      RowSelectionTableState
  >;

  /**
   * 数据表的状态, 这个属性是受控属性. 必须通过onStateChange事件更新
   */
  state?: Partial<
    VisibilityTableState &
      ColumnOrderTableState &
      ColumnPinningTableState &
      FiltersTableState &
      SortingTableState &
      ExpandedTableState &
      GroupingTableState &
      ColumnSizingTableState &
      PaginationTableState &
      RowSelectionTableState
  >;

  /**
   * 当数据表的状态改变时的事件, 如果提供则会覆盖内部默认的状态管理, 你需要将你的状态传回给state属性
   */
  onStateChange?: (updater: Updater<TableState>) => void;
  //#endregion 核心选项

  //#region 功能: Column Ordering
  /**
   * 列序改变时触发, 注意定义了该属性后列序的调整不会触发onStateChange事件
   */
  // onColumnOrderChange?: OnChangeFn<ColumnOrderState>;
  //#endregion 功能: Column Ordering

  //#region 功能: Column Pinning
  /**
   * 是否启用冻结功能
   * @default true
   */
  enablePinning?: boolean;
  /**
   * 列固定改变时触发, 注意定义了该属性后列序的调整不会触发onStateChange事件
   */
  // onColumnPinningChange?: OnChangeFn<ColumnPinningState>;
  //#endregion 功能: Column Pinning

  //#region 功能: Column Sizing
  /**
   * 是否启用调整列宽
   * @default true
   */
  enableColumnResizing?: boolean;
  /**
   * 调整列宽时状态在何时生效, 'onEnd'表示在释放拖动时生效, 'onChange'表示在拖动过程中生效
   * @default "onChange"
   */
  columnResizeMode?: "onChange" | "onEnd";
  /**
   * 列宽改变时触发, 注意定义了该属性后列序的调整不会触发onStateChange事件
   */
  // onColumnSizingChange?: OnChangeFn<ColumnSizingState>
  //#endregion Column Sizing

  //#region 功能: Column Visibility
  /**
   * 是否启用列隐藏
   * @default true
   */
  enableHiding?: boolean;
  // /**
  //  * 列可见性改变时触发, 注意定义了该属性后列序的调整不会触发onStateChange事件
  //  */
  // onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  //#endregion 功能: Column Visibility

  //#region 功能: Filters
  /**
   * 是否启用过滤功能
   * @default false
   */
  enableFilters?: boolean;
  /**
   * 自定义过滤函数
   */
  // filterFns?: Record<string, FilterFn>;
  /**
   * 过滤启用时,并且启用了数据分组或树型表时, 决定过滤的顺序, false表示从父到子, 意味着父行不包括,所有子孙行必定也不包括. true表示从子到父, 意味着只要子孙行包括在内，必定会包括父行.
   * 注意: 如果该选项为true, 过滤后唯一值列表只会是空, 这导致了无法再进行选择列表进行过滤.
   * @default false
   */
  filterFromLeafRows?: boolean;
  /**
   * 是否启用列头过滤功能, 列的过滤函数由列定义中的filterFn字段指定
   * @default true
   */
  enableColumnFilters?: boolean;
  // /**
  //  * 列过滤改变时触发, 注意定义了该属性后列序的调整不会触发onStateChange事件
  //  */
  // onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  /**
   * 是否启用全局过滤功能,
   * @default true
   */
  enableGlobalFilter?: boolean;
  /**
   * 全局过滤改变时触发, 注意定义了该属性后列序的调整不会触发onStateChange事件
   */
  // onGlobalFilterChange?: OnChangeFn<GlobalFilterState>;
  // /**
  //  * 全局过滤使用的过滤函数
  //  */
  // globalFilterFn?: FilterFn | keyof FilterFns | keyof BuiltInFilterFns;

  //#endregion 功能: Filters

  //#region 功能: Sorting
  /**
   * 是否启用列排序功能, 支持Shift键多列排序
   * @default true
   */
  enableSorting?: boolean;
  /**
   * 排序改变时触发, 注意定义了该属性后列序的调整不会触发onStateChange事件
   */
  // onSortingChange?: OnChangeFn<SortingState>;
  /**
   * 排序是否可以清除.
   * 当true时的排序循环: 'none' -> 'desc' -> 'asc' -> 'none' -> ..., 当false时的排序循环: 'none' -> 'desc' -> 'asc' -> 'desc' -> 'asc' -> ...
   * @default true
   */
  enableSortingRemoval?: boolean;
  /**
   * 是否启用多列排序
   * @default true
   */
  enableMultiSort?: boolean;
  /**
   * 首次排序是否降序, false 表示首次按升序排序. true表示首次按降序排序
   * @default false
   */
  sortDescFirst?: boolean;
  /**
   * 自定义排序函数
   */
  // sortingFns?: Record<string, SortingFn>;
  //#endregion 功能: Sorting

  //#region 功能: Grouping
  /**
   * 是否启用数据分组功能, 支持多列分组.
   * 注意: 不能和树型表格同时启用
   * @default true
   */
  enableGrouping?: boolean;
  /**
   * 分组改变时触发, 注意定义了该属性后列序的调整不会触发onStateChange事件
   */
  // onGroupingChange?: OnChangeFn<GroupingState>;
  /**
   * 被分组的列的处理模式, 'reorder'表示放到首列并固定, false与'reorder'一致. 'remove'移除被分组的列
   * @default "reorder"
   */
  groupedColumnMode?: false | "reorder" | "remove";
  //#endregion 功能: Grouping

  //#region 功能: Expanding
  /**
   * 是否启用展开功能, 树形和数据分组依赖该功能.
   * 只要 enableTree或者enableGrouping启用时为true
   */
  enableExpanding?: boolean;
  /**
   * 展开改变时触发, 注意定义了该属性后列序的调整不会触发onStateChange事件
   */
  // onExpandedChange?: OnChangeFn<ExpandedState>;
  /**
   * 是否对展开的行进行分页
   * @default false
   */
  paginateExpandedRows?: boolean;
  //#endregion 功能: Expanding

  //#region 功能: Pagination
  /**
   * 是否手动分页, false表示启用分页, 至于分页数据则由getPaginationRowModel提供, 也就是说不提供getPaginationRowModel属性也即不采取分页.
   * @default false
   */
  manualPagination?: boolean;
  /**
   * 分页时每页数量
   */
  pageCount?: number;
  /**
   * 页改变时触发, 注意定义了该属性后列序的调整不会触发onStateChange事件
   */
  // onPaginationChange?: OnChangeFn<PaginationState>;
  /**
   * 得到分页的行模型方法, 可以从import {getPaginationRowModel} from "@tanstack/react-table";导入内置方法.
   */
  // getPaginationRowModel?: (table: Table<TData>) => () => RowModel<TData>;
  //#endregion 功能: Pagination

  //#region 功能: Row Selection
  /**
   * 是否允许用户选择行, 可以传入自定义函数决定哪些行可以被选择
   * @default true
   */
  enableRowSelection?: boolean | ((row: Row<any>) => boolean);
  /**
   * 是否允许用户多选行, 可以传入函数自定义决定哪些行可以被多选
   * @default false
   */
  enableMultiRowSelection?: boolean | ((row: Row<any>) => boolean);
  /**
   * 多行选择启用时, 在树型表或数据分组时, 当父行选中时, 是否自动选中所有子行. 可以传入函数自定义决定哪些子行被选中
   * @default false
   */
  enableSubRowSelection?: boolean | ((row: Row<any>) => boolean);
  /**
   * 行选择改变时触发, 注意定义了该属性后会覆盖内部默认的状态管理, 需要将你的行选择状态传回给state属性.
   */
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  //#endregion 功能: Row Selection
}

export const DataTable = React.forwardRef<any, DataTableProps>((props, ref) => {
  const {
    columns: columnsProp,
    data: dataProp,
    getRowId = (row: any) => row.id,
    initialState,
    state,
    onStateChange,
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
    onRowSelectionChange,
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
    autoExpandAll = false,
  } = props;

  const enableTree = !!getSubRows;
  const enableGrouping = enableTree ? false : enableGroupingProp;

  const [data, setData] = React.useState(dataProp);

  React.useEffect(() => {
    setData(dataProp);
  }, [dataProp]);

  if (enableGrouping && enableTree) {
    throw new Error("数据分组和树形表格不能同时启用");
  }

  if (enableExport && enableVirtualized) {
    throw new Error("行虚拟化和导出不能同时启用");
  }

  const changesRef = React.useRef({
    changes: { added: [], changed: {}, deleted: [] } as {
      added: any[];
      changed: Record<string, any>;
      deleted: any[];
    },
    errors: {} as Record<string, any>,
  });

  const setErrorRow = (params: {
    rowId: string;
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
    changesRef.current.changes.added.push(newRow);
    setData((prev) => [...prev, newRow]);
  };
  const changeRow = (
    params: CellContext<any, any> & {
      value: any;
      validate?: (cx: CellContext<any, any> & { value: any }) => string;
    }
  ) => {
    const { row, column, value, validate } = params;
    const rowId = getRowId(row);
    const field = (column.columnDef as AccessorKeyColumnDef<any, any>)
      .accessorKey;
    const fieldDataType = getType(row.original[field]);
    if (
      row.original[field] !==
      (fieldDataType === "Number" ? Number(value) : value)
    ) {
      const validateResult = validate?.(params) ?? "";
      if (validateResult === "") {
        // 清除错误
        setErrorRow({
          rowId: row.id,
          field: field as string,
          errorMsg: "",
        });
        // 如果修改的值在新增集中则直接更新新增行的字段值
        const addedRow = changesRef.current.changes.added.find(
          (d) => getRowId(d) === rowId
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
          field: field as string,
          errorMsg: validateResult,
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
        })
      );
    }
  };
  const deleteRow = () => {
    const { rowSelection } = table.getState();
    const selectedRowId = Object.keys(rowSelection).filter(
      (d) => rowSelection[d] === true
    );
    selectedRowId.forEach((d) => {
      // 如果删除的行在新增集中则直接删除新增集中的行
      const addedRowIndex = changesRef.current.changes.added.findIndex(
        (d) => getRowId(d) === d
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
      prev.filter((d) => !selectedRowId.includes(String(getRowId(d))))
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

  React.useImperativeHandle(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // 微调列定义
  const columns = React.useMemo(() => {
    const cloneColumns = klona(columnsProp);

    if (enableTree) {
      // 用户列中第一个定义了meta.expandable为true的列为tree的可展开列
      const expandColumnDef = flattenBy(
        cloneColumns,
        (item: any) => item.columns
      ).find((d) => d.meta?.expandable);

      if (!expandColumnDef) {
        throw new Error(
          "启用树形表格时必须提供至少一个定义了meta.expandable为true的column"
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
                className="absolute left-0.5"
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
                size="sm"
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                // indeterminate={row.getIsSomeSelected()}
                onChange={row.getToggleSelectedHandler()}
                onClick={(ev) => ev.stopPropagation()}
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
    onRowSelectionChange,
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
          .id!
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
        (d) => getColumnDefId(d) as string
      );
    }
    prevState.columnPinning!.left = getLeftPinning();
    return prev;
  });

  React.useEffect(() => {
    // 自动展开所有
    if (autoExpandAll) {
      table.toggleAllRowsExpanded(true);
    }
  }, [autoExpandAll, table]);

  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  //#region 行虚拟化
  const estimateRowHeight = React.useCallback(
    () => (size === "sm" ? 36 : 56),
    [size]
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
      <div className={clsx("data-table-root h-full flex flex-col", className)}>
        {showToolbar && (
          <div
            className={clsx(
              "data-table-toolbar navbar flex items-center bg-base-300 relative z-10 py-0 min-h-0",
              slots?.toolbar
            )}
          >
            <div className="flex-1">
              <GroupDropArea
                table={table}
                enableGrouping={enableGrouping ?? false}
                className={clsx(slots?.groupDropArea)}
              />
            </div>
            {enableExport && <ExportTable table={table} />}
            {enableHiding && <ColumnsVisibility table={table} />}
          </div>
        )}
        <div
          ref={tableContainerRef}
          className={clsx(
            "data-table-container flex-1 overflow-auto relative z-0",
            slots?.container
          )}
        >
          <table
            className={clsx(
              "data-table table table-fixed",
              {
                "table-pin-rows": enableStickyHeader,
                "no-border": !showBorder,
                "table-xs": size === "xs",
                "table-sm": size === "sm",
                "table-md": size === "md",
                "table-lg": size === "lg",
              },
              slots?.table
            )}
            style={{
              width: table.getTotalSize(),
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
                ) : null
              )}
            </colgroup>
            <thead
              // className={enableStickyHeader ? "sticky top-0 z-20" : undefined}
              className="relative z-20" // 使其创建一个层叠上下文
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
            <tbody className="relative z-0">
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
                        onClick={
                          enableRowSelection &&
                          enableClickRowSelection &&
                          !row.getIsGrouped()
                            ? row.getToggleSelectedHandler()
                            : undefined
                        }
                        className={row.getIsSelected() ? "selected" : undefined}
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
                    onClick={
                      enableRowSelection &&
                      enableClickRowSelection &&
                      !row.getIsGrouped()
                        ? row.getToggleSelectedHandler()
                        : undefined
                    }
                    className={row.getIsSelected() ? "selected" : undefined}
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
