import type { BoxProps } from "./Box";

export * from "./Box";

export type PolymorphicComponentProps<E extends React.ElementType, P> = P &
  Omit<BoxProps<E>, keyof P>;

export type PolymorphicComponent<P, D extends React.ElementType = "div"> = <
  E extends React.ElementType = D,
>(
  props: PolymorphicComponentProps<E, P>,
) => React.ReactElement | null;
