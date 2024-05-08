import { forwardRef } from "react";
import clsx from "clsx";
import { IconX, TablerIconsProps } from "@tabler/icons-react";
import { ThemeBaseSize } from "../theme.types";

export interface CloseButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  /**
   * @default "sm"
   */
  size?: ThemeBaseSize;
  /**
   * @default{size:"sm"}
   */
  iconProps?: TablerIconsProps;
  /**
   * @default "circle"
   */
  sharp?: "square" | "circle";
}

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  (props, ref) => {
    const {
      size = "sm",
      iconProps = { size: props.size },
      sharp = "circle",
      className,
      style,
      ...others
    } = props;
    const getIconSize = (size?: string | number) => {
      switch (size) {
        case "xs":
          return 16;
        case "sm":
          return 20;
        case "md":
          return 24;
        case "lg":
          return 30;
        default:
          return size ?? 24;
      }
    };
    return (
      <button
        ref={ref}
        type="button"
        {...others}
        className={clsx(
          "close-btn",
          "btn btn-ghost",
          {
            "btn-xs": size === "xs",
            "btn-sm": size === "sm",
            "btn-md": size === "md",
            "btn-lg": size === "lg",
            "btn-square": sharp === "square",
            "btn-circle": sharp === "circle",
          },
          className
        )}
      >
        <IconX {...iconProps} size={getIconSize(iconProps.size)} />
      </button>
    );
  }
);

CloseButton.displayName = "@rtdui/core/CloseButton";
