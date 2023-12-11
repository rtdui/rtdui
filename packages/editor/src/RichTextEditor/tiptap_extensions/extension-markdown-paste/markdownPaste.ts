import { Extension, elementFromString } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import MarkdownIt from "markdown-it";
import { DOMParser as ProseMirrorDOMParser } from "@tiptap/pm/model";
import markdownItKatex from "./markdown-it-katex";

export const MarkdownPaste = Extension.create({
  name: "markdownPaste",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("markdownPaste"),
        props: {
          handlePaste: (view, event) => {
            // 不在段落内的粘贴不作为mardown处理.
            if (view.state.selection.$head.parent.type.name !== "paragraph") {
              return false;
            }
            // 渲染Markdown内容
            const markdownit = new MarkdownIt({
              html: false, // 不允许mardown中有html, 标准的markdown规范是允许的
              highlight: (str, lang) => "", // 返回空字符串表示不需要进行语法处理. 在外部由CodeBlockLowlight扩展处理, 只需要使用默认的<pre><code class="language-xxx">包裹即可
              linkify: true, // 自动识别超链接
              breaks: true, // 启用软换行, 即行尾的回车即会创建<br/>. 标准的markdown规范需要在行尾两个空格加一个回车才会创建<br/>.
            }).use(markdownItKatex);
            const html = markdownit.render(
              event.clipboardData?.getData("text") || ""
            );

            // 过滤掉非法的内容
            const body = elementFromString(html);
            const node = ProseMirrorDOMParser.fromSchema(
              this.editor.schema
            ).parse(body);
            // 插入过滤后的内容
            this.editor.commands.insertContent(node.toJSON());

            return true; // 返回true, 表示已作了粘贴处理, 阻止冒泡.
          },
          // Here is the full list: https://prosemirror.net/docs/ref/#view.EditorProps
        },
      }),
    ];
  },
});
