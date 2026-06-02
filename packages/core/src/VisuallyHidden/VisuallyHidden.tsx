import clsx from "clsx";

export interface VisuallyHiddenProps extends React.ComponentProps<"span"> {}

/** 视觉上隐藏,但仍可被屏幕阅读器访问 */
export function VisuallyHidden(props: VisuallyHiddenProps) {
  const { ref, className, ...others } = props;

  return (
    <span
      ref={ref}
      className={clsx(
        "visually-hidden",
        "absolute size-px p-0 -m-px border-0 overflow-hidden whitespace-nowrap",
        className,
      )}
      {...others}
    />
  );
}
