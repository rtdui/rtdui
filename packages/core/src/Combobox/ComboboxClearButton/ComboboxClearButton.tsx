import { forwardRef } from "react";
import clsx from "clsx";
import { Button, ButtonProps } from "../../Button";
import { IconX } from "@tabler/icons-react";
import { ThemeSize } from "../../theme.types";
import { getSize } from "../../utils";

export interface ComboboxClearButtonProps extends Omit<ButtonProps, "size"> {
  onClear: () => void;
  size?: ThemeSize;
}

export const ComboboxClearButton = forwardRef<
  HTMLButtonElement,
  ComboboxClearButtonProps
>((props, ref) => {
  const {
    size = "sm",
    onMouseDown,
    onClick,
    onClear,
    className,
    style,
    ...others
  } = props;
  return (
    <Button
      ref={ref}
      {...others}
      ghost
      tabIndex={-1}
      aria-hidden
      className={clsx(
        "min-h-0 p-0 rounded-full",
        "[--button-size-xs:16px]",
        "[--button-size-sm:24px]",
        "[--button-size-md:32px]",
        "[--button-size-lg:48px]",
        "[--button-size-xl:64px]",
        "w-[--button-size] h-[--button-size]",
        className
      )}
      style={{ ...style, "--button-size": getSize(size, "button-size") } as any}
      onMouseDown={(event) => {
        event.preventDefault();
        onMouseDown?.(event);
      }}
      onClick={(event) => {
        onClear();
        onClick?.(event);
      }}
    >
      <IconX size={18} />
    </Button>
  );
});

ComboboxClearButton.displayName = "@rtdui/core/ComboboxClearButton";
