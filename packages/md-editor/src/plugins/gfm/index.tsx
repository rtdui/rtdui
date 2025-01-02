import remarkGfm, { type Options } from "remark-gfm";
import type { Locale, Plugin } from "../../types";
import { appendBlock, replaceLines, wrapText } from "../../utils/codemirror";
import en from "../../locales/en.json";
import {
  IconListCheck,
  IconStrikethrough,
  IconTable,
} from "@tabler/icons-react";

const iconSize = 20;
const iconStroke = 1.5;

export interface GfmPluginOptions extends Options {
  locale?: Partial<Locale>;
}
export default function gfm(options: GfmPluginOptions = {}): Plugin {
  const { locale: _locale = {}, ...remarkGfmOptions } = options;
  const locale = { ...en, ..._locale };

  return {
    remark: (processor) => processor.use(remarkGfm, remarkGfmOptions),
    toolbar: [
      {
        type: "single",
        title: locale.strike,
        icon: <IconStrikethrough size={iconSize} stroke={iconStroke} />,
        cheatsheet: `~~${locale.strikeText}~~`,
        click(e, { editor }) {
          wrapText(editor, "~~");
        },
      },
      {
        type: "single",
        title: locale.task,
        icon: <IconListCheck size={iconSize} stroke={iconStroke} />,
        cheatsheet: `- [ ] ${locale.taskText}`,
        click(e, { editor }) {
          replaceLines(editor, (line) => `- [ ] ${line}`);
        },
      },
      {
        type: "single",
        title: locale.table,
        icon: <IconTable size={iconSize} stroke={iconStroke} />,
        click(e, { editor }) {
          appendBlock(editor, locale.tableHeading, {
            prefix: "| ",
            suffix: ` |  |
| --- | --- |
|  |  |`,
          });
        },
      },
    ],
  };
}
