import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { TextInput } from "@rtdui/core";
import { useSpotlightContext } from "./Spotlight.context";
import { spotlightActions } from "./spotlight.store";

export interface SpotlightSearchProps
  extends React.ComponentProps<typeof TextInput> {}

export function SpotlightSearch(props: SpotlightSearchProps) {
  const { ref, onKeyDown, onChange, value, size = "lg", ...others } = props;
  const ctx = useSpotlightContext();
  const [isComposing, setIsComposing] = useState(false); // IME

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
      slots={{ input: "focus-within:outline-hidden" }}
      {...others}
      size="md"
      variant="ghost"
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
}
