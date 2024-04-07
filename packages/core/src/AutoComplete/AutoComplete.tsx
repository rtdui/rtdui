import React from "react";
import { size } from "@floating-ui/react";
import clsx from "clsx";
import { IconX } from "@tabler/icons-react";
import { useUncontrolled } from "@rtdui/hooks";
import { TextInput } from "../TextInput";
import { Button } from "../Button";
import { Popover } from "../Popover";

const padding = 24;
export interface AutoCompleteProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TextInput>,
    "onChange" | "value" | "defaultValue"
  > {
  /** 数据源列表 */
  options: string[];
  /**
   * 是否显示清除按钮
   * @default true
   */
  clearable?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (val: string) => void;
}

/** ref属性会转发至内部的input元素 */
export const AutoComplete = React.forwardRef<
  HTMLInputElement,
  AutoCompleteProps
>((props, ref) => {
  const {
    options,
    disabled,
    readOnly,
    clearable = true,
    rightSection,
    value: valueProp,
    defaultValue,
    onChange,
    ...other
  } = props;
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const listRef = React.useRef<HTMLElement[]>([]);

  const [value, setValue] = useUncontrolled({
    value: valueProp,
    defaultValue,
    finalValue: "",
    onChange,
  });

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setValue(value);

    if (value) {
      setOpen(true);
      setActiveIndex(0);
    } else {
      setOpen(false);
    }
  }

  const items = options.filter((d) =>
    d.toLowerCase().includes(value.toLowerCase())
  );

  const extraMiddleware = [
    size({
      apply({ rects, elements, availableHeight, placement }) {
        Object.assign(elements.floating.style, {
          // maxHeight: "296px", // 8个列表项(每个36)+padding(8)
          // width: `${rects.reference.width}px`,
          minWidth: `${rects.reference.width}px`,
          // overflow: "auto",
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
      <Popover.Trigger>
        <TextInput
          ref={ref}
          readOnly={readOnly}
          disabled={disabled}
          value={value}
          onChange={onInputChange}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              activeIndex != null &&
              items[activeIndex]
            ) {
              setValue(items[activeIndex]);
              setActiveIndex(null);
              setOpen(false);
            }
          }}
          rightSection={
            clearable &&
            value && (
              <Button
                ghost
                sharp="circle"
                size="xs"
                onClick={(e) => {
                  setValue("");
                  setActiveIndex(null);
                }}
              >
                <IconX size={18} />
              </Button>
            )
          }
          {...other}
        />
      </Popover.Trigger>
      <Popover.Dropdown
        showArrow
        slots={{
          arrow: "fill-base-100",
        }}
        className="max-h-60 shadow dark:shadow-base-300 bg-base-100 rounded-md overflow-auto"
      >
        <ul className="menu flex-nowrap">
          {items.length === 0 && (
            <li
              id="combobox-no-results"
              role="region"
              aria-atomic="true"
              aria-live="assertive"
            >
              <button type="button">无匹配的项</button>
            </li>
          )}
          {items.map((d, index) => (
            <li
              key={d}
              ref={(el) => {
                listRef.current[index] = el!;
              }}
              onClick={() => {
                setValue(d);
                setOpen(false);
              }}
            >
              <button
                type="button"
                className={clsx({ focus: activeIndex === index })}
              >
                {d}
              </button>
            </li>
          ))}
        </ul>
      </Popover.Dropdown>
    </Popover>
  );
});
