import { forwardRef, useImperativeHandle } from "react";
import clsx from "clsx";
import { useId, useUncontrolled } from "@rtdui/hooks";
import { getColor, getRadius, getSafeId } from "../utils";
import { TabsProvider } from "./context";
import { TabList } from "./TabList";
import { TabPanel } from "./TabPanel";
import { Tab } from "./Tab";

export interface TabsProps
  extends Omit<
    React.ComponentPropsWithoutRef<"div">,
    "defaultValue" | "value" | "onChange"
  > {
  /** Default value for uncontrolled component */
  defaultValue?: string | null;

  /** Value for controlled component */
  value?: string | null;

  /** Called when value changes */
  onChange?: (value: string | null) => void;

  /** Tabs orientation
   * @default 'horizontal'
   */
  orientation?: "vertical" | "horizontal";

  /** `Tabs.List` placement relative to `Tabs.Panel`, applicable only when `orientation="vertical"`
   * @default 'left'
   */
  placement?: "left" | "right";

  /** Base id, used to generate ids to connect labels with controls, generated randomly by default
   */
  id?: string;

  /** Determines whether arrow key presses should loop though items (first to last and last to first)
   * @default true
   */
  loop?: boolean;

  /** Determines whether tab should be activated with arrow key press
   * @default true
   */
  activateTabWithKeyboard?: boolean;

  /** Determines whether tab can be deactivated
   * @default false
   */
  allowTabDeactivation?: boolean;

  /** Tabs content */
  children?: React.ReactNode;

  /** Changes colors of `Tabs.Tab` components when variant is `pills` or `default`, does nothing for other variants
   * @default "primary"
   */
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "neutral"
    | string;

  /** "xs","sm","md","lg" or any valid CSS value to set `border-radius`
   * @default 'md'
   */
  radius?: string;

  /** Determines whether tabs should have inverted styles
   * @default false
   */
  inverted?: boolean;

  /** If set to `false`, `Tabs.Panel` content will be unmounted when the associated tab is not active
   * @default true
   */
  keepMounted?: boolean;

  /**
   * variant
   * @default 'default'
   */
  variant?: "default" | "outline" | "pills";
}

const VALUE_ERROR =
  "Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value";

const Tabs_ = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    id,
    defaultValue,
    value,
    onChange,
    orientation = "horizontal",
    children,
    loop = true,
    activateTabWithKeyboard = true,
    allowTabDeactivation = false,
    variant = "default",
    color = "primary",
    radius = "md",
    inverted = false,
    placement = "left",
    keepMounted = true,
    className,
    style,
    ...others
  } = props;

  const uid = useId(id);

  const [currentTab, setCurrentTab] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange,
  });

  useImperativeHandle(
    ref,
    () =>
      ({
        setCurrentTab,
      }) as any
  );

  return (
    <TabsProvider
      value={{
        placement,
        value: currentTab,
        orientation,
        id: uid,
        loop,
        activateTabWithKeyboard,
        getTabId: getSafeId(`${uid}-tab`, VALUE_ERROR),
        getPanelId: getSafeId(`${uid}-panel`, VALUE_ERROR),
        onChange: setCurrentTab,
        allowTabDeactivation,
        variant,
        color,
        radius,
        inverted,
        keepMounted,
      }}
    >
      <div
        ref={ref}
        id={uid}
        data-variant={variant}
        data-orientation={orientation}
        data-inverted={orientation === "horizontal" && inverted}
        data-placement={orientation === "vertical" && placement}
        className={clsx(
          {
            flex: orientation === "vertical",
            "flex-row-reverse":
              orientation === "vertical" && placement === "right",
          },
          className
        )}
        style={
          {
            ...style,
            "--tabs-radius": getRadius(radius),
            "--tabs-color": getColor(color),
            "--tabs-text-color": "white",
          } as any
        }
        {...others}
      >
        {children}
      </div>
    </TabsProvider>
  );
});

Tabs_.displayName = "@rtdui/Tabs";

export const Tabs = Object.assign(Tabs_, {
  List: TabList,
  Panel: TabPanel,
  Tab,
});
