import { forwardRef } from "react";
import clsx from "clsx";

export interface VisuallyHiddenProps
  extends React.ComponentPropsWithoutRef<"span"> {}

/** 视觉上隐藏,但仍可被屏幕阅读器访问 */
export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  (props, ref) => {
    const { className, ...others } = props;

    return (
      <span
        ref={ref}
        className={clsx(
          "visually-hidden",
          "absolute size-px p-0 -m-px border-0 overflow-hidden whitespace-nowrap",
          className
        )}
        {...others}
      />
    );
  }
);

VisuallyHidden.displayName = "@rtdui/core/VisuallyHidden";
