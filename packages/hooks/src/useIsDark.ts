import { useState } from "react";
import { useMutationObserver } from "@mantine/hooks";

export function useIsDark() {
  const [isDark, setIsDark] = useState(false);
  useMutationObserver(
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
    () => document.documentElement
  );

  return isDark;
}
