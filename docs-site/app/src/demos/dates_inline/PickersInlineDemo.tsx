import { Divider, FloatingSelect, Switch } from "@rtdui/core";
import {
  DatesProvider,
  YearPicker,
  MonthPicker,
  DatePicker,
  format,
  DatePickerType,
} from "@rtdui/dates";
import { zhCN } from "date-fns/locale";
import { useState } from "react";

export default function Demo() {
  const [allowDeselect, setAllowDeselect] = useState(false);
  const [selectedYear, setSelectedYear] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col gap-4">
        <DatesProvider
          settings={{
            locale: zhCN,
            firstDayOfWeek: 1,
            weekendDays: [0, 6],
            timezone: "UTC",
          }}
        >
          <Divider label="YearPicker" />
          <YearPicker
            allowDeselect={allowDeselect}
            value={selectedYear}
            onChange={setSelectedYear}
          />
          <pre>
            <output>
              选择的年份: {selectedYear ? format(selectedYear, "yyyy") : "none"}
            </output>
          </pre>
          <Divider label="MonthPicker" />
          <MonthPicker
            allowDeselect={allowDeselect}
            value={selectedMonth}
            onChange={setSelectedMonth}
          />
          <pre>
            <output>
              选择的月份:{" "}
              {selectedMonth
                ? format(selectedMonth, "MMMM yyyy", { locale: zhCN })
                : "none"}
            </output>
          </pre>
          <Divider label="DatePicker" />
          <DatePicker
            allowDeselect={allowDeselect}
            value={selectedDate}
            onChange={setSelectedDate}
          />
          <pre>
            <output>
              选择的日期:{" "}
              {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "none"}
            </output>
          </pre>
        </DatesProvider>
      </div>
      <Divider direction="horizontal" />
      <div className="flex flex-col gap-4 w-64 p-4 bg-base-100">
        <Switch
          label="Allow deselect"
          checked={allowDeselect}
          onChange={setAllowDeselect}
        />
      </div>
    </div>
  );
}

Demo.displayName = "PickersInlineDemo";
