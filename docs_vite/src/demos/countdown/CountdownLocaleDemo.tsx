import { Countdown } from "@rtdui/core";

export default function CountdownLocaleDemo() {
  const now = new Date();
  const end = now.setFullYear(now.getFullYear() + 2); // 2年倒计时
  const endDate = new Date(end);
  return (
    <div className="flex flex-col items-start gap-4">
      <Countdown
        endDate={endDate}
        labels={{
          years: "年",
          months: "月",
          days: "日",
          hours: "时",
          minutes: "分",
          seconds: "秒",
        }}
      />
      <Countdown
        endDate={endDate}
        variant="labelInline"
        labels={{
          years: "年",
          months: "月",
          days: "日",
          hours: "时",
          minutes: "分",
          seconds: "秒",
        }}
      />
      <Countdown
        endDate={endDate}
        variant="box"
        labels={{
          years: "年",
          months: "月",
          days: "日",
          hours: "时",
          minutes: "分",
          seconds: "秒",
        }}
      />
    </div>
  );
}
