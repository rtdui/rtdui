import React from "react";
import clsx from "clsx";

export interface JionGroupProps {
  className?: string;
  /** ReactElements */
  children?: React.ReactNode;
}
export const JionGroup = React.forwardRef<HTMLProgressElement, JionGroupProps>(
  (props, ref) => {
    const { className, children } = props;

    return (
      <div className={clsx("join", className)}>
        {/* {React.Children.map(children, (d) =>
          React.isValidElement(d)
            ? React.cloneElement<any>(d, { className: "join-item" })
            : d
        )} */}
        {children}
      </div>
    );
  }
);
