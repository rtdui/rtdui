import { Divider, TextInput } from "@rtdui/core";
import { DatesProvider, DatePickerInput, DateInput } from "@rtdui/dates";
import { zhCN } from "date-fns/locale";
import { useState } from "react";

export default function Demo() {
  const [dateFormat, setDateFormat] = useState("yyyy年M月d日");
  return (
    <div className="flex">
      <div className="flex-1">
        <DatesProvider
          settings={{
            locale: zhCN,
            timezone: "Asia/Shanghai",
          }}
        >
          <DatePickerInput
            valueFormat={dateFormat}
            label="DatePickerInput defalut"
            placeholder="Pick year"
          />
          <DatePickerInput
            valueFormat={dateFormat}
            type="multiple"
            label="DatePickerInput multiple"
            placeholder="Pick year multiple"
          />
          <DatePickerInput
            valueFormat={dateFormat}
            type="range"
            label="DatePickerInput range"
            placeholder="Pick year range"
          />
          <DateInput
            valueFormat={dateFormat}
            label="DateInput"
            placeholder="Pick year range"
          />
        </DatesProvider>
      </div>
      <Divider direction="horizontal" />
      <div className="flex flex-col gap-4 w-64 p-4 bg-base-100">
        <TextInput
          label="Format"
          description="date-fns format supported format string"
          value={dateFormat}
          onChange={(e) => setDateFormat(e.currentTarget.value)}
        />
      </div>
    </div>
  );
}

Demo.displayName = "DatePickerInputValueFormatDemo";
