import { CodeHighlight } from "@rtdui/code-highlight";

export default function Demo() {
	const code = `
import React from "react";

function Demo(props) {
  const {className} = props
  return <div className={className}>hello world!</div>
}
`;
	return (
		<CodeHighlight
			code={code}
			language="jsx"
			copyLabel="拷贝代码"
			copiedLabel="已拷贝到剪贴板"
		/>
	);
}
Demo.displayName = "CodeHighlightCopyBtnLabelDemo";
