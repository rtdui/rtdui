import { forwardRef } from "react";
import clsx from "clsx";
import { IconSelector, type Icon, type IconProps } from "@tabler/icons-react";
import { ThemeSize } from "../../theme.types";

function getIconSize(size: ThemeSize) {
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
  size?: ThemeSize;
}

export const ComboboxChevron = forwardRef<Icon, ComboboxChevronProps>(
  (props, ref) => {
    const { error = null, size = "20", className, ...others } = props;
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
);

ComboboxChevron.displayName = "@rtdui/core/ComboboxChevron";
