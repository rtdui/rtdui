import { forwardRef, isValidElement } from "react";
import { Popover } from "../../Popover";
import { useComboboxContext } from "../context";

export interface ComboboxDropdownTargetProps {
  /** Target element */
  children: React.ReactNode;

  /** Key of the prop that should be used to access element ref */
  refProp?: string;
}

export const ComboboxDropdownTarget = forwardRef<
  HTMLDivElement,
  ComboboxDropdownTargetProps
>((props, ref) => {
  const { children, refProp = "ref" } = props;
  useComboboxContext();

  if (!isValidElement(children)) {
    throw new Error(
      "Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }

  return (
    <Popover.Target ref={ref} refProp={refProp}>
      {children}
    </Popover.Target>
  );
});

ComboboxDropdownTarget.displayName = "@rtdui/core/ComboboxDropdownTarget";
