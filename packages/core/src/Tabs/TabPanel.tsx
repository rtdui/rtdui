import clsx from "clsx";
import { useTabsContext } from "./context";

export interface TabPanelProps extends React.ComponentProps<"div"> {
  /** Panel content */
  children: React.ReactNode;

  /** If set to `true`, the content will be kept mounted, even if `keepMounted` is set `false` in the parent `Tabs` component */
  keepMounted?: boolean;

  /** Value of associated control */
  value: string;
}

export function TabPanel(props: TabPanelProps) {
  const { ref, children, className, value, ...others } = props;

  const ctx = useTabsContext();

  const active = ctx.value === value;

  const content =
    ctx.keepMounted || props.keepMounted ? children : active ? children : null;

  return (
    <div
      ref={ref}
      data-orientation={ctx.orientation}
      role="tabpanel"
      id={ctx.getPanelId(value)}
      aria-labelledby={ctx.getTabId(value)}
      className={clsx(
        "",
        {
          hidden: !active,
        },
        className,
      )}
      {...others}
    >
      {content}
    </div>
  );
}
