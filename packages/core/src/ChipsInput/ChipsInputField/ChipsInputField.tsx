import { forwardRef } from "react";
import clsx from "clsx";
import { useMergedRef } from "@rtdui/hooks";
import { useChipsInputContext } from "../context";

export interface ChipsInputFieldProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "type"> {
  /** Controls input styles when focused. If `auto` the input is hidden when not focused. If `visible` the input will always remain visible
   * @default "visible"
   */
  type?: "auto" | "visible" | "hidden";

  /** If set, cursor is changed to pointer */
  pointer?: boolean;
}

export const ChipsInputField = forwardRef<
  HTMLInputElement,
  ChipsInputFieldProps
>((props, ref) => {
  const { className, type = "visible", disabled, pointer, ...others } = props;
  const ctx = useChipsInputContext();

  const _disabled = disabled || ctx?.disabled;

  return (
    <input
      ref={useMergedRef(ref, ctx?.fieldRef)}
      type="text"
      data-type={type}
      disabled={_disabled}
      data-disabled={_disabled}
      data-pointer={pointer}
      {...others}
      className={clsx(
        "chip-input-field",
        "text-xs",
        {
          "absolute left-0 top-0 h-px w-px opacity-0 pointer-events-none":
            type === "hidden" || type === "auto",
          "focus:static focus:h-4 focus:opacity-100": type === "auto",
        },
        className
      )}
      aria-invalid={ctx?.hasError}
      onMouseDown={(event) => !pointer && event.stopPropagation()}
    />
  );
});

ChipsInputField.displayName = "@rtdui/core/ChipsInputField";
