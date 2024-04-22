import { forwardRef } from "react";
import clsx from "clsx";
import TextareaAutosize from "react-textarea-autosize";
import { InputBase, InputBaseOwnProps } from "../InputBase";

export interface TextAreaProps
  extends InputBaseOwnProps,
    React.ComponentPropsWithoutRef<"textarea"> {
  /** Determines whether the textarea height should grow with its content
   * @default faslse
   */
  autosize?: boolean;

  /** Maximum rows for autosize textarea to grow, ignored if `autosize` prop is not set */
  maxRows?: number;

  /** Minimum rows of autosize textarea, ignored if `autosize` prop is not set */
  minRows?: number;

  /** Controls `resize` CSS property
   * @default "none"
   */
  resize?: React.CSSProperties["resize"];
}

/** TextArea继承了textarea的所有属性 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      autosize = false,
      minRows = 2,
      maxRows,
      resize = "none",
      style,
      ...others
    } = props;

    const shouldAutosize = autosize;
    const autosizeProps = shouldAutosize ? { maxRows, minRows } : {};

    return (
      <InputBase
        as={shouldAutosize ? TextareaAutosize : "textarea"}
        ref={ref}
        {...others}
        multiline
        data-no-overflow={(autosize && maxRows === undefined) || undefined}
        style={
          {
            ...style,
            "--input-resize": resize,
          } as any
        }
        {...autosizeProps}
      />
    );
  }
);

TextArea.displayName = "@rtdui/TextArea";
