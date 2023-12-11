import React from "react";
import clsx from "clsx";
import { TabPanel, type TabPanelProps } from "./TabPanel";

export interface TabsProps {
  /**
   * @default lifted
   */
  variant?: "bordered" | "lifted" | "boxed";
  children: React.ReactElement<TabPanelProps, typeof TabPanel>[];
  className?: string;
  initIndex?: number;
}

const Tabs_ = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    initIndex = 0,
    variant = "lifted",
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
    <div>
      <div
        className={clsx(
          "tabs",
          {
            "-mb-px": variant === "lifted",
            "tabs-boxed": variant === "boxed",
          },
          className
        )}
      >
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            type="button"
            className={clsx("tab", {
              "tab-bordered": variant === "bordered",
              "tab-lifted": variant === "lifted",
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
        {variant === "lifted" && (
          <div className="tab tab-lifted mr-6 flex-1 cursor-default [--tab-border-color:transparent]" />
        )}
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
