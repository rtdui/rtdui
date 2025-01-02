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
					type="multiple"
					label="YearPickerInput"
					placeholder="Pick year multiple"
				/>
				<MonthPickerInput
					type="multiple"
					label="MonthPickerInput"
					placeholder="Pick month multiple"
				/>

				<DatePickerInput
					type="multiple"
					label="DatePickerInput"
					placeholder="Pick date multiple"
				/>
			</DatesProvider>
		</div>
	);
}

Demo.displayName = "DatesMultipleDemo";
