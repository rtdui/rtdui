import clsx from "clsx";
import { IconSelector, type IconProps } from "@tabler/icons-react";
import type { ThemeSize } from "../../theme.types";

function getIconSize(size: ThemeSize | number) {
  switch (size) {
    case "xs":
      return 14;
    case "sm":
      return 16;
    case "md":
      return 18;
    case "lg":
      return 20;
    case "xl":
      return 22;
    default:
      return size;
  }
}
export interface ComboboxChevronProps extends IconProps {
  error?: React.ReactNode;
  size?: ThemeSize | number;
  ref?: React.Ref<SVGSVGElement>;
}

export function ComboboxChevron(props: ComboboxChevronProps) {
  const { ref, error = null, size = "20", className, ...others } = props;
  const iconSize = getIconSize(size);

  return (
    <IconSelector
      size={iconSize}
      {...others}
      className={clsx("combobox-chevron", "opacity-35", className)}
      data-combobox-chevron
      data-error={error}
      ref={ref}
    />
  );
}
