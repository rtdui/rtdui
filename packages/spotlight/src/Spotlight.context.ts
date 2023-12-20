import { createSafeContext } from "@rtdui/core";
import { SpotlightStore } from "./spotlight.store";

interface SpotlightContextValue {
  query: string;
  setQuery: (query: string) => void;
  store: SpotlightStore;
  closeOnActionTrigger: boolean | undefined;
}

export const [SpotlightProvider, useSpotlightContext] =
  createSafeContext<SpotlightContextValue>(
    "Spotlight component was not found in tree"
  );
