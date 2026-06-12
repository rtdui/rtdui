import type { DayOfWeek, Locale } from "../../types";
import { createOptionalContext } from "@rtdui/core";

export interface DatesContextValue {
  locale?: Locale;
  timezone: string | null;
  firstDayOfWeek: DayOfWeek;
  weekendDays: DayOfWeek[];
  labelSeparator: string;
  consistentWeeks: boolean;
}

export const DATES_CONTEXT_DEFAULT_VALUE: DatesContextValue = {
  locale: undefined,
  timezone: null,
  firstDayOfWeek: 1,
  weekendDays: [0, 6],
  labelSeparator: "-",
  consistentWeeks: false,
};

export const [DatesContext, useDateContext] = createOptionalContext(
  DATES_CONTEXT_DEFAULT_VALUE,
);

export type DatesContextSetting = Partial<DatesContextValue>;
export interface DatesProviderProps {
  settings: DatesContextSetting;
  children?: React.ReactNode;
}

export function DatesProvider({ settings, children }: DatesProviderProps) {
  return (
    <DatesContext value={{ ...DATES_CONTEXT_DEFAULT_VALUE, ...settings }}>
      {children}
    </DatesContext>
  );
}
