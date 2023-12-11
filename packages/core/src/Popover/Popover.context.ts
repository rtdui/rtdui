import { createSafeContext } from "../utils";
import { usePopover } from "./usePopover";

export type PopoverContextValue = ReturnType<typeof usePopover>;

export const [PopoverProvider, usePopoverContext] =
  createSafeContext<PopoverContextValue>(
    "Popover Context was not found in tree"
  );
