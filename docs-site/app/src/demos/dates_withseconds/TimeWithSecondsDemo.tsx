import { Divider } from "@rtdui/core";
import {
	DatesProvider,
	DateTimePickerInput,
	TimeInput,
	TimePickerInput,
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
				<Divider label="default" />
				<DateTimePickerInput
					label="DateTimePickerInput"
					placeholder="Pick date"
				/>
				<TimePickerInput label="TimePickerInput" placeholder="pick time" />
				<TimeInput label="TimeInput" placeholder="Pick time" />
				<Divider label="with seconds" />
				<DateTimePickerInput
					withSeconds
					label="DateTimePickerInput"
					placeholder="Pick date"
				/>
				<TimePickerInput
					withSeconds
					label="TimePickerInput"
					placeholder="pick time"
				/>
				<TimeInput withSeconds label="TimeInput" placeholder="Pick time" />
			</DatesProvider>
		</div>
	);
}

Demo.displayName = "TimeWithSecondsDemo";
