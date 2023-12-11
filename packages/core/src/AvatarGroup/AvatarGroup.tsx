import clsx from "clsx";
import React from "react";
import { AvatarGroupProvider } from "./AvatarGroup.context";

export interface AvatarGroupProps {
  max?: number;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  /** avatars */
  children?: React.ReactNode;
}
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (props, ref) => {
    const { max = 4, size = "md", className, children } = props;
    const leftCount = React.Children.count(children) - max;

    const contextValue = React.useMemo(
      () => ({
        size,
      }),
      [size]
    );
    return (
      <div
        ref={ref}
        className={clsx(
          "avatar-group",
          {
            "-space-x-4": size === "xs",
            "-space-x-6": size === "sm",
            "-space-x-7": size === "md",
            "-space-x-11": size === "lg",
          },
          className
        )}
      >
        <AvatarGroupProvider value={contextValue}>
          {React.Children.toArray(children).slice(0, max)}
          {leftCount > 0 &&
            React.cloneElement(
              React.Children.toArray(children)[0] as React.ReactElement,
              {
                placeholder: `+${leftCount}`,
                src: undefined,
              }
            )}
        </AvatarGroupProvider>
      </div>
    );
  }
);
