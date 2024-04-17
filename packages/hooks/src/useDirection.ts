import { useState } from "react";
import { useIsomorphicEffect, useMutationObserver } from "@mantine/hooks";

export type Direction = "ltr" | "rtl";

export function useDirection() {
  const [dir, setDir] = useState<Direction>("ltr");

  useIsomorphicEffect(() => {
    const direction = document.documentElement.getAttribute("dir");
    if (direction === "rtl") {
      setDir(direction);
    }
  }, []);

  useMutationObserver(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "dir"
        ) {
          if (
            mutation.target instanceof HTMLHtmlElement &&
            mutation.target.getAttribute("dir") === "rtl"
          )
            setDir("rtl");
        }
      });
    },
    { attributes: true, attributeFilter: ["dir"] },
    () => document.documentElement
  );

  return dir;
}
