import React, { forwardRef } from "react";
import clsx from "clsx";
import { useId } from "@rtdui/hooks";
import { InputDescription } from "../InputDescription/InputDescription";
import { InputError } from "../InputError/InputError";
import { InputLabel } from "../InputLabel/InputLabel";
import { InputWrapperProvider } from "../context";
import { getInputOffsets } from "./get-input-offsets";
import { ThemeSize } from "../../theme.types";
import { getSize } from "../../utils";

export interface InputWrapperOwnProps {
	/** Contents of `Input.Label` component. If not set, label is not rendered. */
	label?: React.ReactNode;

	/** Contents of `Input.Description` component. If not set, description is not rendered. */
	description?: React.ReactNode;

	/** Contents of `Input.Error` component. If not set, error is not rendered. */
	error?: React.ReactNode;

	/** Adds required attribute to the input and a red asterisk on the right side of label
	 * @default false
	 */
	required?: boolean;

	/** Determines whether the required asterisk should be displayed. Overrides `required` prop. Does not add required attribute to the input.
	 * @default false
	 */
	withAsterisk?: boolean;

	/** Props passed down to the `Input.Label` component */
	labelProps?: Record<string, any>;

	/** Props passed down to the `Input.Description` component */
	descriptionProps?: Record<string, any>;

	/** Props passed down to the `Input.Error` component */
	errorProps?: Record<string, any>;

	/** Input container component
	 * @default(children) => children
	 */
	inputContainer?: (children: React.ReactNode) => React.ReactNode;

	/** Controls order of the elements
	 * @default['label', 'description', 'input', 'error']
	 */
	inputWrapperOrder?: ("label" | "description" | "input" | "error")[];

	/** Static id used as base to generate `aria-` attributes, by default generates random id */
	id?: string;

	/** Controls size of `Input.Label`, `Input.Description` and `Input.Error` components */
	size?: ThemeSize;

	/** `Input.Label` root element
	 * @default "label"
	 */
	labelElement?: "label" | "div";
}
export interface InputWrapperProps
	extends InputWrapperOwnProps,
		React.ComponentPropsWithoutRef<"div"> {}

export const InputWrapper = forwardRef<HTMLDivElement, InputWrapperProps>(
	(props, ref) => {
		const {
			className,
			style,
			size = "sm",
			withAsterisk,
			id,
			required,
			children,
			inputContainer = (children) => children,
			inputWrapperOrder = ["label", "description", "input", "error"],
			label,
			labelProps,
			labelElement = "label",
			description,
			descriptionProps,
			error,
			errorProps,
			...others
		} = props;

		const sharedProps = {
			size,
		};

		const idBase = useId(id);
		const isRequired =
			typeof withAsterisk === "boolean" ? withAsterisk : required;
		const errorId = errorProps?.id || `${idBase}-error`;
		const descriptionId = descriptionProps?.id || `${idBase}-description`;
		const inputId = idBase;
		const hasError = !!error && typeof error !== "boolean";
		const hasDescription = !!description;
		const _describedBy = `${hasError ? errorId : ""} ${hasDescription ? descriptionId : ""}`;
		const describedBy =
			_describedBy.trim().length > 0 ? _describedBy.trim() : undefined;
		const labelId = labelProps?.id || `${idBase}-label`;

		const _label = label && (
			<InputLabel
				key="label"
				labelElement={labelElement}
				id={labelId}
				htmlFor={inputId}
				required={isRequired}
				{...sharedProps}
				{...labelProps}
			>
				{label}
			</InputLabel>
		);

		const _description = hasDescription && (
			<InputDescription
				key="description"
				{...descriptionProps}
				{...sharedProps}
				size={descriptionProps?.size || sharedProps.size}
				id={descriptionProps?.id || descriptionId}
			>
				{description}
			</InputDescription>
		);

		const _input = (
			<React.Fragment key="input">{inputContainer(children)}</React.Fragment>
		);

		const _error = hasError && (
			<InputError
				{...errorProps}
				{...sharedProps}
				size={errorProps?.size || sharedProps.size}
				key="error"
				id={errorProps?.id || errorId}
			>
				{error}
			</InputError>
		);

		const content = inputWrapperOrder!.map((part) => {
			switch (part) {
				case "label":
					return _label;
				case "input":
					return _input;
				case "description":
					return _description;
				case "error":
					return _error;
				default:
					return null;
			}
		});

		return (
			<InputWrapperProvider
				value={{
					describedBy,
					inputId,
					labelId,
					...getInputOffsets(inputWrapperOrder!, { hasDescription, hasError }),
				}}
			>
				<div
					ref={ref}
					data-error={!!error}
					className={clsx("input-wrapper", "flex flex-col gap-0.5", className)}
					style={
						{
							...style,
							"--input-font-size": getSize(size, "theme-font-size"),
						} as any
					}
					{...others}
				>
					{content}
				</div>
			</InputWrapperProvider>
		);
	},
);

InputWrapper.displayName = "@rtdui/core/InputWrapper";
