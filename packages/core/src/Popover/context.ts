import { PortalProps } from "../Portal";
import type { TransitionProps } from "../Transition";
import type { ThemeColor, ThemeRadius, ThemeShadow } from "../theme.types";
import { createSafeContext } from "../utils";
import type {
  PopoverWidth,
  ArrowPosition,
  FloatingPosition,
} from "./Popover.types";

interface PopoverContext {
  /** disabled will not dropdown */
  disabled?: boolean;
  zIndex?: string | number;
  radius?: ThemeRadius;
  shadow?: ThemeShadow;
  withinPortal?: boolean;
  portalProps?: Omit<PortalProps, "children">;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  /**
   * close dropdown
   */
  close?: () => void;
  /**
   * toggle dropdown
   */
  toggle: () => void;
  getDropdownId: () => string;
  getTargetId: () => string;
  controlled: boolean;
  withRoles?: boolean;
  targetProps: Record<string, any>;
  transitionProps?: Omit<TransitionProps, "children">;
  returnFocus?: boolean;
  keepMounted?: boolean;
  /**
   * dropdown and arrow background color
   */
  dropdownColor?: ThemeColor;
  /* --floating-- */
  reference: (node: HTMLElement) => void;
  floating: (node: HTMLElement) => void;
  opened: boolean;
  width?: PopoverWidth;
  x: number;
  y: number;
  placement: FloatingPosition;
  withArrow?: boolean;
  arrowX?: number;
  arrowY?: number;
  arrowRef: React.RefObject<HTMLDivElement>;
  arrowSize: number;
  arrowOffset: number;
  arrowRadius: number;
  arrowPosition: ArrowPosition;
}

export const [PopoverContextProvider, usePopoverContext] =
  createSafeContext<PopoverContext>(
    "Popover context was not found in the tree"
  );
