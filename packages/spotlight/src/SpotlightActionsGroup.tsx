import React from "react";
import { useSpotlightContext } from "./Spotlight.context";

export type SpotlightActionsGroupStylesNames = "actionsGroup";

export interface SpotlightActionsGroupProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /** `Spotlight.Action` components */
  children?: React.ReactNode;

  /** Group label */
  label?: React.ReactNode;
}

const defaultProps: Partial<SpotlightActionsGroupProps> = {};

export const SpotlightActionsGroup = React.forwardRef<
  HTMLDivElement,
  SpotlightActionsGroupProps
>((props, ref) => {
  const { className, style, label, children, ...others } = props;
  const ctx = useSpotlightContext();

  return (
    <div ref={ref} {...others}>
      {children}
    </div>
  );
});
