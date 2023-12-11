import React from "react";
import { useDidUpdate } from "@rtdui/hooks";
import { TextInput } from "../TextInput/TextInput";
import type { TextInputProps } from "../TextInput/TextInput";

// A debounced input react component

export interface DebouncedInputProps extends Omit<TextInputProps, "onChange"> {
  onChange: (value: string) => void;
  /**
   * 延迟的毫秒数
   * @default 500
   */
  wait?: number;
}

/** ref属性会转发至内部的input元素 */
const DebouncedInput_ = React.forwardRef<HTMLInputElement, DebouncedInputProps>(
  (props, ref) => {
    const { defaultValue, value, onChange, wait = 500, ...other } = props;
    const [innerValue, setInnerValue] = React.useState(
      value ?? defaultValue ?? ""
    );

    // 受控属性改变,同步内部状态
    useDidUpdate(() => {
      setInnerValue(value ?? "");
    }, [value]);

    // 延迟执行onChange属性
    React.useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(innerValue as string);
      }, wait);

      return () => clearTimeout(timeout);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [innerValue]);

    return (
      <TextInput
        ref={ref}
        {...other}
        value={innerValue}
        onChange={(e) => setInnerValue(e.target.value)}
      />
    );
  }
);

export const DebouncedInput = React.memo(DebouncedInput_);
