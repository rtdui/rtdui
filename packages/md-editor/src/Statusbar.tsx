import clsx from "clsx";
//@ts-expect-error no types
import wordCount from "word-count";
import { useMdEditorContext } from "./context";

export type StatusbarOwnProps = {};
export type StatusbarProps = StatusbarOwnProps &
  Omit<React.ComponentProps<"div">, keyof StatusbarOwnProps>;

export function Statusbar(props: StatusbarProps) {
  const { ref, className, ...other } = props;

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
        className,
      )}
    >
      <div>
        {locale?.words}: <strong>{words}</strong>
      </div>
      <div>
        {locale?.lines}: <strong>{lines}</strong>
      </div>
      <div className="flex-1" />

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
