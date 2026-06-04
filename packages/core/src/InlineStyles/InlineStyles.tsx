import type { InlineStylesInput } from "./styles-to-string";
import { stylesToString } from "./styles-to-string";

export interface InlineStylesProps
  extends
    InlineStylesInput,
    Omit<React.ComponentProps<"style">, keyof InlineStylesInput> {}

export function InlineStyles(props: InlineStylesProps) {
  const { selector, styles, media } = props;
  return (
    <style
      data-styles="inline"
      dangerouslySetInnerHTML={{
        __html: stylesToString({ selector, styles, media }),
      }}
    />
  );
}
