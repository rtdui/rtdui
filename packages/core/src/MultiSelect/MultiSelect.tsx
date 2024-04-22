import { forwardRef, useEffect } from "react";
import { useId, useUncontrolled } from "@mantine/hooks";
import {
  Combobox,
  ComboboxClearButtonProps,
  ComboboxItem,
  ComboboxLikeProps,
  ComboboxLikeRenderOptionInput,
  getOptionsLockup,
  getParsedComboboxData,
  OptionsDropdown,
  useCombobox,
} from "../Combobox";
import { Chip } from "../Chip";
import { ChipsInput } from "../ChipsInput";
import { filterPickedValues } from "./filter-picked-values";
import { InputBaseOwnProps } from "../InputBase";

export interface MultiSelectProps
  extends ComboboxLikeProps,
    Omit<InputBaseOwnProps, "value" | "defaultValue" | "onChange">,
    Omit<
      React.ComponentPropsWithoutRef<"input">,
      "size" | "value" | "defaultValue" | "onChange"
    > {
  /** Controlled component value */
  value?: string[];

  /** Default value for uncontrolled component */
  defaultValue?: string[];

  /** Called whe value changes */
  onChange?: (value: string[]) => void;

  /** Called when the clear button is clicked */
  onClear?: () => void;

  /** Determines whether the select should be searchable
   * @default false
   */
  searchable?: boolean;

  /** Controlled search value */
  searchValue?: string;

  /** Default search value */
  defaultSearchValue?: string;

  /** Called when search changes */
  onSearchChange?: (value: string) => void;

  /** Determines whether check icon should be displayed near the selected option label
   * @default true
   */
  withCheckIcon?: boolean;

  /** Position of the check icon relative to the option label
   * @default "left"
   */
  checkIconPosition?: "left" | "right";

  /** Message displayed when no option matched current search query, only applicable when `searchable` prop is set */
  nothingFoundMessage?: React.ReactNode;

  /** Determines whether the clear button should be displayed in the right section when the component has value
   * @default false
   */
  clearable?: boolean;

  /** Props passed down to the clear button */
  clearButtonProps?: ComboboxClearButtonProps;

  /** Props passed down to the hidden input */
  hiddenInputProps?: Omit<React.ComponentPropsWithoutRef<"input">, "value">;

  /** Divider used to separate values in the hidden input `value` attribute
   * @default ","
   */
  hiddenInputValuesDivider?: string;

  /** A function to render content of the option, replaces the default content of the option */
  renderOption?: (
    item: ComboboxLikeRenderOptionInput<ComboboxItem>
  ) => React.ReactNode;

  autoComplete?: string;

  /** Called with `value` of the removed item */
  onRemove?: (value: string) => void;

  /** Maximum number of values
   * @default Infinity
   */
  maxValues?: number;
  /** Determines whether picked options should be removed from the options list
   * @default false
   */
  hidePickedOptions?: boolean;
}

export const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(
  (props, ref) => {
    const {
      className,
      style,
      size = "sm",
      value,
      defaultValue,
      onChange,
      onKeyDown,
      data,
      dropdownOpened,
      defaultDropdownOpened,
      onDropdownOpen,
      onDropdownClose,
      selectFirstOptionOnChange,
      onOptionSubmit,
      comboboxProps,
      filter,
      limit,
      withScrollArea,
      maxDropdownHeight,
      searchValue,
      defaultSearchValue,
      onSearchChange,
      readOnly,
      disabled,
      onFocus,
      onBlur,
      onPaste,
      rightSection,
      leftSection,
      label,
      error,
      maxValues = Infinity,
      searchable,
      nothingFoundMessage,
      withCheckIcon = true,
      checkIconPosition = "left",
      hidePickedOptions,
      name,
      form,
      id,
      clearable,
      clearButtonProps,
      hiddenInputProps,
      placeholder,
      hiddenInputValuesDivider = ",",
      required,
      renderOption,
      onRemove,
      onClear,
      autoComplete = "off",
      ...others
    } = props;

    const _id = useId(id);
    const parsedData = getParsedComboboxData(data);
    const optionsLockup = getOptionsLockup(parsedData);

    const combobox = useCombobox({
      opened: dropdownOpened,
      defaultOpened: defaultDropdownOpened,
      onDropdownOpen,
      onDropdownClose: () => {
        onDropdownClose?.();
        combobox.resetSelectedOption();
      },
    });

    const [_value, setValue] = useUncontrolled({
      value,
      defaultValue,
      finalValue: [],
      onChange,
    });

    const [_searchValue, setSearchValue] = useUncontrolled({
      value: searchValue,
      defaultValue: defaultSearchValue,
      finalValue: "",
      onChange: onSearchChange,
    });

    const handleInputKeydown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      onKeyDown?.(event);

      if (event.key === " " && !searchable) {
        event.preventDefault();
        combobox.toggleDropdown();
      }

      if (
        event.key === "Backspace" &&
        _searchValue.length === 0 &&
        _value.length > 0
      ) {
        onRemove?.(_value[_value.length - 1]);
        setValue(_value.slice(0, _value.length - 1));
      }
    };

    const values = _value.map((item, index) => (
      <Chip
        key={`${item}-${index}`}
        size="small"
        onDelete={
          !readOnly && !optionsLockup[item]?.disabled
            ? () => {
                setValue(_value.filter((i) => item !== i));
                onRemove?.(item);
              }
            : undefined
        }
        label={optionsLockup[item]?.label || item}
      />
    ));

    useEffect(() => {
      if (selectFirstOptionOnChange) {
        combobox.selectFirstOption();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectFirstOptionOnChange, _value]);

    const clearButton = clearable &&
      _value.length > 0 &&
      !disabled &&
      !readOnly && (
        <Combobox.ClearButton
          {...clearButtonProps}
          onClear={() => {
            onClear?.();
            setValue([]);
            setSearchValue("");
          }}
        />
      );

    const filteredData = filterPickedValues({
      data: parsedData,
      value: _value,
    });

    return (
      <>
        <Combobox
          store={combobox}
          size={size}
          readOnly={readOnly}
          onOptionSubmit={(val) => {
            onOptionSubmit?.(val);
            setSearchValue("");
            combobox.updateSelectedOptionIndex("selected");

            if (_value.includes(optionsLockup[val].value)) {
              setValue(_value.filter((v) => v !== optionsLockup[val].value));
              onRemove?.(optionsLockup[val].value);
            } else if (_value.length < maxValues!) {
              setValue([..._value, optionsLockup[val].value]);
            }
          }}
          {...comboboxProps}
        >
          <Combobox.DropdownTarget>
            <ChipsInput
              size={size}
              className={className}
              style={style}
              disabled={disabled}
              rightSection={
                rightSection ||
                clearButton || <Combobox.Chevron size={size} error={error} />
              }
              rightSectionPointerEvents={clearButton ? "auto" : undefined}
              rightSectionWidth="32px"
              leftSection={leftSection}
              label={label}
              error={error}
              multiline
              slots={{
                input: !searchable ? "cursor-pointer" : undefined,
              }}
              pointer={!searchable}
              onClick={() =>
                searchable ? combobox.openDropdown() : combobox.toggleDropdown()
              }
              data-expanded={combobox.dropdownOpened || undefined}
              id={_id}
              required={required}
            >
              <Chip.Group disabled={disabled}>
                {values}
                <Combobox.EventsTarget autoComplete={autoComplete}>
                  <ChipsInput.Field
                    {...others}
                    ref={ref}
                    id={_id}
                    placeholder={placeholder}
                    type={!searchable && !placeholder ? "hidden" : "visible"}
                    onFocus={(event) => {
                      onFocus?.(event);
                      searchable && combobox.openDropdown();
                    }}
                    onBlur={(event) => {
                      onBlur?.(event);
                      combobox.closeDropdown();
                      setSearchValue("");
                    }}
                    onKeyDown={handleInputKeydown}
                    value={_searchValue}
                    onChange={(event) => {
                      setSearchValue(event.currentTarget.value);
                      searchable && combobox.openDropdown();
                      selectFirstOptionOnChange && combobox.selectFirstOption();
                    }}
                    disabled={disabled}
                    readOnly={readOnly || !searchable}
                    pointer={!searchable}
                  />
                </Combobox.EventsTarget>
              </Chip.Group>
            </ChipsInput>
          </Combobox.DropdownTarget>

          <OptionsDropdown
            data={hidePickedOptions ? filteredData : parsedData}
            hidden={readOnly || disabled}
            filter={filter}
            search={_searchValue}
            limit={limit}
            hiddenWhenEmpty={
              !searchable ||
              !nothingFoundMessage ||
              (hidePickedOptions &&
                filteredData.length === 0 &&
                _searchValue.trim().length === 0)
            }
            maxDropdownHeight={maxDropdownHeight}
            filterOptions={searchable}
            value={_value}
            checkIconPosition={checkIconPosition}
            withCheckIcon={withCheckIcon}
            nothingFoundMessage={nothingFoundMessage}
            labelId={`${_id}-label`}
            renderOption={renderOption}
          />
        </Combobox>
        <Combobox.HiddenInput
          name={name}
          valuesDivider={hiddenInputValuesDivider}
          value={_value}
          form={form}
          disabled={disabled}
          {...hiddenInputProps}
        />
      </>
    );
  }
);

MultiSelect.displayName = "@rtdui/core/MultiSelect";
