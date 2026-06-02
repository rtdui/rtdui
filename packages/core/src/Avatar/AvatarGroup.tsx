import { Children, cloneElement } from "react";
import clsx from "clsx";
import { AvatarGroupContext } from "./context";
import type { ThemeBaseSize } from "../theme.types";

export interface AvatarGroupProps extends React.ComponentProps<"div"> {
  max?: number;
  size?: ThemeBaseSize;
  className?: string;
  /** avatars */
  children?: React.ReactNode;
}
export function AvatarGroup(props: AvatarGroupProps) {
  const { ref, max = 4, size = "md", className, children } = props;
  const leftCount = Children.count(children) - max;

  const contextValue = {
    size,
  };

  return (
    <div
      ref={ref}
      className={clsx(
        "avatar-group",
        {
          "-space-x-4": size === "xs",
          "-space-x-6": size === "sm",
          "-space-x-7": size === "md",
          "-space-x-9": size === "lg",
          "-space-x-11": size === "xl",
        },
        className,
      )}
    >
      <AvatarGroupContext value={contextValue}>
        {Children.toArray(children).slice(0, max)}
        {leftCount > 0 &&
          cloneElement(
            Children.toArray(children)[0] as React.ReactElement,
            {
              placeholder: `+${leftCount}`,
              src: undefined,
            } as any,
          )}
      </AvatarGroupContext>
    </div>
  );
}
