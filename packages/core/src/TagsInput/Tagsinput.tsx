import { forwardRef } from "react";
import { useId, useUncontrolled } from "@rtdui/hooks";
import {
  Combobox,
  ComboboxClearButtonProps,
  ComboboxLikeProps,
  ComboboxLikeRenderOptionInput,
  ComboboxStringData,
  ComboboxStringItem,
  getOptionsLockup,
  getParsedComboboxData,
  OptionsDropdown,
  useCombobox,
} from "../Combobox";
import { InputBaseOwnProps } from "../InputBase";
import { Chip } from "../Chip";
import { ChipsInput } from "../ChipsInput";
import { filterPickedTags } from "./filter-picked-tags";
import { getSplittedTags } from "./get-splitted-tags";

export interface TagsInputProps
  extends InputBaseOwnProps,
    Omit<ComboboxLikeProps, "data">,
    Omit<
      React.ComponentPropsWithoutRef<"input">,
      "size" | "value" | "defaultValue" | "onChange"
    > {
  /** Data displayed in the dropdown */
  data?: ComboboxStringData;

  /** Controlled component value */
  value?: string[];

  /** Default value for uncontrolled component */
  defaultValue?: string[];

  /** Called whe value changes */
  onChange?: (value: string[]) => void;

  /** Called when tag is removed */
  onRemove?: (value: string) => void;

  /** Called whe the clear button is clicked */
  onClear?: () => void;

  /** Controlled search value */
  searchValue?: string;

  /** Default search value */
  defaultSearchValue?: string;

  /** Called when search changes */
  onSearchChange?: (value: string) => void;

  /** Maximum number of tags
   * @default Infinity
   */
  maxTags?: number;

  /** Determines whether duplicate tags are allowed
   * @default false
   */
  allowDuplicates?: boolean;

  /** Called when user tries to submit a duplicated tag */
  onDuplicate?: (value: string) => void;

  /** Characters that should trigger tags split
   * @default[',']
   */
  splitChars?: string[];

  /** Determines whether the clear button should be displayed in the right section when the component has value
   * @default false
   */
  clearable?: boolean;

  /** Props passed down to the clear button */
  clearButtonProps?: ComboboxClearButtonProps;

  /** Props passed down to the hidden input */
  hiddenInputProps?: Omit<React.ComponentPropsWithoutRef<"input">, "value">;

  /** Divider used to separate values in the hidden input `value` attribute, `','` by default
   * @default ","
   */
  hiddenInputValuesDivider?: string;

  /** A function to render content of the option, replaces the default content of the option */
  renderOption?: (
    input: ComboboxLikeRenderOptionInput<ComboboxStringItem>
  ) => React.ReactNode;
}

export const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
  (props, ref) => {
    const {
      className,
      style,
      size,
      value,
      defaultValue,
      onChange,
      onKeyDown,
      maxTags = Infinity,
      allowDuplicates = false,
      onDuplicate,
      variant,
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
      splitChars = [","],
      onFocus,
      onBlur,
      onPaste,
      radius,
      rightSection,
      rightSectionWidth,
      rightSectionPointerEvents,
      leftSection,
      leftSectionWidth,
      leftSectionPointerEvents,
      inputContainer,
      inputWrapperOrder,
      withAsterisk,
      required,
      labelProps,
      descriptionProps,
      errorProps,
      wrapperProps,
      description,
      label,
      error,
      withErrorStyles,
      name,
      form,
      id,
      autoComplete,
      type,
      clearable,
      clearButtonProps,
      hiddenInputProps,
      hiddenInputValuesDivider = ",",
      renderOption,
      onRemove,
      onClear,
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

      const inputValue = _searchValue.trim();
      const { length } = inputValue;

      if (splitChars!.includes(event.key) && length > 0) {
        setValue(
          getSplittedTags({
            splitChars,
            allowDuplicates,
            maxTags,
            value: _searchValue,
            currentTags: _value,
          })
        );
        setSearchValue("");
        event.preventDefault();
      }

      if (
        event.key === "Enter" &&
        length > 0 &&
        !event.nativeEvent.isComposing
      ) {
        event.preventDefault();
        const isDuplicate = _value.some(
          (tag) => tag.toLowerCase() === inputValue.toLowerCase()
        );

        if (isDuplicate) {
          onDuplicate?.(inputValue);
        }

        if (
          (!isDuplicate || (isDuplicate && allowDuplicates)) &&
          _value.length < maxTags!
        ) {
          onOptionSubmit?.(inputValue);
          setSearchValue("");

          if (inputValue.length > 0) {
            setValue([..._value, inputValue]);
          }
        }
      }

      if (
        event.key === "Backspace" &&
        length === 0 &&
        _value.length > 0 &&
        !event.nativeEvent.isComposing
      ) {
        onRemove?.(_value[_value.length - 1]);
        setValue(_value.slice(0, _value.length - 1));
      }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      onPaste?.(event);
      event.preventDefault();

      if (event.clipboardData) {
        const pastedText = event.clipboardData.getData("text/plain");
        setValue(
          getSplittedTags({
            splitChars,
            allowDuplicates,
            maxTags,
            value: pastedText,
            currentTags: _value,
          })
        );
        setSearchValue("");
      }
    };

    const values = _value.map((item, index) => (
      <Chip
        size="small"
        key={`${item}-${index}`}
        onDelete={
          !readOnly
            ? () => {
                setValue(_value.filter((i) => item !== i));
                onRemove?.(item);
              }
            : undefined
        }
        label={item}
        disabled={disabled}
      />
    ));

    const clearButton = clearable &&
      _value.length > 0 &&
      !disabled &&
      !readOnly && (
        <Combobox.ClearButton
          size={size as string}
          {...clearButtonProps}
          onClear={() => {
            setValue([]);
            setSearchValue("");
            onClear?.();
          }}
        />
      );

    return (
      <>
        <Combobox
          store={combobox}
          size={size}
          readOnly={readOnly}
          onOptionSubmit={(val) => {
            onOptionSubmit?.(val);
            setSearchValue("");
            _value.length < maxTags! &&
              setValue([..._value, optionsLockup[val].label]);
          }}
          {...comboboxProps}
        >
          <Combobox.DropdownTarget>
            <ChipsInput
              size={size}
              className={className}
              style={style}
              variant={variant}
              disabled={disabled}
              radius={radius}
              rightSection={rightSection || clearButton}
              rightSectionWidth={rightSectionWidth}
              rightSectionPointerEvents={
                clearButton ? "auto" : rightSectionPointerEvents
              }
              leftSection={leftSection}
              leftSectionWidth={leftSectionWidth}
              leftSectionPointerEvents={leftSectionPointerEvents}
              inputContainer={inputContainer}
              inputWrapperOrder={inputWrapperOrder}
              withAsterisk={withAsterisk}
              required={required}
              labelProps={labelProps}
              descriptionProps={descriptionProps}
              errorProps={errorProps}
              wrapperProps={wrapperProps}
              description={description}
              label={label}
              error={error}
              multiline
              withErrorStyles={withErrorStyles}
              id={_id}
            >
              <Chip.Group disabled={disabled}>
                {values}
                <Combobox.EventsTarget autoComplete={autoComplete}>
                  <ChipsInput.Field
                    {...others}
                    ref={ref}
                    onKeyDown={handleInputKeydown}
                    onFocus={(event) => {
                      onFocus?.(event);
                      combobox.openDropdown();
                    }}
                    onBlur={(event) => {
                      onBlur?.(event);
                      combobox.closeDropdown();
                    }}
                    onPaste={handlePaste}
                    value={_searchValue}
                    onChange={(event) =>
                      setSearchValue(event.currentTarget.value)
                    }
                    required={required && _value.length === 0}
                    disabled={disabled}
                    readOnly={readOnly}
                    id={_id}
                  />
                </Combobox.EventsTarget>
              </Chip.Group>
            </ChipsInput>
          </Combobox.DropdownTarget>

          <OptionsDropdown
            data={filterPickedTags({ data: parsedData, value: _value })}
            hidden={readOnly || disabled}
            filter={filter}
            search={_searchValue}
            limit={limit}
            hiddenWhenEmpty
            maxDropdownHeight={maxDropdownHeight}
            labelId={`${_id}-label`}
            renderOption={renderOption}
          />
        </Combobox>
        <Combobox.HiddenInput
          name={name}
          form={form}
          value={_value}
          valuesDivider={hiddenInputValuesDivider}
          disabled={disabled}
          {...hiddenInputProps}
        />
      </>
    );
  }
);

TagsInput.displayName = "@rtdui/core/TagsInput";
