import { useState } from "react";
import { useMutationObserverTarget } from "@mantine/hooks";

export function useIsDark() {
  const [isDark, setIsDark] = useState(false);
  useMutationObserverTarget(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          if (mutation.target instanceof HTMLHtmlElement) {
            setIsDark(mutation.target.dataset.theme === "dark");
          }
        }
      });
    },
    {
      attributes: true,
      attributeFilter: ["data-theme"],
    },
    () => document.documentElement,
  );

  return isDark;
}
