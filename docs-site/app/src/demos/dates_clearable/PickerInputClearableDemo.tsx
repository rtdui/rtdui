import { Divider, Switch, TextInput } from "@rtdui/core";
import {
	DatesProvider,
	DatePickerInput,
	DateInput,
	YearPickerInput,
	MonthPickerInput,
	DateTimePickerInput,
} from "@rtdui/dates";
import { zhCN } from "date-fns/locale";
import { useState } from "react";

export default function Demo() {
	const [clearable, setClearable] = useState(true);
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
						clearable={clearable}
						label="YearPickerInput"
						placeholder="Pick year"
					/>
					<MonthPickerInput
						clearable={clearable}
						label="MonthPickerInput"
						placeholder="Pick month"
					/>
					<DatePickerInput
						clearable={clearable}
						label="DatePickerInput"
						placeholder="Pick date"
					/>
					<DateTimePickerInput
						clearable={clearable}
						label="DateTimePickerInput"
						placeholder="Pick date and time"
					/>
					<DateInput
						clearable={clearable}
						label="DateInput"
						placeholder="Pick or input date"
					/>
				</DatesProvider>
			</div>
			<Divider direction="horizontal" />
			<div className="flex flex-col gap-4 w-64 p-4 bg-base-100">
				<Switch
					color="secondary"
					label="Clearable"
					checked={clearable}
					onChange={setClearable}
				/>
			</div>
		</div>
	);
}

Demo.displayName = "PickerInputClearableDemo";
