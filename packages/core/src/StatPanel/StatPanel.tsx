import { forwardRef } from "react";
import clsx from "clsx";

export interface StatPanelProps {
  items: {
    figure?: React.ReactNode;
    title?: React.ReactNode;
    value?: React.ReactNode;
    desc?: React.ReactNode;
    actions?: React.ReactNode;
  }[];
  elevation?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  slots?: {
    stat?: string;
    title?: string;
    figure?: string;
    value?: string;
    desc?: string;
    actions?: string;
  };
}
export const StatPanel = forwardRef<HTMLDivElement, StatPanelProps>(
  (props, ref) => {
    const { items, elevation = "md", slots, className } = props;

    return (
      <div
        ref={ref}
        className={clsx(
          "stats",
          "stats-vertical lg:stats-horizontal", // 响应式的
          {
            shadow: elevation === "xs",
            "shadow-sm": elevation === "sm",
            "shadow-md": elevation === "md",
            "shadow-lg": elevation === "lg",
            "shadow-xl": elevation === "xl",
            "shadow-2xl": elevation === "2xl",
          },
          className
        )}
      >
        {items.map((d, index) => (
          <div key={index} className={clsx("stat", slots?.stat)}>
            {d.figure && (
              <div className={clsx("stat-figure", slots?.figure)}>
                {d.figure}
              </div>
            )}
            <div className={clsx("stat-title", slots?.title)}>{d.title}</div>
            <div className={clsx("stat-value", slots?.value)}>{d.value}</div>
            <div className={clsx("stat-desc", slots?.desc)}>{d.desc}</div>
            {d.actions && (
              <div className={clsx("stat-actions", slots?.actions)}>
                {d.actions}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
);

StatPanel.displayName = "@rtdui/StatPanel";
