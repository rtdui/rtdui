import { forwardRef } from "react";
import { useSpotlightContext } from "./Spotlight.context";

export type SpotlightFooterStylesNames = "footer";

export interface SpotlightFooterProps
  extends React.ComponentPropsWithoutRef<"div"> {}

const defaultProps: Partial<SpotlightFooterProps> = {};

export const SpotlightFooter = forwardRef<HTMLDivElement, SpotlightFooterProps>(
  (props, ref) => {
    const { className, style, ...others } = props;
    const ctx = useSpotlightContext();
    return <div ref={ref} {...others} />;
  }
);

SpotlightFooter.displayName = "@rtdui/SpotlightFooter";
