import {
	DatesProvider,
	DatePickerInput,
	YearPickerInput,
	MonthPickerInput,
} from "@rtdui/dates";
import { zhCN } from "date-fns/locale";

export default function Demo() {
	return (
		<div className="flex flex-col gap-4">
			<DatesProvider
				settings={{
					locale: zhCN,
					timezone: "Asia/Shanghai",
				}}
			>
				<YearPickerInput
					type="range"
					label="YearPickerInput"
					placeholder="Pick year range"
				/>
				<MonthPickerInput
					type="range"
					label="MonthPickerInput"
					placeholder="Pick month range"
				/>
				<DatePickerInput
					type="range"
					label="DatePickerInput"
					placeholder="Pick date range"
				/>
			</DatesProvider>
		</div>
	);
}

Demo.displayName = "DatesRangeDemo";
