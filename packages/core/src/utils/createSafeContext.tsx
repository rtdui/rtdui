import React from "react";

export function createSafeContext<ContextValue>(errorMessage: string) {
  const Context = React.createContext<ContextValue | null>(null);

  const useSafeContext = () => {
    const ctx = React.useContext(Context);

    if (ctx === null) {
      throw new Error(errorMessage);
    }

    return ctx;
  };

  const Provider = ({
    children,
    value,
  }: {
    value: ContextValue;
    children: React.ReactNode;
  }) => <Context.Provider value={value}>{children}</Context.Provider>;

  return [Provider, useSafeContext] as const;
}
