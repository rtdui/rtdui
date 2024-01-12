import React from "react";
import clsx from "clsx";
import { TabPanel, type TabPanelProps } from "./TabPanel";

export interface TabsProps {
  /**
   * 变体
   * @default lifted
   */
  variant?: "bordered" | "lifted" | "boxed";
  /** 尺寸
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg";
  children: React.ReactElement<TabPanelProps, typeof TabPanel>[];
  className?: string;
  initIndex?: number;
}

const Tabs_ = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    initIndex = 0,
    variant = "lifted",
    size = "md",
    children,
    className,
    ...other
  } = props;

  const [activeIndex, setActiveIndex] = React.useState(initIndex);

  React.useImperativeHandle<HTMLDivElement, any>(ref, () => ({
    setIndex(index: number) {
      setActiveIndex(index);
    },
  }));

  return (
    <div className="grid">
      <div
        className={clsx(
          "tabs",
          "justify-self-start",
          {
            "tabs-bordered": variant === "bordered",
            "tabs-lifted": variant === "lifted",
            "tabs-boxed": variant === "boxed",
            "tabs-xs": size === "xs",
            "tabs-sm": size === "sm",
            "tabs-md": size === "md",
            "tabs-lg": size === "lg",
            "-mb-[var(--tab-border)]": variant === "lifted",
          },
          className
        )}
      >
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            type="button"
            className={clsx("tab", {
              "tab-disabled": child.props.disabled,
              "tab-active": activeIndex === index,
              "[--tab-border-color:transparent]": activeIndex !== index,
            })}
            disabled={child.props.disabled}
            onClick={(e) => setActiveIndex(index)}
          >
            {child.props.label}
          </button>
        ))}
        {/* 占位tab */}
        {/* {variant === "lifted" && (
          <div className="tab mr-6 flex-1 cursor-default [--tab-border-color:transparent]" />
        )} */}
      </div>

      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, { index, value: activeIndex, variant })
      )}
    </div>
  );
});

type TabsType = typeof Tabs_ & {
  TabPanel: typeof TabPanel;
};

export const Tabs = Tabs_ as TabsType;
Tabs.TabPanel = TabPanel;
