import { forwardRef } from "react";
import clsx from "clsx";
import { Portal } from "@rtdui/core";
import { useDidUpdate, useHotkeys } from "@rtdui/hooks";
import { getHotkeys } from "./get-hotkeys";
import { SpotlightProvider } from "./Spotlight.context";
import {
  spotlightActions,
  type SpotlightStore,
  spotlightStore,
  useSpotlight,
} from "./spotlight.store";

export interface SpotlightRootProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /** Spotlight store, can be used to create multiple instances of spotlight */
  store?: SpotlightStore;

  /** Controlled Spotlight search query */
  query?: string;

  /** Called when query changes */
  onQueryChange?: (query: string) => void;

  /** Determines whether the search query should be cleared when the spotlight is closed, `true` by default */
  clearQueryOnClose?: boolean;

  /** Keyboard shortcut or a list of shortcuts to trigger spotlight, `'mod + K'` by default */
  shortcut?: string | string[] | null;

  /** A list of tags which when focused will be ignored by shortcut, `['input', 'textarea', 'select']` by default */
  tagsToIgnore?: string[];

  /** Determines whether shortcut should trigger based in contentEditable, `false` by default */
  triggerOnContentEditable?: boolean;

  /** If set, spotlight will not be rendered */
  disabled?: boolean;

  /** Called when spotlight opens */
  onSpotlightOpen?: () => void;

  /** Called when spotlight closes */
  onSpotlightClose?: () => void;

  /** Forces opened state, useful for tests */
  forceOpened?: boolean;

  /** Determines whether spotlight should be closed when one of the actions is triggered, `true` by default */
  closeOnActionTrigger?: boolean;

  /** Spotlight content max-height. Ignored unless `scrollable` prop is set. `400` by default */
  maxHeight?: React.CSSProperties["maxHeight"];

  /** Determines whether the actions list should be scrollable. If not set, `maxHeight` is ignored, `false` by default */
  scrollable?: boolean;
}

const defaultProps: Partial<SpotlightRootProps> = {
  store: spotlightStore,
  clearQueryOnClose: true,
  closeOnActionTrigger: true,
  shortcut: "mod + K",
  maxHeight: 400,
  scrollable: false,
};

export const SpotlightRoot = forwardRef<HTMLDivElement, SpotlightRootProps>(
  (props, ref) => {
    props = { ...defaultProps, ...props };
    const {
      className,
      style,
      store,
      children,
      query,
      onQueryChange,
      clearQueryOnClose,
      shortcut,
      tagsToIgnore,
      triggerOnContentEditable,
      disabled,
      onSpotlightOpen,
      onSpotlightClose,
      forceOpened,
      closeOnActionTrigger,
      maxHeight,
      scrollable,
      ...others
    } = props;

    const { opened, query: storeQuery } = useSpotlight(store!);
    const _query = query || storeQuery;
    const setQuery = (q: string) => {
      onQueryChange?.(q);
      spotlightActions.setQuery(q, store!);
    };

    useHotkeys(
      getHotkeys(shortcut, store!),
      tagsToIgnore,
      triggerOnContentEditable
    );

    useDidUpdate(() => {
      opened ? onSpotlightOpen?.() : onSpotlightClose?.();
    }, [opened]);

    if (disabled) {
      return null;
    }

    return (
      <SpotlightProvider
        value={{
          query: _query,
          setQuery,
          store: store!,
          closeOnActionTrigger,
        }}
      >
        <Portal type="spotlight" className="relative z-[999]">
          <div
            ref={ref}
            className={clsx("modal", { "modal-open": opened || !!forceOpened })}
            {...others}
            data-scrollable={scrollable || undefined}
          >
            <div className="modal-box">{children}</div>
            <label
              className="modal-backdrop backdrop-blur"
              onClick={() => spotlightActions.close(store!)}
            />
          </div>
        </Portal>
      </SpotlightProvider>
    );
  }
);

SpotlightRoot.displayName = "@rtdui/SpotlightRoot";
