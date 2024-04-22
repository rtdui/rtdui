import { forwardRef, useEffect, useMemo } from "react";
import { useId, useUncontrolled } from "@rtdui/hooks";
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
import { InputBase, InputBaseOwnProps } from "../InputBase";

export interface SelectProps
  extends ComboboxLikeProps,
    Omit<InputBaseOwnProps, "value" | "defaultValue" | "onChange">,
    Omit<
      React.ComponentPropsWithoutRef<"input">,
      "size" | "value" | "defaultValue" | "onChange"
    > {
  /** Controlled component value */
  value?: string | null;

  /** Uncontrolled component default value */
  defaultValue?: string | null;

  /** Called when value changes */
  onChange?: (value: string | null, option: ComboboxItem) => void;

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

  clearButtonProps?: ComboboxClearButtonProps;

  /** Props passed down to the hidden input */
  hiddenInputProps?: Omit<React.ComponentPropsWithoutRef<"input">, "value">;

  /** A function to render content of the option, replaces the default content of the option */
  renderOption?: (
    item: ComboboxLikeRenderOptionInput<ComboboxItem>
  ) => React.ReactNode;

  /** Determines whether it should be possible to deselect value by clicking on the selected option
   * @default true
   */
  allowDeselect?: boolean;
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(
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
      size = "sm",
      searchable = false,
      rightSection,
      withCheckIcon = true,
      checkIconPosition = "left",
      nothingFoundMessage,
      name,
      form,
      searchValue,
      defaultSearchValue,
      onSearchChange,
      allowDeselect = true,
      error,
      id,
      clearable,
      clearButtonProps,
      hiddenInputProps,
      renderOption,
      onClear,
      autoComplete,
      ...others
    } = props;

    const parsedData = useMemo(() => getParsedComboboxData(data), [data]);
    const optionsLockup = useMemo(
      () => getOptionsLockup(parsedData),
      [parsedData]
    );
    const _id = useId(id);

    const [_value, setValue, controlled] = useUncontrolled({
      value,
      defaultValue,
      finalValue: null,
      onChange,
    });

    const selectedOption =
      typeof _value === "string" ? optionsLockup[_value] : undefined;
    const [search, setSearch] = useUncontrolled({
      value: searchValue,
      defaultValue: defaultSearchValue,
      finalValue: selectedOption ? selectedOption.label : "",
      onChange: onSearchChange,
    });

    const combobox = useCombobox({
      opened: dropdownOpened,
      defaultOpened: defaultDropdownOpened,
      onDropdownOpen: () => {
        onDropdownOpen?.();
        combobox.updateSelectedOptionIndex("active", { scrollIntoView: true });
      },
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

    useEffect(() => {
      if (value === null) {
        setSearch("");
      }

      if (typeof value === "string" && selectedOption) {
        setSearch(selectedOption.label);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, selectedOption]);

    const clearButton = clearable && !!_value && !disabled && !readOnly && (
      <Combobox.ClearButton
        size={size}
        {...clearButtonProps}
        onClear={() => {
          setValue(null, null);
          setSearch("");
          onClear?.();
        }}
      />
    );

    return (
      <>
        <Combobox
          store={combobox}
          readOnly={readOnly}
          onOptionSubmit={(val) => {
            onOptionSubmit?.(val);
            const optionLockup = allowDeselect
              ? optionsLockup[val].value === _value
                ? null
                : optionsLockup[val]
              : optionsLockup[val];

            const nextValue = optionLockup ? optionLockup.value : null;

            setValue(nextValue, optionLockup);
            !controlled &&
              setSearch(
                typeof nextValue === "string" ? optionLockup?.label || "" : ""
              );
            combobox.closeDropdown();
          }}
          size={size}
          {...comboboxProps}
        >
          <Combobox.Target
            targetType={searchable ? "input" : "button"}
            autoComplete={autoComplete}
          >
            <InputBase
              id={_id}
              ref={ref}
              rightSection={
                rightSection ||
                clearButton || <Combobox.Chevron size={size} error={error} />
              }
              rightSectionPointerEvents={clearButton ? "auto" : undefined}
              rightSectionWidth="32px"
              {...others}
              size={size as any}
              disabled={disabled}
              readOnly={readOnly || !searchable}
              value={search}
              onChange={(e: any) => {
                setSearch(e.currentTarget.value);
                combobox.openDropdown();
                selectFirstOptionOnChange && combobox.selectFirstOption();
              }}
              onFocus={(e: any) => {
                searchable && combobox.openDropdown();
                onFocus?.(e);
              }}
              onBlur={(e: any) => {
                searchable && combobox.closeDropdown();
                setSearch(
                  _value != null ? optionsLockup[_value]?.label || "" : ""
                );
                onBlur?.(e);
              }}
              onClick={(e: any) => {
                searchable
                  ? combobox.openDropdown()
                  : combobox.toggleDropdown();
                onClick?.(e);
              }}
              slots={{
                input: !searchable ? "cursor-pointer" : undefined,
              }}
              error={error}
              pointer={!searchable}
            />
          </Combobox.Target>
          <OptionsDropdown
            data={parsedData}
            hidden={readOnly || disabled}
            filter={filter}
            search={search}
            limit={limit}
            hiddenWhenEmpty={!searchable || !nothingFoundMessage}
            maxDropdownHeight={maxDropdownHeight}
            filterOptions={searchable && selectedOption?.label !== search}
            value={_value}
            checkIconPosition={checkIconPosition}
            withCheckIcon={withCheckIcon}
            nothingFoundMessage={nothingFoundMessage}
            labelId={`${_id}-label`}
            renderOption={renderOption}
          />
        </Combobox>
        <Combobox.HiddenInput
          value={_value}
          name={name}
          form={form}
          disabled={disabled}
          {...hiddenInputProps}
        />
      </>
    );
  }
);

Select.displayName = "@rtdui/core/Select";
