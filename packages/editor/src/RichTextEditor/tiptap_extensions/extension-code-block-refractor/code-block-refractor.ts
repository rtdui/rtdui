import { CodeBlock, CodeBlockOptions } from "@tiptap/extension-code-block";
import { RefractorPlugin } from "./refractor-plugin.js";

export interface CodeBlockPrismOptions extends CodeBlockOptions {
  refractor: any;
  defaultLanguage: string | null | undefined;
}
/**
 * 基于[refractor](https://github.com/wooorm/refractor)实现Prism, 它和lowlight是同一作者,并且有类似的API.
 * refractor内置了修改过的Prsim源码, 为的是剔除掉Prism中全局变量和全局影响的代码. 因此不需要再安装prsim包.
 * 相同原因,语言也必须使用refractor内建的语言. 支持的语言在: refractor/lang/*.js
 *
 * 这个扩展完全按'@tiptap'官方的@tiptap/extension-code-block-lowlight扩展修改.
 */
export const CodeBlockPrism = CodeBlock.extend<CodeBlockPrismOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      refractor: {},
      defaultLanguage: "txt",
    };
  },
  addAttributes() {
    return {
      language: {
        default: "txt",
        parseHTML: (element) => {
          const { languageClassPrefix } = this.options;
          const classNames = [
            ...((element.firstElementChild?.classList as unknown as string[]) ||
              []),
          ];
          const languages = classNames
            .filter((className) => className.startsWith(languageClassPrefix))
            .map((className) => className.replace(languageClassPrefix, ""));
          const language = languages[0];

          if (!language) {
            return "txt";
          }

          return language;
        },
        renderHTML: (attributes) => {
          return {
            class: `language-${attributes.language}`,
            "data-language": attributes.language,
          };
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() || []),
      RefractorPlugin({
        name: this.name,
        refractor: this.options.refractor,
        defaultLanguage: this.options.defaultLanguage,
      }),
    ];
  },
});
