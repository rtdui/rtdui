export function useInputProps(props: any) {
  const {
    label,
    description,
    error,
    required,
    className,
    errorProps,
    labelProps,
    descriptionProps,
    wrapperProps: _wrapperProps,
    id,
    size,
    style,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    ...others
  } = props;

  const wrapperProps = {
    label,
    description,
    error,
    required,
    className,
    errorProps,
    labelProps,
    descriptionProps,
    size,
    style,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    id,
    ..._wrapperProps,
  };

  return {
    ...others,
    wrapperProps: { ...wrapperProps } as typeof wrapperProps,
    inputProps: {
      required,
      size,
      error,
      id,
    },
  };
}
