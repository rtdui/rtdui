import clsx from "clsx";
import type { ButtonProps } from "../../Button";
import type { ThemeSize } from "../../theme.types";
import { CloseButton } from "../../CloseButton";

export interface ComboboxClearButtonProps extends Omit<ButtonProps, "size"> {
  onClear: () => void;
  size?: ThemeSize;
}

export function ComboboxClearButton(props: ComboboxClearButtonProps) {
  const {
    ref,
    size = "sm",
    onMouseDown,
    onClick,
    onClear,
    className,
    style,
    ...others
  } = props;
  return (
    <CloseButton
      ref={ref}
      size="xs"
      {...others}
      tabIndex={-1}
      aria-hidden
      onMouseDown={(event) => {
        event.preventDefault();
        onMouseDown?.(event);
      }}
      onClick={(event) => {
        onClear();
        onClick?.(event);
      }}
    />
  );
}
