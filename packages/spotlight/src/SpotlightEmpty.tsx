import React from "react";

import { useSpotlightContext } from "./Spotlight.context";

export interface SpotlightEmptyProps
  extends React.ComponentPropsWithoutRef<"div"> {}

const defaultProps: Partial<SpotlightEmptyProps> = {};

export const SpotlightEmpty = React.forwardRef<
  HTMLDivElement,
  SpotlightEmptyProps
>((props, ref) => {
  const { className, style, ...others } = props;

  const ctx = useSpotlightContext();

  return <div ref={ref} {...others} />;
});
