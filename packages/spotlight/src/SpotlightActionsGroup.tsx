import clsx from "clsx";
import { useSpotlightContext } from "./Spotlight.context";

export type SpotlightActionsGroupStylesNames = "actionsGroup";

export interface SpotlightActionsGroupProps
  extends React.ComponentProps<"div"> {
  /** `Spotlight.Action` components */
  children?: React.ReactNode;

  /** Group label */
  label?: React.ReactNode;
}

export function SpotlightActionsGroup(props: SpotlightActionsGroupProps) {
  const { ref, className, style, label, children, ...others } = props;
  const ctx = useSpotlightContext();

  return (
    <div
      ref={ref}
      className={clsx(
        "before:content-(--spotlight-group-label) before:text-gray-400 before:text-sm",
        className,
      )}
      {...others}
      style={{ ...style, "--spotlight-group-label": `'${label}'` } as any}
    >
      {children}
    </div>
  );
}
