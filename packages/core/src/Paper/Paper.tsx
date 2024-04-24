import clsx from "clsx";
import React from "react";

export interface PaperProps extends React.ComponentPropsWithoutRef<"div"> {
  elevation?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export function Paper(props: PaperProps) {
  const { className, elevation, children, ...other } = props;

  return (
    <div
      className={clsx(
        "rounded-2xl bg-base-100 p-4",
        {
          "shadow-sm": elevation === "xs",
          shadow: elevation === "sm",
          "shadow-md": elevation === "md",
          "shadow-lg": elevation === "lg",
          "shadow-xl": elevation === "xl",
          "shadow-2xl": elevation === "2xl",
        },
        className
      )}
      {...other}
    >
      {children}
    </div>
  );
}
