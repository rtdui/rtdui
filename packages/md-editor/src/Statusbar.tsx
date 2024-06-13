import clsx from "clsx";
import { forwardRef } from "react";
//@ts-expect-error no types
import wordCount from "word-count";
import { useMdEditorContext } from "./context";

export interface StatusbarOwnProps {
  //test?: string;
}
export type StatusbarProps = StatusbarOwnProps &
  Omit<React.ComponentPropsWithoutRef<"div">, keyof StatusbarOwnProps>;

export const Statusbar = forwardRef<HTMLDivElement, StatusbarProps>(
  (props, ref) => {
    const { className, ...other } = props;

    const {
      split,
      value = "",
      locale,
      syncScroll,
      onSyncScrollChange,
      scrollToTop,
    } = useMdEditorContext() ?? {};

    const words = wordCount(value);
    const lines = value.split("\n").length;

    return (
      <div
        ref={ref}
        {...other}
        className={clsx(
          "flex items-center gap-4 text-xs px-4 py-1 bg-base-300",
          className
        )}
      >
        <div>
          {locale?.words}: <strong>{words}</strong>
        </div>
        <div>
          {locale?.lines}: <strong>{lines}</strong>
        </div>
        <div className="flex-1" />

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {split && (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={syncScroll}
              onChange={(e) => onSyncScrollChange?.(e.currentTarget.checked)}
            />
            {locale?.sync}
          </label>
        )}

        <button type="button" onClick={() => scrollToTop?.()}>
          {locale?.top}
        </button>
      </div>
    );
  }
);

Statusbar.displayName = "@rtdui/md-editor/Statusbar";
