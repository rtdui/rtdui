import rehypeKatex, { Options } from "rehype-katex";
import remarkMath from "remark-math";
import type { Plugin, Locale } from "../../types";
import { appendBlock, wrapText } from "../../utils/codemirror";
import en from "../../locales/en.json";
import { IconSum } from "@tabler/icons-react";

const iconSize = 20;
const iconStroke = 1.5;

export interface MathPluginOptions extends Options {
  locale?: Partial<Locale>;
}

export default function math(options: MathPluginOptions = {}): Plugin {
  const { locale: _locale = {}, ...katexOptions } = options;
  const locale = { ...en, ..._locale };

  return {
    remark: (processor) => processor.use(remarkMath),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rehype: (processor) =>
      processor.use<any, any>(rehypeKatex, {
        output: "html",
        ...(katexOptions ?? {}),
      }),
    toolbar: [
      {
        type: "multiple",
        icon: <IconSum size={iconSize} stroke={iconStroke} />,
        title: locale.math,
        actions: [
          {
            title: locale.inline,
            icon: "$",
            cheatsheet: `$${locale.inlineText}$`,
            click: (e, { editor }) => {
              wrapText(editor, "$");
            },
          },
          {
            title: locale.block,
            icon: "$$",
            cheatsheet: `$$↵${locale.blockText}↵$$`,
            click: (e, { editor }) => {
              appendBlock(editor, "\\TeX", {
                prefix: "$$\n",
                suffix: "\n$$",
              });
            },
          },
        ],
      },
    ],
  };
}
