import { Divider, TextInput } from "@rtdui/core";
import { DatesProvider, YearPickerInput } from "@rtdui/dates";
import { zhCN } from "date-fns/locale";
import { useState } from "react";

export default function Demo() {
	const [yearFormat, setYearFormat] = useState("yyyy");
	return (
		<div className="flex">
			<div className="flex-1">
				<DatesProvider
					settings={{
						locale: zhCN,
						timezone: "Asia/Shanghai",
					}}
				>
					<YearPickerInput
						valueFormat={yearFormat}
						label="YearPickerInput defalut"
						placeholder="Pick year"
					/>
					<YearPickerInput
						valueFormat={yearFormat}
						type="multiple"
						label="YearPickerInput multiple"
						placeholder="Pick year multiple"
					/>
					<YearPickerInput
						valueFormat={yearFormat}
						type="range"
						label="YearPickerInput range"
						placeholder="Pick year range"
					/>
				</DatesProvider>
			</div>
			<Divider direction="horizontal" />
			<div className="flex flex-col gap-4 w-64 p-4 bg-base-100">
				<TextInput
					label="Format"
					description="date-fns format supported format string"
					value={yearFormat}
					onChange={(e) => setYearFormat(e.currentTarget.value)}
				/>
			</div>
		</div>
	);
}

Demo.displayName = "YearPickerInputValueFormatDemo";
