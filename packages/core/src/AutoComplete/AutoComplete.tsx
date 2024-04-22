import { forwardRef, useEffect } from "react";
import { useId, useUncontrolled } from "@mantine/hooks";
import {
  Combobox,
  ComboboxLikeProps,
  ComboboxLikeRenderOptionInput,
  ComboboxStringData,
  ComboboxStringItem,
  getOptionsLockup,
  getParsedComboboxData,
  OptionsDropdown,
  useCombobox,
} from "../Combobox";
import { TextInput, TextInputProps } from "../TextInput";

export interface AutoCompleteProps
  extends Omit<ComboboxLikeProps, "data">,
    Omit<TextInputProps, "defaultValue" | "value" | "onChange"> {
  /** Data displayed in the dropdown */
  data?: ComboboxStringData;

  /** Controlled component value */
  value?: string;

  /** Uncontrolled component default value */
  defaultValue?: string;

  /** Called when value changes */
  onChange?: (val: string) => void;

  /** A function to render content of the option, replaces the default content of the option */
  renderOption?: (
    input: ComboboxLikeRenderOptionInput<ComboboxStringItem>
  ) => React.ReactNode;
}

export const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  (props, ref) => {
    const {
      dropdownOpened,
      defaultDropdownOpened,
      onDropdownClose,
      onDropdownOpen,
      onFocus,
      onBlur,
      onClick,
      onChange,
      data,
      value,
      defaultValue,
      selectFirstOptionOnChange,
      onOptionSubmit,
      comboboxProps,
      readOnly,
      disabled,
      filter,
      limit,
      withScrollArea,
      maxDropdownHeight,
      size,
      id,
      renderOption,
      autoComplete,
      ...others
    } = props;

    const _id = useId(id);
    const parsedData = getParsedComboboxData(data);
    const optionsLockup = getOptionsLockup(parsedData);

    const [_value, setValue] = useUncontrolled({
      value,
      defaultValue,
      finalValue: "",
      onChange,
    });

    const combobox = useCombobox({
      opened: dropdownOpened,
      defaultOpened: defaultDropdownOpened,
      onDropdownOpen,
      onDropdownClose: () => {
        onDropdownClose?.();
        combobox.resetSelectedOption();
      },
    });

    useEffect(() => {
      if (selectFirstOptionOnChange) {
        combobox.selectFirstOption();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectFirstOptionOnChange, _value]);

    return (
      <Combobox
        store={combobox}
        readOnly={readOnly}
        onOptionSubmit={(val) => {
          onOptionSubmit?.(val);
          setValue(optionsLockup[val].label);
          combobox.closeDropdown();
        }}
        size={size}
        {...comboboxProps}
      >
        <Combobox.Target autoComplete={autoComplete}>
          <TextInput
            ref={ref}
            {...others}
            size={size}
            disabled={disabled}
            readOnly={readOnly}
            value={_value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              combobox.openDropdown();
              selectFirstOptionOnChange && combobox.selectFirstOption();
            }}
            onFocus={(event) => {
              combobox.openDropdown();
              onFocus?.(event);
            }}
            onBlur={(event) => {
              combobox.closeDropdown();
              onBlur?.(event);
            }}
            onClick={(event) => {
              combobox.openDropdown();
              onClick?.(event);
            }}
            id={_id}
          />
        </Combobox.Target>
        <OptionsDropdown
          data={parsedData}
          hidden={readOnly || disabled}
          filter={filter}
          search={_value}
          limit={limit}
          hiddenWhenEmpty
          maxDropdownHeight={maxDropdownHeight}
          labelId={`${_id}-label`}
          renderOption={renderOption}
        />
      </Combobox>
    );
  }
);

AutoComplete.displayName = "@rtdui/core/AutoComplete";
