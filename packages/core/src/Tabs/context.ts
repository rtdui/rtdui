import { createSafeContext } from "../utils";

export interface TabsContextValue {
  id: string;
  value: string | null;
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
  activateTabWithKeyboard?: boolean;
  allowTabDeactivation?: boolean;
  onChange: (value: string | null) => void;
  getTabId: (value: string) => string;
  getPanelId: (value: string) => string;
  variant?: string;
  color?: string;
  radius?: string;
  inverted?: boolean;
  keepMounted?: boolean;
  placement?: "right" | "left";
}

export const [TabsProvider, useTabsContext] =
  createSafeContext<TabsContextValue>(
    "Tabs component was not found in the tree"
  );
