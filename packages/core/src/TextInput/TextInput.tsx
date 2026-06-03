import { InputBase, type InputBaseOwnProps } from "../InputBase";
import type { ThemeSize } from "../theme.types";

export interface TextInputProps
  extends InputBaseOwnProps, Omit<React.ComponentProps<"input">, "size"> {
  size?: ThemeSize;
}

export function TextInput(props: TextInputProps) {
  // @ts-expect-error size属性类型不兼容(多态导致的问题)
  return <InputBase {...props} as="input" />;
}
