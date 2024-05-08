import {
  Divider,
  FloatingSelect,
  Slider,
  Switch,
  TextInput,
} from "@rtdui/core";
import {
  DatesProvider,
  DatePickerInput,
  YearPickerInput,
  MonthPickerInput,
  DateTimePickerInput,
  DateInput,
  TimeInput,
  TimePicker,
  TimePickerInput,
} from "@rtdui/dates";
import { zhCN } from "date-fns/locale";
import { useState } from "react";
import ColorControl from "~/src/components/ColorControl";

const variants = ["outline", "default", "ghost"];
const radius = ["xs", "sm", "md", "lg", "xl", "circle"];
const size = ["xs", "sm", "md", "lg", "xl"];
export default function Demo() {
  const [state, setState] = useState({
    color: "default",
    variant: "outline",
    size: "sm",
    radius: "md",
    disabled: false,
    label: "Label",
    withAsterisk: false,
    description: "Description",
    error: "",
  });
  return (
    <div className="flex">
      <div className="flex-1 flex flex-col gap-4">
        <DatesProvider
          settings={{
            locale: zhCN,
            timezone: "Asia/Shanghai",
          }}
        >
          <Divider label="只能选取的输入组件" />
          <i>YearPickerInput:</i>
          <YearPickerInput
            variant={state.variant as any}
            color={state.color}
            size={state.size as any}
            radius={state.radius as any}
            disabled={state.disabled}
            label={state.label}
            withAsterisk={state.withAsterisk}
            description={state.description}
            error={state.error}
            placeholder="Pick year"
          />
          <i>MonthPickerInput:</i>
          <MonthPickerInput
            variant={state.variant as any}
            color={state.color}
            size={state.size as any}
            radius={state.radius as any}
            disabled={state.disabled}
            label={state.label}
            withAsterisk={state.withAsterisk}
            description={state.description}
            error={state.error}
            placeholder="Pick month"
          />
          <i>DatePickerInput:</i>
          <DatePickerInput
            variant={state.variant as any}
            color={state.color}
            size={state.size as any}
            radius={state.radius as any}
            disabled={state.disabled}
            label={state.label}
            withAsterisk={state.withAsterisk}
            description={state.description}
            error={state.error}
            placeholder="Pick date"
          />
          <i>DateTimePicker:</i>
          <DateTimePickerInput
            variant={state.variant as any}
            color={state.color}
            size={state.size as any}
            radius={state.radius as any}
            disabled={state.disabled}
            label={state.label}
            withAsterisk={state.withAsterisk}
            description={state.description}
            error={state.error}
            placeholder="Pick date and time"
          />
          <i>TimePickerInput:</i>
          <TimePickerInput
            variant={state.variant as any}
            color={state.color}
            size={state.size as any}
            radius={state.radius as any}
            disabled={state.disabled}
            label={state.label}
            withAsterisk={state.withAsterisk}
            description={state.description}
            error={state.error}
            placeholder="pick time"
            onChange={(val) => console.log(val)}
          />
          <Divider label="允许自由输入的组件" />
          <i>DateInput:</i>
          <DateInput
            variant={state.variant as any}
            color={state.color}
            size={state.size as any}
            radius={state.radius as any}
            disabled={state.disabled}
            label={state.label}
            withAsterisk={state.withAsterisk}
            description={state.description}
            error={state.error}
            placeholder="input or pick date"
          />
          <i>TimeInput:</i>
          <TimeInput
            variant={state.variant as any}
            color={state.color}
            size={state.size as any}
            radius={state.radius as any}
            disabled={state.disabled}
            label={state.label}
            withAsterisk={state.withAsterisk}
            description={state.description}
            error={state.error}
            placeholder="input time"
          />
        </DatesProvider>
      </div>
      <Divider direction="horizontal" />
      <div className="flex flex-col gap-4 bg-base-100 p-4">
        Border color:
        <ColorControl
          extraColors={["default"]}
          withPicker={false}
          value={state.color}
          onChange={(val) => setState((prev) => ({ ...prev, color: val }))}
        />
        Variant:
        <FloatingSelect
          data={variants}
          value={state.variant}
          onChange={(val) => setState((prev) => ({ ...prev, variant: val }))}
        />
        Size:
        <Slider
          min={0}
          max={4}
          label={(val) => size[val]}
          labelAlwaysOn
          value={size.indexOf(state.size)}
          onChange={(val) => setState((prev) => ({ ...prev, size: size[val] }))}
        />
        Radius:
        <Slider
          min={0}
          max={5}
          label={(val) => radius[val]}
          labelAlwaysOn
          value={radius.indexOf(state.radius)}
          onChange={(val) =>
            setState((prev) => ({ ...prev, radius: radius[val] }))
          }
        />
        <Switch
          label="Disabled"
          color="secondary"
          checked={state.disabled}
          onChange={(val) => setState((prev) => ({ ...prev, disabled: val }))}
        />
        <TextInput
          label="Label"
          radius="xs"
          value={state.label}
          onChange={(e) =>
            setState((prev) => ({ ...prev, label: e.currentTarget.value }))
          }
        />
        <Switch
          label="With asterisk"
          color="secondary"
          checked={state.withAsterisk}
          onChange={(val) =>
            setState((prev) => ({ ...prev, withAsterisk: val }))
          }
        />
        <TextInput
          label="Description"
          radius="xs"
          value={state.description}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              description: e.currentTarget.value,
            }))
          }
        />
        <TextInput
          label="Error"
          radius="xs"
          value={state.error}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              error: e.currentTarget.value,
            }))
          }
        />
      </div>
    </div>
  );
}

Demo.displayName = "DatesBasicDemo";
