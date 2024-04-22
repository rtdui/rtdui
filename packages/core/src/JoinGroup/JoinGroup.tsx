import { forwardRef } from "react";
import clsx from "clsx";

export interface JoinGroupProps {
  className?: string;
  /** ReactElements */
  children?: React.ReactNode;
}
export const JoinGroup = forwardRef<HTMLDivElement, JoinGroupProps>(
  (props, ref) => {
    const { className, children } = props;

    return (
      <div className={clsx("join", className)} ref={ref}>
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

JoinGroup.displayName = "@rtdui/JoinGroup";
