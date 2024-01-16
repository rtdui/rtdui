import React from "react";
import { useUncontrolled } from "@rtdui/hooks";
import clsx from "clsx";
import {
  IconChevronLeftPipe,
  IconChevronLeft,
  IconChevronRightPipe,
  IconChevronRight,
} from "@tabler/icons-react";
import { Button } from "../Button/Button";

interface PageItemProps {
  type: string;
  page: number;
}
function PageItem(props: PageItemProps) {
  const { type, page } = props;
  switch (type) {
    case "first":
      return <IconChevronLeftPipe size={20} />;
    case "previous":
      return <IconChevronLeft size={20} />;
    case "start-ellipsis":
    case "end-ellipsis":
      return "...";
    case "next":
      return <IconChevronRight size={20} />;
    case "last":
      return <IconChevronRightPipe size={20} />;
    default:
      return page;
  }
}

export interface PaginationProps {
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * 总页数
   */
  count: number;
  /**
   * 左右边界的显示数量
   * @default 1
   */
  boundaryCount?: number;
  /**
   * 选中项两边的显示数量
   * @default 1
   */
  siblingCount?: number;
  /** 矩形或圆形, 用于单字符或图标 */
  sharp?: "square" | "circle";
  /**
   * @default true
   */
  showFirstButton?: boolean;
  /**
   * @default true
   */
  showLastButton?: boolean;
  /**
   * @default true
   */
  showPrevButton?: boolean;
  /**
   * @default true
   */
  showNextButton?: boolean;
  defaultPage?: number;
  page?: number;
  onChange?: (page: number) => void;
}
export function Pagination(props: PaginationProps) {
  const {
    size,
    sharp,
    count,
    boundaryCount = 1,
    siblingCount = 1,
    showFirstButton = true,
    showLastButton = true,
    showPrevButton = true,
    showNextButton = true,
    defaultPage,
    page: pageProp,
    onChange,
  } = props;
  const [page, setPage] = useUncontrolled({
    defaultValue: defaultPage,
    value: pageProp,
    finalValue: 1,
    onChange,
  });

  const handleClick = (event: React.MouseEvent, value: number) => {
    setPage(value);
  };

  // https://dev.to/namirsab/comment/2050
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  );

  // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [
    ...(showFirstButton ? ["first"] : []),
    ...(showPrevButton ? ["previous"] : []),
    ...startPages,

    // Start ellipsis
    ...(siblingsStart > boundaryCount + 2
      ? ["start-ellipsis"]
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < count - boundaryCount - 1
      ? ["end-ellipsis"]
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),

    ...endPages,
    ...(showNextButton ? ["next"] : []),
    ...(showLastButton ? ["last"] : []),
  ];

  // Map the button type to its page number
  const buttonPage = (type: string) => {
    switch (type) {
      case "first":
        return 1;
      case "previous":
        return page - 1;
      case "next":
        return page + 1;
      case "last":
        return count;
      default:
        return null;
    }
  };

  // Convert the basic item list to PaginationItem props objects
  const items = itemList.map((item) =>
    typeof item === "number"
      ? {
          onClick: (event: React.MouseEvent): void => {
            handleClick(event, item);
          },
          type: "page",
          page: item,
          selected: item === page,
          disabled: false,
          "aria-current": item === page ? "true" : undefined,
        }
      : {
          onClick: (event: React.MouseEvent): void => {
            handleClick(event, buttonPage(item) as number);
          },
          type: item,
          page: buttonPage(item) as number,
          selected: false,
          disabled:
            item.indexOf("ellipsis") > -1 ||
            (item === "next" || item === "last" ? page >= count : page <= 1),
        }
  );

  return (
    <div className="join pagination">
      {items.map((d, index) => (
        <Button
          key={index}
          size={size}
          sharp={sharp}
          className={clsx("join-item", {
            "btn-active": d.selected,
            "btn-disabled !bg-base-200": d.disabled,
            "px-1": d.type !== "page",
          })}
          onClick={d.onClick}
        >
          <PageItem type={d.type} page={d.page} />
        </Button>
      ))}
    </div>
  );
}
