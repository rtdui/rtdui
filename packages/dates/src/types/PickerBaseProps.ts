import type { DatePickerType, DatePickerValue } from "./DatePickerValue";

export interface PickerBaseProps<T extends DatePickerType = "default"> {
  /** Picker type: range, multiple or default */
  type?: DatePickerType | T;

  /** Value for controlled component */
  value?: DatePickerValue<T>;

  /** Default value for uncontrolled component */
  defaultValue?: DatePickerValue<T>;

  /** Called when value changes */
  onChange?: (value: DatePickerValue<T>) => void;

  /** Determines whether user can deselect the date by clicking on selected item, applicable only when type="default" */
  allowDeselect?: T extends "default" ? boolean : never;

  /** Determines whether single year can be selected as range, applicable only when type="range" */
  allowSingleDateInRange?: T extends "range" ? boolean : never;
}
