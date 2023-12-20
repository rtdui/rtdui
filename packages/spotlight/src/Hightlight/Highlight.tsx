import React from "react";
import { highlighter } from "./highlighter";

export interface HighlightProps
  extends Omit<React.ComponentPropsWithoutRef<"span">, "color"> {
  /** Substring or an array of substrings to highlight in `children` */
  highlight: string | string[];

  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "neutral";

  /** String parts of which must be highlighted */
  children: string;
}

const defaultProps: Partial<HighlightProps> = {};

export const Highlight = React.forwardRef<HTMLSpanElement, HighlightProps>(
  (props, ref) => {
    const { children, highlight, color, ...others } = props;

    const highlightChunks = highlighter(children, highlight);

    return (
      <span ref={ref} {...others}>
        {highlightChunks.map(({ chunk, highlighted }, i) =>
          highlighted ? (
            <mark key={i} data-highlight={chunk}>
              {chunk}
            </mark>
          ) : (
            <span key={i}>{chunk}</span>
          )
        )}
      </span>
    );
  }
);
