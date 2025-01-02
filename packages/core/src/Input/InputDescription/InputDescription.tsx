import { forwardRef } from "react";
import clsx from "clsx";
import { useInputWrapperContext } from "../context";
import { ThemeSize } from "../../theme.types";
import { getSize } from "../../utils";

export interface InputDescriptionProps
	extends React.ComponentPropsWithoutRef<"p"> {
	/** Controls description `font-size`
	 * @default "xs"
	 */
	size?: ThemeSize;
}

export const InputDescription = forwardRef<
	HTMLParagraphElement,
	InputDescriptionProps
>((props, ref) => {
	const { className, style, size = "xs", ...others } = props;

	return (
		<p
			ref={ref}
			className={clsx(
				"input-description",
				"text-[length:--input-font-size]",
				className,
			)}
			style={
				{
					...style,
					"--input-font-size": getSize(size, "theme-font-size"),
				} as any
			}
			{...others}
		/>
	);
});

InputDescription.displayName = "@rtdui/core/InputDescription";
