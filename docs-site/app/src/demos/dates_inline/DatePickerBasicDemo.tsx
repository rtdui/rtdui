import {
  DatesProvider,
  DatePicker,
  type DatePickerProps,
  isSame,
  set,
} from "@rtdui/dates";
import { zhCN, es } from "date-fns/locale";
import { useState } from "react";

const renderDay: DatePickerProps["renderDay"] = (date) => {
  if (isSame(date, new Date(), "day")) {
    const day = date.getDate();
    return (
      <div className="relative after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-info after:rounded-full">
        {day}
      </div>
    );
  }
};

export default function Demo() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <DatesProvider
        settings={{
          locale: zhCN,
          firstDayOfWeek: 1,
          weekendDays: [0, 6],
        }}
      >
        locale: es
        <DatePicker
          locale={es}
          value={selectedDate}
          onChange={setSelectedDate}
        />
        defaultLevel: year
        <DatePicker
          defaultLevel="year"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        maxLevel: year
        <DatePicker
          maxLevel="year"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        firstDayOfWeek: 0
        <DatePicker firstDayOfWeek={0} />
        hideWeekdays: true
        <DatePicker hideWeekdays />
        weekendDays: [1,2]
        <DatePicker weekendDays={[1, 2]} />
        numberOfColumns: 2
        <DatePicker
          numberOfColumns={2}
          value={selectedDate}
          onChange={setSelectedDate}
        />
        monthLabelFormat: yyyy MMMM
        <br />
        monthsListFormat: MMMM
        <DatePicker
          monthLabelFormat="yyyy MMMM"
          monthsListFormat="MMMM"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        自定义今日组件
        <DatePicker
          renderDay={renderDay}
          value={selectedDate}
          onChange={setSelectedDate}
        />
        minDate 和 maxDate 被限制到本月的2-15日
        <DatePicker
          minDate={set(new Date(), { date: 1 })}
          maxDate={set(new Date(), { date: 15 })}
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </DatesProvider>
    </div>
  );
}

Demo.displayName = "DatePickerBasicDemo";
