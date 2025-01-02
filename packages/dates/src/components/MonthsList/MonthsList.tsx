import { forwardRef } from "react";
import { ControlsGroupSettings } from "../../types";
import { useDatesContext } from "../DatesProvider";
import { PickerControl, PickerControlProps } from "../PickerControl";
import { getMonthInTabOrder } from "./get-month-in-tab-order/get-month-in-tab-order";
import { getMonthsData } from "./get-months-data/get-months-data";
import { isMonthDisabled } from "./is-month-disabled/is-month-disabled";
import { ThemeSize, getSize } from "@rtdui/core";
import clsx from "clsx";
import { format, isSame } from "../../utils";

export interface MonthsListSettings extends ControlsGroupSettings {
	/** date-fns format for months list
	 * @default "MMM"
	 */
	monthsListFormat?: string;

	/** Adds props to month picker control based on date */
	getMonthControlProps?: (date: Date) => Partial<PickerControlProps>;

	/** Determines whether propagation for Escape key should be stopped */
	__stopPropagation?: boolean;

	/** Determines whether controls should be separated by spacing, true by default */
	withCellSpacing?: boolean;
}

export interface MonthsListProps
	extends MonthsListSettings,
		React.ComponentPropsWithoutRef<"table"> {
	/** Prevents focus shift when buttons are clicked */
	__preventFocus?: boolean;

	/** Year for which months list should be displayed */
	year: Date;

	/** Component size */
	size?: ThemeSize;
}

export const MonthsList = forwardRef<HTMLTableElement, MonthsListProps>(
	(props, ref) => {
		const {
			className,
			style,
			year,
			monthsListFormat = "MMM",
			locale,
			minDate,
			maxDate,
			getMonthControlProps,
			__getControlRef,
			__onControlKeyDown,
			__onControlClick,
			__onControlMouseEnter,
			__preventFocus,
			__stopPropagation,
			withCellSpacing = true,
			size,
			...others
		} = props;

		const ctx = useDatesContext();

		const months = getMonthsData(year);

		const monthInTabOrder = getMonthInTabOrder(
			months,
			minDate,
			maxDate,
			getMonthControlProps,
		);

		const rows = months.map((monthsRow, rowIndex) => {
			const cells = monthsRow.map((month, cellIndex) => {
				const controlProps = getMonthControlProps?.(month);
				const isMonthInTabOrder = isSame(month, monthInTabOrder, "month");
				return (
					<td
						key={cellIndex}
						className={clsx("monthsListCell")}
						data-with-spacing={withCellSpacing || undefined}
					>
						<PickerControl
							className={clsx("monthsListControl")}
							size={size}
							data-rtdui-stop-propagation={__stopPropagation || undefined}
							disabled={isMonthDisabled(month, minDate, maxDate)}
							ref={(node) => __getControlRef?.(rowIndex, cellIndex, node!)}
							{...controlProps}
							onKeyDown={(event) => {
								controlProps?.onKeyDown?.(event);
								__onControlKeyDown?.(event, {
									rowIndex,
									cellIndex,
									date: month,
								});
							}}
							onClick={(event) => {
								controlProps?.onClick?.(event);
								__onControlClick?.(event, month);
							}}
							onMouseEnter={(event) => {
								controlProps?.onMouseEnter?.(event);
								__onControlMouseEnter?.(event, month);
							}}
							onMouseDown={(event) => {
								controlProps?.onMouseDown?.(event);
								__preventFocus && event.preventDefault();
							}}
							tabIndex={__preventFocus || !isMonthInTabOrder ? -1 : 0}
						>
							{format(month, monthsListFormat, {
								locale: ctx.getLocale(),
							})}
						</PickerControl>
					</td>
				);
			});

			return (
				<tr key={rowIndex} className={clsx("monthsListRow")}>
					{cells}
				</tr>
			);
		});

		return (
			<table
				ref={ref}
				// size={size}
				className={clsx("monthsList", className)}
				style={
					{
						...style,
					} as any
				}
				{...others}
			>
				<tbody>{rows}</tbody>
			</table>
		);
	},
);

MonthsList.displayName = "@rtdui/dates/MonthsList";
