import { forwardRef } from "react";
import clsx from "clsx";

export interface DividerProps extends React.ComponentPropsWithoutRef<"div"> {
  direction?: "horizontal" | "vertical";
}

/** ref属性会转发至内部的根div元素 */
export const Divider = forwardRef<HTMLInputElement, DividerProps>(
  (props, ref) => {
    const { direction, children, className, ...other } = props;

    return (
      <div
        ref={ref}
        className={clsx(
          "divider",
          {
            "divider-horizontal": direction === "horizontal",
          },
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Divider.displayName = "@rtdui/Divider";
