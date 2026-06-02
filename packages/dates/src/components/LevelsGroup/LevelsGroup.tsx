import clsx from "clsx";
import type { ThemeSize } from "@rtdui/core";

export interface LevelsGroupProps extends React.ComponentProps<"div"> {
  size?: ThemeSize;
}

export function LevelsGroup(props: LevelsGroupProps) {
  const { ref, className, style, ...others } = props;

  return (
    <div
      ref={ref}
      {...others}
      className={clsx(
        "levels-group",
        "flex gap-4 bg-base-100 max-w-fit p-4",
        className,
      )}
    />
  );
}
