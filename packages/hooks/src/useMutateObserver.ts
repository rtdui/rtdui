import React from "react";

const defaultOptions: MutationObserverInit = {
  subtree: true,
  childList: true,
  attributeFilter: ["style", "class"],
};

export function useMutateObserver(
  nodeOrList: HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) {
  React.useEffect(() => {
    if (!nodeOrList) {
      return;
    }

    let instance: MutationObserver;

    const nodeList = Array.isArray(nodeOrList) ? nodeOrList : [nodeOrList];

    if ("MutationObserver" in window) {
      instance = new MutationObserver(callback);

      nodeList.forEach((element) => {
        instance.observe(element, options);
      });
    }

    // eslint-disable-next-line consistent-return
    return () => {
      instance?.takeRecords();
      instance?.disconnect();
    };
  }, [options, nodeOrList, callback]);
}
