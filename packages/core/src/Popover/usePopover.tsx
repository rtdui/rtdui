import React from "react";
import type { Middleware, UseFloatingOptions } from "@floating-ui/react";
import {
  arrow,
  autoUpdate,
  flip,
  limitShift,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStyles,
  useTransitionStatus,
} from "@floating-ui/react";
import { useUncontrolled } from "@rtdui/hooks";
import {
  type TransitionType,
  type TransitionDuration,
} from "../Transition/transitions";

export interface UsePopoverOptions
  extends Omit<UseFloatingOptions, "middleware"> {
  /** 非受控属性 */
  defaultOpen?: boolean;
  /** 受控属性 */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 禁用的 */
  disabled?: boolean;
  /** 弹出位置 */
  placement?:
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-start"
    | "top-end"
    | "right-start"
    | "right-end"
    | "bottom-start"
    | "bottom-end"
    | "left-start"
    | "left-end";
  /**
   * 是否鼠标点击时显示弹出框
   * @default true
   */
  openOnClick?: boolean;
  /**
   * 是否鼠标移入时显示弹出框, 这对于实现工具提示非常有用
   * @default false
   */
  openOnHover?: boolean;
  /**
   * 是否引用元素得到焦点时显示弹出框, 用于键盘导航到引用元素
   * @default false
   */
  openOnFocus?: boolean;
  /**
   * 弹出框偏移引用元素的距离
   * @default 8
   */
  offset?: number;
  /**
   * 弹出框显示时是否将焦点范围限制在弹出框内
   * @default false
   */
  focusTrap?: boolean;
  /**
   * list ref, 对于列表非常有用
   */
  listRef?: React.MutableRefObject<any>;
  /** 列表键盘导航激活的索引,该属性是受控属性 */
  activeListIndex?: number | null;
  /** 列表键盘导航激活的索引,该属性是非受控属性 */
  defaultActiveIndex?: number | null;
  /** 列表键盘导航激活的索引改变时触发 */
  onActiveIndexChanged?: (index: number | null) => void;
  /** 额外的@floating-ui中间件 */
  extraMiddleware?: Middleware[];
  /** 传递给Transition组件的transition属性
   * @default "fade"
   */
  transition?: TransitionType;
  /** 传递给Transition组件的duration属性
   *  @default 250
   */
  transitionDuration?: TransitionDuration;
  /** 传递给Transition组件的timingFunction属性
   * @default "ease"
   */
  transitionTimingFunction?: string;
}
export function usePopover(options: UsePopoverOptions) {
  const {
    placement = "bottom",
    defaultOpen,
    open: openProps,
    onOpenChange,
    disabled = false,
    openOnClick = true,
    openOnHover = false,
    openOnFocus = false,
    focusTrap,
    offset: offsetProp = 8,
    listRef,
    activeListIndex,
    defaultActiveIndex,
    onActiveIndexChanged,
    extraMiddleware = [],
    transition = "fade",
    transitionDuration = { enter: 250, exit: 50 },
    transitionTimingFunction = "ease",
    ...other
  } = options;

  const [open, handleOpenChange] = useUncontrolled({
    defaultValue: defaultOpen,
    value: openProps,
    finalValue: false,
    onChange: onOpenChange,
  });

  const arrowRef = React.useRef(null);

  const floating = useFloating({
    placement,
    open,
    onOpenChange: handleOpenChange,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetProp), // 引用元素和浮动元素之间在主轴方向上的距离
      flip({
        fallbackAxisSideDirection: "end",
        crossAxis: false,
      }), // 在placement方向上没有可用空间时在主轴方向上翻转
      shift({
        limiter: limitShift({ offset: 15 }),
      }), // 在交叉轴方向上是否自动移动使其保持在视口内.
      arrow({
        element: arrowRef,
        padding: 4,
      }),
      ...extraMiddleware,
    ],
  });

  const floatingContext = floating.context;

  //#region 交互hooks
  const [activeIndex, setActiveIndex] = useUncontrolled({
    value: activeListIndex,
    defaultValue: activeListIndex,
    finalValue: null,
    onChange: onActiveIndexChanged,
  });

  const interactions = useInteractions([
    // 引用元素被鼠标覆盖时打开
    useHover(floatingContext, {
      enabled: !disabled && openOnHover === true,
    }),
    // 引用元素得到焦点时打开
    useFocus(floatingContext, {
      enabled: !disabled && openOnFocus === true,
    }),
    // 引用元素被点击时打开
    useClick(floatingContext, {
      enabled: !disabled && openOnClick === true,
    }),
    // 关闭, 默认按下escape键或者点击浮动元素的外部.
    useDismiss(floatingContext),
    // 为引用元素和浮动元素添加ARIA规则, 默认role为'dialog'
    useRole(floatingContext),
    // 键盘上/下键导航浮动元素中的列表项
    useListNavigation(floatingContext, {
      enabled: !!listRef,
      listRef: listRef!,
      activeIndex,
      onNavigate: setActiveIndex,
      virtual: true,
      loop: true,
    }),
  ]);
  //#endregion 交互hooks

  // 浮动元素的过渡
  const transitionStatus = useTransitionStatus(floatingContext, {
    duration:
      typeof transitionDuration === "number"
        ? transitionDuration
        : { open: transitionDuration.enter, close: transitionDuration.exit },
  });

  // const transitionStyle = useTransitionStyles(floatingContext, {
  //   duration: {
  //     open: 400,
  //     close: 75,
  //   },
  //   initial: ({ side }) => ({
  //     opacity: 0,
  //     transform: {
  //       top: "translateY(-0.5rem)",
  //       right: "translateX(0.5rem)",
  //       bottom: "translateY(0.5rem)",
  //       left: "translateX(-0.5rem)",
  //     }[side],
  //   }),
  //   close: () => ({
  //     opacity: 0,
  //     transform: "scale(0.97)",
  //   }),
  // });

  return React.useMemo(
    () => ({
      open,
      handleOpenChange,
      ...interactions,
      ...floating,
      ...transitionStatus,
      arrowRef,
      focusTrap,
      transition,
      transitionDuration,
      transitionTimingFunction,
    }),
    [
      open,
      handleOpenChange,
      interactions,
      floating,
      transitionStatus,
      focusTrap,
      transition,
      transitionDuration,
      transitionTimingFunction,
    ]
  );
}
