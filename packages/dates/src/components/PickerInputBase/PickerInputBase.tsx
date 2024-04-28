import { forwardRef } from "react";
import clsx from "clsx";
import { IconX } from "@tabler/icons-react";
import {
  Input,
  Popover,
  type InputBaseOwnProps,
  type PopoverProps,
  type ThemeSize,
  useInputProps,
} from "@rtdui/core";
import { useDisclosure } from "@rtdui/hooks";
import { DatePickerType } from "../../types";
import { DateFormatter } from "../../utils";
import { HiddenDatesInput, HiddenDatesInputValue } from "../HiddenDatesInput";

export interface DateInputSharedProps
  extends Omit<InputBaseOwnProps, "size">,
    Omit<
      React.ComponentPropsWithoutRef<"button">,
      "defaultValue" | "value" | "onChange" | "type"
    > {
  /** Determines whether dropdown should be closed when date is selected, not applicable when type="multiple"
   * @default true
   */
  closeOnChange?: boolean;

  /** Type of dropdown, defaults to popover
   * @default "popover"
   */
  dropdownType?: "popover" | "modal";

  /** Props passed down to Popover component */
  popoverProps?: Partial<Omit<PopoverProps, "children">>;

  /** Props passed down to Modal component */
  // modalProps?: Partial<Omit<ModalProps, "children">>;

  /** Determines whether input value can be cleared, adds clear button to right section
   * @default false
   */
  clearable?: boolean;

  /** Props passed down to clear button */
  clearButtonProps?: React.ComponentPropsWithoutRef<"button">;

  /** Determines whether the user can modify the value */
  readOnly?: boolean;

  /** Determines whether dates value should be sorted before onChange call, only applicable when type="multiple"
   * @default true
   */
  sortDates?: boolean;

  /** Separator between range value */
  labelSeparator?: string;

  /** Input placeholder */
  placeholder?: string;

  /** A function to format selected dates values into a string. By default, date is formatted based on the input type. */
  valueFormatter?: DateFormatter;
}

export interface PickerInputBaseProps extends DateInputSharedProps {
  children: React.ReactNode;
  formattedValue: string | null | undefined;
  dropdownHandlers: ReturnType<typeof useDisclosure>[1];
  dropdownOpened: boolean;
  onClear: () => void;
  shouldClear: boolean;
  value: HiddenDatesInputValue;
  type: DatePickerType;
  size?: ThemeSize;
}

export const PickerInputBase = forwardRef<
  HTMLInputElement,
  PickerInputBaseProps
>((props, ref) => {
  const {
    inputProps,
    wrapperProps,
    placeholder,
    popoverProps,
    modalProps,
    dropdownType = "popover",
    children,
    formattedValue,
    dropdownHandlers,
    dropdownOpened,
    onClick,
    clearable,
    onClear,
    clearButtonProps,
    rightSection,
    shouldClear,
    readOnly,
    disabled,
    value,
    name,
    form,
    type,
    ...others
  } = useInputProps(props);

  const _rightSection =
    rightSection ||
    (clearable && shouldClear && !readOnly && !disabled ? (
      <button
        className="btn btn-circle btn-xs btn-ghost"
        onClick={onClear}
        {...clearButtonProps}
      >
        <IconX size={18} />
      </button>
    ) : null);

  const handleClose = () => {
    const isInvalidRangeValue =
      type === "range" && Array.isArray(value) && value[0] && !value[1];
    if (isInvalidRangeValue) {
      onClear();
    }

    dropdownHandlers.close();
  };

  return (
    <>
      {/* {dropdownType === "modal" && !readOnly && (
        <Modal
          opened={dropdownOpened}
          onClose={handleClose}
          withCloseButton={false}
          size="auto"
          data-dates-modal
          unstyled={unstyled}
          {...modalProps}
        >
          {children}
        </Modal>
      )} */}

      <Input.Wrapper {...wrapperProps}>
        <Popover
          position="bottom-start"
          opened={dropdownOpened}
          trapFocus
          returnFocus
          {...popoverProps}
          disabled={
            popoverProps?.disabled || dropdownType === "modal" || readOnly
          }
          onClose={() => {
            popoverProps?.onClose?.();
            handleClose();
          }}
        >
          <Popover.Target>
            <Input
              as="button"
              type="button"
              slots={{ input: "text-left" }}
              aria-label={formattedValue || placeholder}
              data-dates-input
              data-read-only={readOnly || undefined}
              disabled={disabled}
              multiline
              onClick={(event: any) => {
                onClick?.(event);
                dropdownHandlers.toggle();
              }}
              rightSection={_rightSection}
              rightSectionPointerEvents={
                clearable ? "auto" : inputProps.rightSectionPointerEvents
              }
              {...inputProps}
              ref={ref}
              {...others}
            >
              {formattedValue || (
                <Input.Placeholder
                  error={inputProps.error}
                  // className={(classNames as any)?.placeholder}
                  // style={(style as any)?.placeholder}
                >
                  {placeholder}
                </Input.Placeholder>
              )}
            </Input>
          </Popover.Target>

          <Popover.Dropdown data-dates-dropdown className="px-4 py-3">
            {children}
          </Popover.Dropdown>
        </Popover>
      </Input.Wrapper>
      <HiddenDatesInput value={value} name={name} form={form} type={type} />
    </>
  );
});

PickerInputBase.displayName = "@rtdui/dates/PickerInputBase";
