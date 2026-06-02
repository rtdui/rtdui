import clsx from "clsx";
import { useChipsInputContext } from "../ChipsInput/context";
import { ChipGroupContext } from "./context";
import type { ThemeSize } from "../theme.types";

export interface ChipGroupProps extends React.ComponentProps<"div"> {
  /** Controls spacing between pills, by default controlled by `size` */
  gap?: ThemeSize | number;

  /** Controls size of the child `Pill` components and gap between them, `'sm'` by default */
  size?: "small" | "normal";

  /** Determines whether child `Pill` components should be disabled */
  disabled?: boolean;
}

export function ChipGroup(props: ChipGroupProps) {
  const { ref, className, style, size, disabled, ...others } = props;
  const pillsInputCtx = useChipsInputContext();
  const _size = pillsInputCtx?.size ?? size;

  return (
    <ChipGroupContext value={{ size: _size, disabled }}>
      <div
        ref={ref}
        // size={_size}
        className={clsx(
          "chip-group",
          "flex flex-wrap items-center gap-1",
          className,
        )}
        {...others}
      />
    </ChipGroupContext>
  );
}
