import React from "react";
import clsx from "clsx";
import { size } from "@floating-ui/react";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { useUncontrolled } from "@rtdui/hooks";
import { TextInput } from "../TextInput";
import { getType } from "../utils";
import { Popover } from "../Popover";

export interface ItemOption {
  label: string;
  value: any;
  [key: string]: any;
}

export interface SelectProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TextInput>,
    "value" | "defaultValue" | "onChange" | "slots"
  > {
  options: ItemOption[] | string[];
  multiple?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (val: string | string[]) => void;
  slots?: React.ComponentPropsWithoutRef<typeof TextInput>["slots"] & {
    menu?: string;
  };
}

const padding = 24;
export function Select(props: SelectProps) {
  const {
    name,
    defaultValue,
    value: valueProp,
    onChange,
    disabled,
    readOnly,
    multiple = false,
    options,
    slots,
    ...other
  } = props;

  const standardizedOptions = React.useMemo(
    () =>
      getType(options[0]) === "String"
        ? (options.map((d) => ({ label: d, value: d })) as ItemOption[])
        : (options as ItemOption[]),
    [options]
  );

  const [value, setValue] = useUncontrolled({
    defaultValue,
    value: valueProp,
    finalValue: "",
    onChange,
  });

  const selectedValues = value
    .toString()
    .split(",")
    .filter(Boolean)
    .map((d) => d.trim());

  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const listRef = React.useRef<HTMLElement[]>([]);

  const handleSelectChange = (item: ItemOption) => {
    if (multiple) {
      const itemIndex = selectedValues.findIndex((d) => d === item.value);
      if (itemIndex >= 0) {
        selectedValues.splice(itemIndex, 1); // 删除
      } else {
        selectedValues.push(item.value); // 添加
      }
      setValue(selectedValues);
    } else {
      selectedValues[0] = item.value;
      setOpen(false);
      setValue(item.value);
    }
  };

  const displayValue = selectedValues
    .map((d) => standardizedOptions.find((dd) => dd.value === d)?.label)
    .join(", ");

  const extraMiddleware = [
    size({
      apply({ rects, elements, availableHeight, placement }) {
        Object.assign(elements.floating.style, {
          // maxHeight: "296px", // 8个列表项(每个36)+padding(8)
          // width: `${rects.reference.width}px`,
          minWidth: `${rects.reference.width}px`,
          // overflow: "hidden",
        });
      },
      padding,
    }),
  ];

  return (
    <Popover
      disabled={disabled || readOnly}
      open={open}
      onOpenChange={setOpen}
      listRef={listRef}
      activeListIndex={activeIndex}
      onActiveIndexChanged={setActiveIndex}
      extraMiddleware={extraMiddleware}
    >
      <input type="hidden" name={name} value={selectedValues} />
      <Popover.Trigger>
        <TextInput
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              activeIndex != null &&
              standardizedOptions[activeIndex]
            ) {
              handleSelectChange(standardizedOptions[activeIndex]);
            }
          }}
          rightSection={<IconChevronDown size={16} />}
          slots={{ ...slots, right: clsx(slots?.right, "pointer-events-none") }}
          value={displayValue}
          readOnly
          disabled={disabled}
          {...other}
        />
      </Popover.Trigger>
      <Popover.Dropdown
        showArrow
        slots={{
          arrow: "fill-base-100",
        }}
        className="max-h-60 shadow-[0_0_10px] shadow-gray-400 bg-base-100 rounded-md overflow-auto"
      >
        <ul className={clsx("menu flex-nowrap", slots?.menu)}>
          {standardizedOptions.map((d, index) => (
            <li
              key={d.value}
              ref={(node) => {
                listRef.current[index] = node!;
              }}
              role="option"
              aria-selected={selectedValues.includes(d.value)}
              onClick={(e) => {
                handleSelectChange(d);
              }}
            >
              <button
                type="button"
                className={clsx({
                  active: selectedValues.includes(d.value),
                  focus: index === activeIndex,
                })}
              >
                {d.label}
                <span aria-hidden className="absolute right-4">
                  {selectedValues.includes(d.value) && <IconCheck size={20} />}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Popover.Dropdown>
    </Popover>
  );
}
