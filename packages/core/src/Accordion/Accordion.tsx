import { useId, useState } from "react";
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
  /**
   * 只有一项可展开
   * @default true
   */
  onlyOneOpen?: boolean;
  /**
   * 是否将所有项拼合在一起
   * @default false
   */
  join?: boolean;
  className?: string;
  slots?: {
    itemRoot?: string;
    itemTitle?: string;
    itemContent?: string;
  };
}
export function Accordion(props: AccordionProps) {
  const {
    items,
    expandIcon,
    initExpandIndex = 0,
    onlyOneOpen = true,
    join = false,
    className,
    slots,
  } = props;

  const name = useId();

  const [expandIndex, setExpandIndex] = useState(initExpandIndex);

  /* 
    - Accordion uses the same style as the collapse component but it works with radio inputs or details elements. You can control which item to be open by checking/unchecking the hidden radio input or setting the open attribute on details element.
    - All radio inputs with the same name work together and only one of them can be open at a time. If you have more than one set of accordion items on a page, use different names for the radio inputs or details elements on each set.
    - If you want the collapsed content to be searcheable in browser use the Accordion using details, but no controlled mode
  */
  return (
    <div
      className={clsx(
        "accordion",
        {
          "join join-vertical": join,
          "flex flex-col gap-2": !join,
        },
        className,
      )}
    >
      {items.map((d, index) => (
        <div
          key={index}
          className={clsx(
            "collapse",
            "bg-base-100 border",
            {
              "join-item": join,
              "collapse-arrow": expandIcon === "arrow",
              "collapse-plus": expandIcon === "plus",
            },
            slots?.itemRoot,
          )}
        >
          <input
            type="radio"
            name={onlyOneOpen ? name : useId()}
            checked={expandIndex === index}
            onChange={(e) => setExpandIndex(index)}
          />
          <div
            className={clsx(
              "collapse-title",
              "font-semibold",
              slots?.itemTitle,
            )}
          >
            {d.title}
          </div>
          <div className={clsx("collapse-content", slots?.itemContent)}>
            {d.content}
          </div>
        </div>
      ))}
      {/* {items.map((d, index) => (
        <details
          key={index}
          className={clsx(
            "collapse",
            "bg-base-100 border",
            {
              "join-item": join,
              "collapse-arrow": expandIcon === "arrow",
              "collapse-plus": expandIcon === "plus",
            },
            slots?.itemRoot,
          )}
          name={onlyOneOpen ? name : useId()}
          open={index === expandIndex}
        >
          <summary
            className={clsx(
              "collapse-title",
              "font-semibold",
              slots?.itemTitle,
            )}
          >
            {d.title}
          </summary>
          <div className={clsx("collapse-content", slots?.itemContent)}>
            {d.content}
          </div>
        </details>
      ))} */}
    </div>
  );
}
