import { forwardRef } from "react";
import {
  Input,
  InputOwnProps,
  InputWrapperOwnProps,
  useInputProps,
} from "../Input";
import { PolymorphicComponentProps } from "../Polymorphic";

export interface InputBaseOwnProps
  extends InputOwnProps,
    InputWrapperOwnProps {}

// Merge own props with others inherited from the underlying element type
export type InputBaseProps<E extends React.ElementType> =
  PolymorphicComponentProps<E, InputBaseOwnProps>;

const defaultElement = "input";

/** 多态组件 */
export const InputBase: <E extends React.ElementType = typeof defaultElement>(
  props: InputBaseProps<E>
  // eslint-disable-next-line react/display-name
) => React.ReactNode = forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    props: InputBaseProps<E>,
    ref: typeof props.ref
  ) => {
    const { wrapperProps, inputProps, ...others } = useInputProps(props);
    return (
      <Input.Wrapper {...wrapperProps}>
        <Input {...inputProps} {...others} ref={ref} />
      </Input.Wrapper>
    );
  }
);

(InputBase as any).displayName = "@rtdui/core/InputBase";
