import clsx from "clsx";

export interface ToolbarControlProps extends React.ComponentProps<"div"> {
  /**
   * Determines whether position: sticky styles should be added to the toolbar
   * @default false
   * */
  sticky?: boolean;
}

export function ToolbarControl(props: ToolbarControlProps) {
  const { ref, className, children, sticky = true, ...others } = props;

  return (
    <div
      className={clsx(
        "navbar min-h-0",
        "flex flex-wrap gap-2",
        { "sticky top-0 z-10": sticky },
        className,
      )}
      ref={ref}
      {...others}
    >
      {children}
    </div>
  );
}
