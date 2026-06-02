import { useEffect } from "react";
import clsx from "clsx";
import { useId } from "@rtdui/hooks";
import { useComboboxContext } from "../context";

export interface ComboboxOptionsProps extends React.ComponentProps<"div"> {
  /** Id of the element that should label the options list */
  labelledBy?: string;
}

export function ComboboxOptions(props: ComboboxOptionsProps) {
  const { ref, className, style, id, onMouseDown, labelledBy, ...others } =
    props;
  const ctx = useComboboxContext();
  const _id = useId(id);

  useEffect(() => {
    ctx.store.setListId(_id);
  }, [_id]);

  return (
    <div
      ref={ref}
      className={clsx("combobox-options", "text-sm", className)}
      {...others}
      id={_id}
      role="listbox"
      aria-labelledby={labelledBy}
      onMouseDown={(event) => {
        event.preventDefault();
        onMouseDown?.(event);
      }}
    />
  );
}
