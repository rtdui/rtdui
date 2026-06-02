import { type RefObject, useEffect, useRef, useState } from "react";
import { useMutationObserverTarget, useTimeout } from "@rtdui/hooks";

function isParent(
  parentElement: HTMLElement | EventTarget | null,
  childElement: HTMLElement | null,
) {
  if (!childElement || !parentElement) {
    return false;
  }

  let parent = childElement.parentNode;
  while (parent != null) {
    if (parent === parentElement) {
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
}

interface UseFloatingIndicatorInput {
  target: HTMLElement | null | undefined;
  parent: HTMLElement | null | undefined;
  ref: RefObject<HTMLDivElement>;
  displayAfterTransitionEnd?: boolean;
}

export function useFloatingIndicator({
  target,
  parent,
  ref,
  displayAfterTransitionEnd,
}: UseFloatingIndicatorInput) {
  const transitionTimeoutIdRef = useRef<number>(undefined);
  const [initialized, setInitialized] = useState(false);

  const [hidden, setHidden] = useState(
    typeof displayAfterTransitionEnd === "boolean"
      ? displayAfterTransitionEnd
      : false,
  );

  const updatePosition = () => {
    if (!target || !parent) {
      return;
    }

    const targetRect = target.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    const position = {
      top: targetRect.top - parentRect.top,
      left: targetRect.left - parentRect.left,
      width: targetRect.width,
      height: targetRect.height,
    };

    if (ref.current) {
      ref.current.style.transform = `translateY(${position.top}px) translateX(${position.left}px)`;
      ref.current.style.width = `${position.width}px`;
      ref.current.style.height = `${position.height}px`;
    }
  };

  const updatePositionWithoutAnimation = () => {
    window.clearTimeout(transitionTimeoutIdRef.current);
    if (ref.current) {
      ref.current.style.transitionDuration = "0ms";
    }
    updatePosition();
    transitionTimeoutIdRef.current = window.setTimeout(() => {
      if (ref.current) {
        ref.current.style.transitionDuration = "";
      }
    }, 30);
  };

  const targetResizeObserverRef = useRef<ResizeObserver>(null);
  const parentResizeObserverRef = useRef<ResizeObserver>(null);

  useEffect(() => {
    updatePosition();

    if (target) {
      targetResizeObserverRef.current = new ResizeObserver(
        updatePositionWithoutAnimation,
      );
      targetResizeObserverRef.current.observe(target!);
      parentResizeObserverRef.current = new ResizeObserver(
        updatePositionWithoutAnimation,
      );
      parentResizeObserverRef.current.observe(parent!);

      return () => {
        targetResizeObserverRef.current?.disconnect();
        parentResizeObserverRef.current?.disconnect();
      };
    }

    return undefined;
  }, [parent, target]);

  useEffect(() => {
    if (parent) {
      const handleTransitionEnd = (event: TransitionEvent) => {
        if (isParent(event.target, parent)) {
          updatePositionWithoutAnimation();
          setHidden(false);
        }
      };

      document.addEventListener("transitionend", handleTransitionEnd);
      return () => {
        document.removeEventListener("transitionend", handleTransitionEnd);
      };
    }

    return undefined;
  }, [parent]);

  useTimeout(
    () => {
      setInitialized(true);
    },
    20,
    { autoInvoke: true },
  );

  useMutationObserverTarget(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "dir"
        ) {
          updatePositionWithoutAnimation();
        }
      });
    },
    { attributes: true, attributeFilter: ["dir"] },
    () => document.documentElement,
  );

  return { initialized, hidden };
}
