import { CSSProperties } from "react";
import { Column } from "@tanstack/react-table";

/**
 * 该方法源自于官方的sticky pinned column的例子
 *
 * 该方法sticky pinned column要想工作table必须设置一些样式: border-collapse: separate; border-spacing: 0;
 *
 * 该方法的局限性:
 * 1. 组列中的列进行分组时的问题, left和right的取值没考虑colspan
 * 2. boxShadow 只会应用到叶子列, 组列不会应用.
 * 3. 同时存在表头单元格sticky和数据单元格pinned的问题.
 *
 * 基于此, 项目中并未使用该方法, 留作参考
 */
export const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
	const isPinned = column.getIsPinned();
	const isLastLeftPinnedColumn =
		isPinned === "left" && column.getIsLastColumn("left"); // column.getIsLastColumn()只会判断叶子列, 非叶子列被忽略.
	const isFirstRightPinnedColumn =
		isPinned === "right" && column.getIsFirstColumn("right"); // column.getIsFirstColumn()只会判断叶子列, 非叶子列被忽略.

	return {
		boxShadow: isLastLeftPinnedColumn
			? "-4px 0 4px -4px gray inset"
			: isFirstRightPinnedColumn
				? "4px 0 4px -4px gray inset"
				: undefined,
		left: isPinned === "left" ? `${column.getStart("left")}px` : undefined, // column.getStart()取值没考虑colspan的清空
		right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined, // column.getStart()取值没考虑colspan的清空
		opacity: isPinned ? 0.95 : 1,
		position: isPinned ? "sticky" : "relative",
		width: column.getSize(),
		zIndex: isPinned ? 1 : 0, // 同时存在表头行中的单元格sticky和数据行中单元格pinned的问题.
	};
};
