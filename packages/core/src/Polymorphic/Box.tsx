import * as React from "react";

export type BoxOwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
};

export type BoxProps<E extends React.ElementType> = BoxOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof BoxOwnProps>;

const defaultElement = "div";

export const Box: <E extends React.ElementType = typeof defaultElement>(
  props: BoxProps<E>
) => React.ReactNode = React.forwardRef(
  (props: BoxOwnProps, ref: React.Ref<Element>) => {
    const Component = props.as || defaultElement;
    return <Component ref={ref} {...props} as={undefined} />;
  }
);
