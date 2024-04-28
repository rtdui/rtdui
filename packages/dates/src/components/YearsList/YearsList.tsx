import { forwardRef } from "react";
import clsx from "clsx";
import { ThemeSize } from "@rtdui/core";
import { ControlsGroupSettings } from "../../types";
import { useDatesContext } from "../DatesProvider";
import { PickerControl, PickerControlProps } from "../PickerControl";
import { getYearInTabOrder } from "./get-year-in-tab-order/get-year-in-tab-order";
import { getYearsData } from "./get-years-data/get-years-data";
import { isYearDisabled } from "./is-year-disabled/is-year-disabled";
import { format, isSame } from "../../utils";

export interface YearsListSettings extends ControlsGroupSettings {
  /** Prevents focus shift when buttons are clicked */
  __preventFocus?: boolean;

  /** Determines whether propagation for Escape key should be stopped */
  __stopPropagation?: boolean;

  /** date-fns format for years list
   * @default "yyyy"
   */
  yearsListFormat?: string;

  /** Adds props to year picker control based on date */
  getYearControlProps?: (date: Date) => Partial<PickerControlProps>;

  /** Component size */
  size?: ThemeSize;

  /** Determines whether controls should be separated by spacing
   * @default true
   */
  withCellSpacing?: boolean;
}

export interface YearsListProps
  extends YearsListSettings,
    React.ComponentPropsWithoutRef<"table"> {
  /** Decade for which years list should be displayed */
  decade: Date;
}

export const YearsList = forwardRef<HTMLTableElement, YearsListProps>(
  (props, ref) => {
    const {
      className,
      style,
      decade,
      yearsListFormat = "yyyy",
      locale,
      minDate,
      maxDate,
      getYearControlProps,
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

    const years = getYearsData(decade);

    const yearInTabOrder = getYearInTabOrder(
      years,
      minDate,
      maxDate,
      getYearControlProps
    );

    const rows = years.map((yearsRow, rowIndex) => {
      const cells = yearsRow.map((year, cellIndex) => {
        const controlProps = getYearControlProps?.(year);
        const isYearInTabOrder = isSame(year, yearInTabOrder, "year");
        return (
          <td
            key={cellIndex}
            className={clsx("yearsListCell")}
            data-with-spacing={withCellSpacing || undefined}
          >
            <PickerControl
              className={clsx("yearsListControl")}
              size={size}
              data-rtdui-stop-propagation={__stopPropagation || undefined}
              disabled={isYearDisabled(year, minDate, maxDate)}
              ref={(node) => __getControlRef?.(rowIndex, cellIndex, node!)}
              {...controlProps}
              onKeyDown={(event) => {
                controlProps?.onKeyDown?.(event);
                __onControlKeyDown?.(event, {
                  rowIndex,
                  cellIndex,
                  date: year,
                });
              }}
              onClick={(event) => {
                controlProps?.onClick?.(event);
                __onControlClick?.(event, year);
              }}
              onMouseEnter={(event) => {
                controlProps?.onMouseEnter?.(event);
                __onControlMouseEnter?.(event, year);
              }}
              onMouseDown={(event) => {
                controlProps?.onMouseDown?.(event);
                __preventFocus && event.preventDefault();
              }}
              tabIndex={__preventFocus || !isYearInTabOrder ? -1 : 0}
            >
              {format(year, yearsListFormat, { locale: ctx.getLocale() })}
            </PickerControl>
          </td>
        );
      });

      return (
        <tr key={rowIndex} className={clsx("yearsListRow")}>
          {cells}
        </tr>
      );
    });

    return (
      <table
        ref={ref}
        // size={size}
        className={clsx("yearsList")}
        {...others}
      >
        <tbody>{rows}</tbody>
      </table>
    );
  }
);

YearsList.displayName = "@rtdui/dates/YearsList";
