import { useSpotlightContext } from "./Spotlight.context";

export type SpotlightFooterStylesNames = "footer";

export interface SpotlightFooterProps extends React.ComponentProps<"div"> {}

export function SpotlightFooter(props: SpotlightFooterProps) {
  const { ref, className, style, ...others } = props;
  const ctx = useSpotlightContext();
  return <div ref={ref} {...others} />;
}
