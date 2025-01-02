import { forwardRef } from "react";
import clsx from "clsx";

export interface InputPlaceholderProps
	extends React.ComponentPropsWithoutRef<"span"> {
	/** If set, the placeholder will have error styles
	 * @default false
	 */
	error?: React.ReactNode;
}

/** 
 * InputPlaceholder组件用于给不支持placeholder特性的元素(如button)附加占位符
 * @example
   <Input component="button" pointer>
     <Input.Placeholder>Placeholder content</Input.Placeholder>
   </Input>
 */
export const InputPlaceholder = forwardRef<
	HTMLSpanElement,
	InputPlaceholderProps
>((props, ref) => {
	const { className, style, error, ...others } = props;

	return (
		<span
			className={clsx("input-placeholder", "opacity-50", className)}
			data-error={error}
			ref={ref}
			{...others}
		/>
	);
});

InputPlaceholder.displayName = "@rtdui/core/InputPlaceholder";
