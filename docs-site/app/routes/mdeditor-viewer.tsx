import { useNavigate } from "@remix-run/react";
import { MdViewer, zhLocale } from "@rtdui/md-editor";
import "highlight.js/styles/atom-one-dark.min.css";
import "katex/dist/katex.min.css";
import { useRef } from "react";

const md = `# 目录

# 语法示例

## Markdown标准语法 (CommonMark)

### 强调

*斜体*

**粗体**

***粗斜体***

### 引用

> 引用文本
>> 引用支持嵌套
>>> 嵌套的引用文本

### 链接
[link](https://www.baidu.com)

### 图片
![alt](https://img.touxiangkong.com/upload/2022/12/202212111670725005843539.jpg "title")

### 无序列表

- ul item 1
- ul item 2
- ul item 3
    - ul nest item 1
    - ul nest item 2

### 有序列表

1. ol item 1
2. ol item 2
3. ol item 3
    1. ol nest item 1
    2. ol nest item 2

### 内联代码
This is inline\`code\`demo

### 缩进代码块

    这里是缩进代码块
    缩进代码块无代码高亮

### 围栏代码块

\`\`\`
这里是围栏代码块
可以是任何文本
\`\`\`

### 分隔线

---

## Markdown扩展语法

### 围栏代码块语法高亮

\`\`\`tsx
export type A = "123" | "3423";
const a = 123;
function fn() {

  let b = "abc";
  let c = /^xyz$/;
  // this is line comment
  /** 
   * this is block comment
   * @default 123
   */
  const d = {
    aaa: 123,
    bbb: "abc",
    ccc: true,
    ddd: false,
    fff: null,
    ggg: 456n,
    hhh: undefined
  }
}

class MyClass {
  private a = 123;
  static b = \`123\`;
  c = "dafa\\"啊打发打发"
}
\`\`\`


### GFM 扩展

#### 删除线

~~delete~~

#### 表格

| 标题1     | 标题2   | 标题3   |
| -        | -       | -       |
| asdfadsf | adfadsf |daadsfads|
| asdfadsf | adfadsf |daadsfads|
| asdfadsf | adfadsf |daadsfads|
| asdfadsf | adfadsf |daadsfads|

#### 任务列表
- [ ] no checked
- [x] checked

### Katex 数学公式扩展

#### 内联数学公式

这是内联数学公式:$E=mc^2$

#### 块级数学公式

$$
\\begin{aligned}
T( (v_1 + v_2) \\otimes w) &= T(v_1 \\otimes w) + T(v_2 \\otimes w) \\\\
T( v \\otimes (w_1 + w_2)) &= T(v \\otimes w_1) + T(v \\otimes w_2) \\\\
T( (\\alpha v) \\otimes w ) &= T( \\alpha ( v \\otimes w) ) \\\\
T( v \\otimes (\\alpha w) ) &= T( \\alpha ( v \\otimes w) ) \\\\
\\end{aligned}
$$

### Mermaid 图表扩展

\`\`\`mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
John-->>Alice: Great!
Alice-)John: See you later!
\`\`\`

### Gemoji 表情扩展

gemoji: :cat: :thumbsup:
`;

export default function MdViewerDemo() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  return (
    <MdViewer
      ref={ref}
      className="mx-auto py-8 max-w-screen-lg"
      locale={zhLocale}
      value={md}
      // 修复Root路由模块中的Remix的 <ScrollRestoration /> 组件导致锚点到页面元素id需要点击两下的问题
      onClick={(e) => {
        const sourceTarget = e.target as HTMLElement;
        if (sourceTarget.tagName !== "A") return;

        const href = sourceTarget.getAttribute("href");
        if (!href?.startsWith("#")) return;

        navigate(
          {
            hash: href,
          },
          { replace: true, preventScrollReset: true }
        );
        ref.current?.querySelector(decodeURIComponent(href))?.scrollIntoView();
        e.preventDefault();
      }}
    />
  );
}
