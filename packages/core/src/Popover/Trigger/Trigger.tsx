import React from "react";
import { useMergeRefs } from "@floating-ui/react";
import { usePopoverContext } from "../Popover.context";

export interface PopoverTriggerProps {
  children: React.ReactNode;
  [key: string]: any;
}
export const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>((props, forwardRef) => {
  const { children, ...other } = props;
  const context = usePopoverContext();
  // const childrenRef = (children as any)?.ref;
  const ref = useMergeRefs([
    context.refs.setReference,
    forwardRef,
    // childrenRef,
  ]);

  // 如果孩子是有效的React元素则使用该孩子元素作为anchor
  if (React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...other,
        ...children.props,
        "data-state": context.open ? "open" : "closed",
      })
    );
  }
  // 否则默认使用button作为anchor
  return (
    <button
      ref={ref}
      type="button"
      className="btn"
      // The user can style the trigger based on the state
      data-popover-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(other)}
    >
      {children}
    </button>
  );
});
