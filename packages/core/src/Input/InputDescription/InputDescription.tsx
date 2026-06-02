import clsx from "clsx";
import { useInputWrapperContext } from "../context";
import type { ThemeSize } from "../../theme.types";
import { getSize } from "../../utils";

export interface InputDescriptionProps extends React.ComponentProps<"p"> {
  /** Controls description `font-size`
   * @default "xs"
   */
  size?: ThemeSize;
}

export function InputDescription(props: InputDescriptionProps) {
  const { ref, className, style, size = "xs", ...others } = props;

  return (
    <p
      ref={ref}
      className={clsx(
        "input-description",
        "text-(length:--input-font-size)",
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
}
