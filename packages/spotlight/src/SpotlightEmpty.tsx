import { useSpotlightContext } from "./Spotlight.context";

export interface SpotlightEmptyProps extends React.ComponentProps<"div"> {}

export function SpotlightEmpty(props: SpotlightEmptyProps) {
  const { ref, className, style, ...others } = props;

  const ctx = useSpotlightContext();

  return <div ref={ref} {...others} />;
}
