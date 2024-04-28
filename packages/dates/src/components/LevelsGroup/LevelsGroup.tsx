import { forwardRef } from "react";
import clsx from "clsx";
import { ThemeSize } from "@rtdui/core";

export interface LevelsGroupProps
  extends React.ComponentPropsWithoutRef<"div"> {
  size?: ThemeSize;
}

export const LevelsGroup = forwardRef<HTMLDivElement, LevelsGroupProps>(
  (props, ref) => {
    const { className, style, ...others } = props;

    return (
      <div
        ref={ref}
        {...others}
        className={clsx(
          "levels-group",
          "flex gap-4 bg-base-100 max-w-fit p-4",
          className
        )}
      />
    );
  }
);

LevelsGroup.displayName = "@rtdui/dates/LevelsGroup";
