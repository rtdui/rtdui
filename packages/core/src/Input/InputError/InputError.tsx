import { forwardRef } from "react";
import clsx from "clsx";
import { useInputWrapperContext } from "../context";
import type { ThemeSize } from "../../theme.types";
import { getSize } from "../../utils";

export interface InputErrorProps extends React.ComponentPropsWithoutRef<"p"> {
	/** Controls error `font-size`
	 * @default "xs"
	 */
	size?: ThemeSize;
}

export const InputError = forwardRef<HTMLParagraphElement, InputErrorProps>(
	(props, ref) => {
		const { className, style, size = "xs", ...others } = props;
		return (
			<p
				ref={ref}
				className={clsx(
					"input-error",
					"text-(length:--input-font-size)",
					"text-error",
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
	},
);

InputError.displayName = "@rtdui/core/InputError";
