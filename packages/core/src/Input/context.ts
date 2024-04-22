import { createOptionalContext } from "../utils";

interface InputWrapperContextValue {
  offsetTop: boolean;
  offsetBottom: boolean;
  describedBy: string | undefined;
  inputId: string | undefined;
  labelId: string | undefined;
}

export const [InputWrapperProvider, useInputWrapperContext] =
  createOptionalContext<InputWrapperContextValue>({
    offsetBottom: false,
    offsetTop: false,
    describedBy: undefined,
    inputId: undefined,
    labelId: undefined,
  });
