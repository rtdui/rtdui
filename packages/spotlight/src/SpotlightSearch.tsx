import React from "react";
import { IconSearch } from "@tabler/icons-react";
import { TextInput } from "@rtdui/core";
import { useSpotlightContext } from "./Spotlight.context";
import { spotlightActions } from "./spotlight.store";

export interface SpotlightSearchProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {}

const defaultProps: Partial<SpotlightSearchProps> = {
  size: "lg",
};

export const SpotlightSearch = React.forwardRef<
  HTMLInputElement,
  SpotlightSearchProps
>((props, ref) => {
  props = { ...defaultProps, ...props };
  const { onKeyDown, onChange, value, ...others } = props;
  const ctx = useSpotlightContext();
  const [isComposing, setIsComposing] = React.useState(false); // IME

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (isComposing) return;

    if (event.nativeEvent.code === "ArrowDown") {
      event.preventDefault();
      spotlightActions.selectNextAction(ctx.store);
    }

    if (event.nativeEvent.code === "ArrowUp") {
      event.preventDefault();
      spotlightActions.selectPreviousAction(ctx.store);
    }

    if (event.nativeEvent.code === "Enter") {
      event.preventDefault();
      spotlightActions.triggerSelectedAction(ctx.store);
    }
  };

  return (
    <TextInput
      ref={ref}
      slots={{ input: "focus-within:outline-none" }}
      {...others}
      size="md"
      ghost
      bordered={false}
      leftSection={<IconSearch />}
      placeholder="Search..."
      value={value ?? ctx.query}
      onChange={(event) => {
        ctx.setQuery(event.currentTarget.value);
        onChange?.(event);
      }}
      onKeyDown={handleKeyDown}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
    />
  );
});
