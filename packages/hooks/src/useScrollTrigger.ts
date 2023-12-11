import React from "react";

function defaultTrigger(
  store: React.MutableRefObject<any>,
  options: Omit<ScrollTriggerOptions, "getTrigger">
) {
  const {
    disableHysteresis = true,
    threshold = 0,
    target,
    direction = "vertical",
  } = options;
  const previous = store.current;

  if (target) {
    // Get vertical scroll
    if (direction === "vertical") {
      store.current =
        target === window
          ? (target as Window).scrollY
          : (target as Element).scrollTop;
    } else {
      store.current =
        target === window
          ? (target as Window).scrollX
          : (target as Element).scrollLeft;
    }
  }

  if (!disableHysteresis && previous !== undefined) {
    if (store.current < previous) {
      return false;
    }
  }

  return store.current > threshold;
}

interface ScrollTriggerOptions {
  getTrigger?: typeof defaultTrigger;
  target: EventTarget | null;
  disableHysteresis?: boolean;
  threshold?: number;
  direction?: "horizontal" | "vertical ";
  disabled?: boolean;
}
export function useScrollTrigger(options: ScrollTriggerOptions) {
  // const defaultTargetRef = React.useRef<Window>(window);
  const { getTrigger = defaultTrigger, target, disabled, ...other } = options;
  const store = React.useRef<any>();
  const [trigger, setTrigger] = React.useState(false);

  const handleScroll = () => {
    setTrigger(getTrigger(store, { target, ...other }));
  };

  const mounted = React.useRef(false);

  React.useEffect(() => {
    if (mounted.current && target && !disabled) {
      handleScroll(); // Re-evaluate trigger when dependencies change
      target.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    } else {
      mounted.current = true;
    }

    return () => {
      if (target) {
        target.removeEventListener("scroll", handleScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, disabled]);

  return trigger;
}
