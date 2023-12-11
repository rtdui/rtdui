import React from "react";
import type { InlineStylesInput } from "./styles-to-string";
import { stylesToString } from "./styles-to-string";

export interface InlineStylesProps
  extends InlineStylesInput,
    Omit<React.ComponentPropsWithoutRef<"style">, keyof InlineStylesInput> {}

export function InlineStyles({ selector, styles, media }: InlineStylesInput) {
  return (
    <style
      data-styles="inline"
      dangerouslySetInnerHTML={{
        __html: stylesToString({ selector, styles, media }),
      }}
    />
  );
}
