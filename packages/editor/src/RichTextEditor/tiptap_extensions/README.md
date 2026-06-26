# 自定义的 Tiptap 扩展

Tiptap 基于 prosemirror, 因此 tiptap 遵循 prosemirror 内容结构的架构(Schema)定义. Schema 非常的严格, 任何未在架构中定义的 HTML 元素或属性都会被丢弃。

自定义的 Tiptap 扩展提供的功能:

- prism 语法高亮并显示代码行号

  该功能通过 code-block-prism 扩展实现, 它继承自官方的 code-block 扩展, 使其支持 prism 语法高亮, 同时显示代码行号.

  原理: 利用 prosemirror 的装饰器功能, 对`<pre>...</pre>`包裹的文本使用 prism 进行渲染, 同时使用 prism 的行号插件进行渲染, 分别将渲染的结果作为各自装饰器的内容.

- 将粘贴的 markdown 内容渲染为合法的 tiptap 的 html 内容. 为实现这个功能提供了一组扩展:
  1. markdownPaste 扩展, 用于对粘贴的内容渲染为合法的 tiptap 的 html 内容
     原理: 自定义 prosemirror 插件监听粘贴事件, 在事件中将粘贴内容用 markdown-it 库进行渲染, 然后将渲染后的 html 文本插入到 tiptap 的内容中, 内容的转换工作仍由 tiptap 处理, 因此该有的 tiptap Schema 必须得有, 否则会被丢弃.

     在 markdown-it 渲染时还使用了自定义的 markdown-it-katex 插件, 用来保留 Katex 数学公式中的两个`\`, 在 Katex 中两个`\`表示换行.

  2. math-extension 扩展用于渲染 Tiptap 数学公式.

     原理: 利用 prosemirror 的装饰器功能, 对`$...$`和`$$...$$`包裹的文本使用 Tatex 渲染, 将渲染的结果作为装饰器的内容.

- 图片自动上传和插入, 同时用户可对插入的图片调整尺寸

  uploadImageWithResizable 扩展实现了本地图片上传并插入到 titap 的内容中. 同时用户可对插入的图片调整尺寸
  原理: 重写了官方提供的 Image 扩展, 提供了上传图片命令, 上传前会对图片进行压缩处理. 图片调整使用了自定义的 React 组件实现, 内部使用了 re-resizable 库实现用户的拖拉调整处理.

# 内置扩展说明

- BubbleMenu extension
  如果你正在使用像React或Vue这样的框架, 请使用框架特定的BubbleMenu组件, 而不是直接使用改扩展。该组件提供了更方便的API,并为你处理DOM元素。

  ```tsx
  // tiptap v3+
  import { BubbleMenu } from "@tiptap/react/menus";
  ```

  BubbleMenu组件默认情况下, 当选中文本时出现一个气泡菜单。可以使用`shouldShow`属性自定义出现条件

- FloatingMenu extension
  如果你正在使用像React或Vue这样的框架, 请使用框架特定的FloatingMenu组件, 而不是直接使用改扩展。该组件提供了更方便的API,并为你处理DOM元素。

  ```tsx
  // tiptap v3+
  import { FloatingMenu } from "@tiptap/react/menus";
  ```

  FloatingMenu组件默认情况下, 在空行上显示浮动菜单. 可以使用`shouldShow`属性自定义出现条件

- @tiptap/starter-kit
  整合了多个基础扩展:
  Nodes:
  Blockquote,BulletList,CodeBlock,Document,HardBreak,Heading,HorizontalRule,ListItem,OrderedList,Paragraph,Text
  Marks:
  Bold,Code,Italic,Link (New in v3),Strike,Underline (New in v3)
  Functionality:
  Dropcursor,Gapcursor,UndoRedo,ListKeymap (New in v3),TrailingNode (New in v3)
- @tiptap/extension-text-style
  TextStyleKit是一系列最常见的Tiptap文本样式扩展的集合
- @tiptap/extension-table
  TableKit是一系列必要的Tiptap表格扩展的集合：
  Nodes:
  Table,TableCell,TableHeader,TableRow
  Kit:
  TableKit
- @tiptap/extension-list
  ListKit是所有必要的Tiptap列表扩展的集合:
  Nodes:
  BulletList,ListItem,OrderedList,TaskItem,TaskList
  Functionality:
  ListKeymap
  Kit:
  ListKit
- @tiptap/extensions
  整合了多个实用功能扩展:
  Functionality:
  CharacterCount,Dropcursor,Gapcursor,UndoRedo (before named History),Placeholder,TrailingNode,Focus,Selection
