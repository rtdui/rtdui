import { Divider, TextInput } from "@rtdui/core";
import { DatesProvider, MonthPickerInput } from "@rtdui/dates";
import { zhCN } from "date-fns/locale";
import { useState } from "react";

export default function Demo() {
	const [monthFormat, setMonthFormat] = useState("yyyy MMM");
	return (
		<div className="flex">
			<div className="flex-1">
				<DatesProvider
					settings={{
						locale: zhCN,
						timezone: "Asia/Shanghai",
					}}
				>
					<MonthPickerInput
						valueFormat={monthFormat}
						label="MonthPickerInput defalut"
						placeholder="Pick year"
					/>
					<MonthPickerInput
						valueFormat={monthFormat}
						type="multiple"
						label="MonthPickerInput multiple"
						placeholder="Pick year multiple"
					/>
					<MonthPickerInput
						valueFormat={monthFormat}
						type="range"
						label="MonthPickerInput range"
						placeholder="Pick year range"
					/>
				</DatesProvider>
			</div>
			<Divider direction="horizontal" />
			<div className="flex flex-col gap-4 w-64 p-4 bg-base-100">
				<TextInput
					label="Format"
					description="date-fns format supported format string"
					value={monthFormat}
					onChange={(e) => setMonthFormat(e.currentTarget.value)}
				/>
			</div>
		</div>
	);
}

Demo.displayName = "YearPickerInputValueFormatDemo";
