import React from "react";
import { usePopover, type UsePopoverOptions } from "./usePopover";
import { PopoverProvider } from "./Popover.context";
import { PopoverTrigger } from "./Trigger";
import { PopoverDropdown } from "./Dropdown";

export interface PopoverProps extends UsePopoverOptions {
  children?: React.ReactNode;
}
export function Popover(props: PopoverProps) {
  const { children, focusTrap = false, ...other } = props;
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ focusTrap, ...other });

  return <PopoverProvider value={popover}>{children}</PopoverProvider>;
}

Popover.Trigger = PopoverTrigger;
Popover.Dropdown = PopoverDropdown;
