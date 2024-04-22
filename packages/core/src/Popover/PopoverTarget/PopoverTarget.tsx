import { cloneElement, forwardRef, isValidElement } from "react";
import clsx from "clsx";
import { useMergedRef } from "@rtdui/hooks";
import { usePopoverContext } from "../context";

export interface PopoverTargetProps {
  /** Target element */
  children: React.ReactNode;

  /** Key of the prop that should be used to access element ref */
  refProp?: string;

  /** Popup accessible type
   * @default "dialog"
   */
  popupType?: string;

  [key: string]: any;
}

export const PopoverTarget = forwardRef<HTMLDivElement, PopoverTargetProps>(
  (props, ref) => {
    const {
      children,
      refProp = "ref",
      popupType = "dialog",
      ...others
    } = props;
    if (!isValidElement(children)) {
      throw new Error(
        "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
      );
    }

    const forwardedProps: any = others;
    const ctx = usePopoverContext();
    const targetRef = useMergedRef(ctx.reference, (children as any).ref, ref);

    const accessibleProps = ctx.withRoles
      ? {
          "aria-haspopup": popupType,
          "aria-expanded": ctx.opened,
          "aria-controls": ctx.getDropdownId(),
          id: ctx.getTargetId(),
        }
      : {};

    return cloneElement(children, {
      ...forwardedProps,
      ...accessibleProps,
      ...ctx.targetProps,
      className: clsx(
        ctx.targetProps.className,
        forwardedProps.className,
        children.props.className
      ),
      [refProp!]: targetRef,
      ...(!ctx.controlled ? { onClick: ctx.toggle } : null),
    });
  }
);

PopoverTarget.displayName = "@rtdui/core/PopoverTarget";
