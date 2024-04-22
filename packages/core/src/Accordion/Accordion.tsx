import React from "react";
import clsx from "clsx";

export interface AccordionProps {
  /**
   * 项数组
   */
  items: {
    title: React.ReactNode;
    content: React.ReactNode;
    [key: string]: any;
  }[];
  /** 展开的图标 */
  expandIcon?: "arrow" | "plus";
  /** 初始展开的项索引 */
  initExpandIndex?: number;
  className?: string;
}
export function Accordion(props: AccordionProps) {
  const { items, expandIcon, initExpandIndex = 0, className } = props;

  const name = React.useId();

  const [expandIndex, setExpandIndex] = React.useState(initExpandIndex);

  return (
    <div className="flex flex-col gap-2">
      {items.map((d, index) => (
        <div
          key={index}
          className={clsx(
            "collapse",
            "bg-base-200",
            {
              "collapse-arrow": expandIcon === "arrow",
              "collapse-plus": expandIcon === "plus",
            },
            className
          )}
        >
          <input
            type="radio"
            name={name}
            checked={expandIndex === index}
            onChange={(e) => setExpandIndex(index)}
          />
          <div className="collapse-title text-xl font-medium">{d.title}</div>
          <div className="collapse-content">{d.content}</div>
        </div>
      ))}
    </div>
  );
}
