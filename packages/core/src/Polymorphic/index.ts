import { BoxProps } from "./Box";

export * from "./Box";

export type PolymorphicComponentProps<E extends React.ElementType, P> = P &
	BoxProps<E>;

export type PolymorphicComponent<P, D extends React.ElementType = "div"> = <
	E extends React.ElementType = D,
>(
	props: PolymorphicComponentProps<E, P>,
) => React.ReactElement | null;
