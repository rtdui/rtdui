import React from "react";
import clsx from "clsx";
import { IconCheck } from "@tabler/icons-react";
import { Combobox } from "../Combobox";
import {
	ComboboxItem,
	ComboboxLikeRenderOptionInput,
	ComboboxParsedItem,
} from "../Combobox.types";
import {
	defaultOptionsFilter,
	FilterOptionsInput,
} from "./default-options-filter";
import { isEmptyComboboxData } from "./is-empty-combobox-data";
import { isOptionsGroup } from "./is-options-group";
import { validateOptions } from "./validate-options";

export type OptionsFilter = (input: FilterOptionsInput) => ComboboxParsedItem[];

export interface OptionsGroup {
	group: string;
	items: ComboboxItem[];
}

export type OptionsData = (ComboboxItem | OptionsGroup)[];

interface OptionProps {
	data: ComboboxItem | OptionsGroup;
	withCheckIcon?: boolean;
	value?: string | string[] | null;
	checkIconPosition?: "left" | "right";
	renderOption?: (input: ComboboxLikeRenderOptionInput<any>) => React.ReactNode;
}

function isValueChecked(
	value: string | string[] | undefined | null,
	optionValue: string,
) {
	return Array.isArray(value)
		? value.includes(optionValue)
		: value === optionValue;
}

function Option({
	data,
	withCheckIcon,
	value,
	checkIconPosition,
	renderOption,
}: OptionProps) {
	if (!isOptionsGroup(data)) {
		const checked = isValueChecked(value, data.value);
		const check = withCheckIcon && checked && (
			<IconCheck size={18} stroke={2.5} className="inline-block opacity-75" />
		);

		const defaultContent = (
			<>
				{checkIconPosition === "left" && check}
				<span>{data.label}</span>
				{checkIconPosition === "right" && check}
			</>
		);

		return (
			<Combobox.Option
				value={data.value}
				disabled={data.disabled}
				className={clsx("options-dropdown-option", "flex items-center gap-2", {
					"[&]:justify-between": checkIconPosition === "right",
				})}
				data-reverse={checkIconPosition === "right" || undefined}
				data-checked={checked || undefined}
				aria-selected={checked}
				active={checked}
			>
				{typeof renderOption === "function"
					? renderOption({ option: data, checked })
					: defaultContent}
			</Combobox.Option>
		);
	}

	const options = data.items.map((item) => (
		<Option
			data={item}
			value={value}
			key={item.value}
			withCheckIcon={withCheckIcon}
			checkIconPosition={checkIconPosition}
			renderOption={renderOption}
		/>
	));

	return <Combobox.Group label={data.group}>{options}</Combobox.Group>;
}

export interface OptionsDropdownProps {
	data: OptionsData;
	filter: OptionsFilter | undefined;
	search: string | undefined;
	limit: number | undefined;
	maxDropdownHeight: number | string | undefined;
	hidden?: boolean;
	hiddenWhenEmpty?: boolean;
	filterOptions?: boolean;
	withCheckIcon?: boolean;
	value?: string | string[] | null;
	checkIconPosition?: "left" | "right";
	nothingFoundMessage?: React.ReactNode;
	labelId: string;
	renderOption?: (input: ComboboxLikeRenderOptionInput<any>) => React.ReactNode;
}

export function OptionsDropdown({
	data,
	hidden,
	hiddenWhenEmpty,
	filter,
	search,
	limit,
	maxDropdownHeight,
	filterOptions = true,
	withCheckIcon = false,
	value,
	checkIconPosition,
	nothingFoundMessage,
	labelId,
	renderOption,
}: OptionsDropdownProps) {
	validateOptions(data);

	const shouldFilter = typeof search === "string";
	const filteredData = shouldFilter
		? (filter || defaultOptionsFilter)({
				options: data,
				search: filterOptions ? search : "",
				limit: limit ?? Number.POSITIVE_INFINITY,
			})
		: data;
	const isEmpty = isEmptyComboboxData(filteredData);

	const options = filteredData.map((item) => (
		<Option
			data={item}
			key={isOptionsGroup(item) ? item.group : item.value}
			withCheckIcon={withCheckIcon}
			value={value}
			checkIconPosition={checkIconPosition}
			renderOption={renderOption}
		/>
	));

	return (
		<Combobox.Dropdown hidden={hidden || (hiddenWhenEmpty && isEmpty)}>
			<Combobox.Options labelledBy={labelId}>
				<div
					className={clsx("overflow-auto", "flex flex-col gap-px")}
					style={{ maxHeight: maxDropdownHeight ?? 220 }}
				>
					{options}
				</div>
				{isEmpty && nothingFoundMessage && (
					<Combobox.Empty>{nothingFoundMessage}</Combobox.Empty>
				)}
			</Combobox.Options>
		</Combobox.Dropdown>
	);
}
