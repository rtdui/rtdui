import clsx from "clsx";
import React, { forwardRef } from "react";

export interface ToolbarControlProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Determines whether position: sticky styles should be added to the toolbar
   * @default false
   * */
  sticky?: boolean;
}

const defaultProps: Partial<ToolbarControlProps> = {
  sticky: true,
};

export default forwardRef<HTMLDivElement, ToolbarControlProps>((props, ref) => {
  const { className, children, sticky, ...others } = {
    ...defaultProps,
    ...props,
  };

  return (
    <div
      className={clsx(
        "navbar min-h-0",
        "flex flex-wrap gap-2",
        { "sticky top-0 z-10": sticky },
        className
      )}
      ref={ref}
      {...others}
    >
      {children}
    </div>
  );
});
