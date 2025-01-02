import { forwardRef } from "react";
import clsx from "clsx";
import type { DayOfWeek, Locale } from "../../types";
import { useDatesContext } from "../DatesProvider";
import { getWeekdayNames } from "./get-weekdays-names/get-weekdays-names";
import { ThemeSize } from "@rtdui/core";

export interface WeekdaysRowProps extends React.ComponentPropsWithoutRef<"tr"> {
	/** Controls size */
	size?: ThemeSize;

	/** date-fns locale, defaults to value defined in DatesProvider */
	locale?: Locale;

	/** number 0-6, 0 – Sunday, 6 – Saturday, defaults to 1 – Monday */
	firstDayOfWeek?: DayOfWeek;

	/** date-fns format to get weekday name, defaults to "dd" */
	weekdayFormat?: string | ((date: Date) => React.ReactNode);

	/** Choose cell type that will be used to render weekdays, defaults to th */
	cellComponent?: "td" | "th";
}

export const WeekdaysRow = forwardRef<HTMLTableRowElement, WeekdaysRowProps>(
	(props, ref) => {
		const {
			className,
			style,
			locale,
			firstDayOfWeek,
			weekdayFormat,
			cellComponent: CellComponent = "th",
			...others
		} = props;

		const ctx = useDatesContext();

		const weekdays = getWeekdayNames({
			locale: locale || ctx.getLocale(),
			format: weekdayFormat,
			firstDayOfWeek: ctx.getFirstDayOfWeek(firstDayOfWeek),
		}).map((weekday, index) => (
			<CellComponent
				key={index}
				className={clsx("weekday", "py-2 font-normal text-gray-500 text-sm")}
			>
				{weekday}
			</CellComponent>
		));

		return (
			<tr ref={ref} className={clsx("weekdaysRow")} {...others}>
				{weekdays}
			</tr>
		);
	},
);

WeekdaysRow.displayName = "@rtdui/dates/WeekdaysRow";
