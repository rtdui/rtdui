import { createContext, use } from "react";

export function createSafeContext<TValue>(errorMessage: string) {
  const Context = createContext<TValue | null>(null);

  const useSafeContext = () => {
    const ctx = use(Context);

    if (ctx === null) {
      throw new Error(errorMessage);
    }

    return ctx;
  };

  return [Context, useSafeContext] as const;
}
