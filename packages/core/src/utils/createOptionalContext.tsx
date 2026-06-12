import { createContext, use } from "react";

export function createOptionalContext<TValue>(
  initialValue: TValue | null = null,
) {
  const Context = createContext<TValue | null>(initialValue);

  const useOptionalContext = () => use(Context);

  return [Context, useOptionalContext] as const;
}
