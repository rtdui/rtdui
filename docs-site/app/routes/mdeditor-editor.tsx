import { MdEditor, Mode, UploadResult, zhLocale } from "@rtdui/md-editor";
import { useState } from "react";
import { Checkbox, Divider, Radio, RadioGroup } from "@rtdui/core";
import "allotment/dist/style.css";
import "katex/dist/katex.min.css";

const handleImageUpload = async (files: File[]) => {
	const formdata = new FormData();
	files.forEach((d) => formdata.append("upload", d));
	// const res = await fetch("", {
	//   method: "POST",
	//   body: formdata,
	// });
	// const result = await res.json();
	// return result as UploadResult[];

	return files.map((d) => ({
		fileName: d.name,
		fileUrl:
			"https://img.touxiangkong.com/upload/2022/12/202212111670725005843539.jpg",
	})) as UploadResult[];
};

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

export default function MdEditorDemo() {
	const [value, setValue] = useState(md);

	const [mode, setMode] = useState("auto");

	return (
		<div>
			<div className="flex justify-center gap-4 px-6 py-1 bg-base-200">
				<Checkbox
					size="sm"
					label="dark theme"
					onChange={(checked) => {
						if (checked) {
							document.documentElement.dataset.theme = "dark";
						} else {
							delete document.documentElement.dataset.theme;
						}
					}}
				/>
				<Divider direction="horizontal" />
				<RadioGroup
					label="Mode:"
					className="[&]:flex-row"
					value={mode}
					//@ts-expect-error types
					onChange={setMode}
					slots={{
						groups: "[&]:flex-row [&]:gap-4",
					}}
				>
					<Radio
						value="auto"
						label="auto"
						slots={{ inputWrapper: "[&]:gap-1" }}
					/>
					<Radio value="split" label="split" />
					<Radio value="tab" label="tab" />
				</RadioGroup>
			</div>
			<MdEditor
				locale={zhLocale}
				mode={mode as Mode}
				handleImageUpload={handleImageUpload}
				value={value}
				onChange={setValue}
			/>
		</div>
	);
}
