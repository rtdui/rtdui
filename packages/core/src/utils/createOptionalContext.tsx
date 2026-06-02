import { createContext, useContext } from "react";

export function createOptionalContext<ContextValue>(
  initialValue: ContextValue | null = null,
) {
  const Context = createContext<ContextValue | null>(initialValue);

  const useOptionalContext = () => useContext(Context);

  return [Context, useOptionalContext] as const;
}
