import {
  useWindowScroll,
  useIsomorphicEffect,
  usePrevious,
} from "@mantine/hooks";

export const isFixed = (current: number, fixedAt: number) => current <= fixedAt;
export const isPinned = (current: number, previous: number) =>
  current <= previous;
export const isReleased = (
  current: number,
  previous: number,
  fixedAt: number
) => !isPinned(current, previous) && !isFixed(current, fixedAt);

interface UseHeadroomInput {
  /** Number in px at which element should be fixed */
  fixedAt?: number;

  /** Called when element is pinned */
  onPin?: () => void;

  /** Called when element is at fixed position */
  onFix?: () => void;

  /** Called when element is unpinned */
  onRelease?: () => void;
}

/** 使用usePrevious替代,为了兼容iOS的滚动 */
export function useHeadroom2({
  fixedAt = 0,
  onPin,
  onFix,
  onRelease,
}: UseHeadroomInput = {}) {
  const [{ y: scrollPosition }] = useWindowScroll();
  const previous = usePrevious(scrollPosition)!;

  useIsomorphicEffect(() => {
    if (isPinned(scrollPosition, previous)) {
      onPin?.();
    }
  }, [scrollPosition, onPin]);

  useIsomorphicEffect(() => {
    if (isFixed(scrollPosition, fixedAt)) {
      onFix?.();
    }
  }, [scrollPosition, fixedAt, onFix]);

  useIsomorphicEffect(() => {
    if (isReleased(scrollPosition, previous, fixedAt)) {
      onRelease?.();
    }
  }, [scrollPosition, onRelease]);

  if (isPinned(scrollPosition, previous)) {
    return true;
  }

  if (isFixed(scrollPosition, fixedAt)) {
    return true;
  }

  return false;
}
