import { InputBase, type InputBaseOwnProps } from "../InputBase";
import type { ThemeSize } from "../theme.types";

export interface TextInputProps
  extends InputBaseOwnProps,
    Omit<React.ComponentProps<"input">, "size"> {
  size?: ThemeSize;
}

export function TextInput(props: TextInputProps) {
  return <InputBase {...props} as="input" />;
}
