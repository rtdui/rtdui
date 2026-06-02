export type BoxOwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
};

export type BoxProps<E extends React.ElementType> = BoxOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof BoxOwnProps>;

const defaultElement = "div";

export function Box<E extends React.ElementType = typeof defaultElement>(
  props: BoxProps<E>,
) {
  const { ref, as: Component = defaultElement, ...other } = props;
  return <Component ref={ref} {...other} as={undefined} />;
}
