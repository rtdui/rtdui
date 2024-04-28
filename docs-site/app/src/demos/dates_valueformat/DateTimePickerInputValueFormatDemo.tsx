import { Divider, TextInput } from "@rtdui/core";
import { DatesProvider, DateTimePickerInput } from "@rtdui/dates";
import { zhCN } from "date-fns/locale";
import { useState } from "react";

export default function Demo() {
  const [dateTimeFormat, setDateTimeFormat] = useState("yyyy-MM-dd HH:mm");
  return (
    <div className="flex">
      <div className="flex-1">
        <DatesProvider
          settings={{
            locale: zhCN,
            timezone: "Asia/Shanghai",
          }}
        >
          <DateTimePickerInput
            valueFormat={dateTimeFormat}
            label="DateTimePickerInput defalut"
            placeholder="Pick year"
          />
        </DatesProvider>
      </div>
      <Divider direction="horizontal" />
      <div className="flex flex-col gap-4 w-64 p-4 bg-base-100">
        <TextInput
          label="Format"
          description="date-fns format supported format string"
          value={dateTimeFormat}
          onChange={(e) => setDateTimeFormat(e.currentTarget.value)}
        />
      </div>
    </div>
  );
}

Demo.displayName = "DateTimePickerInputValueFormatDemo";
