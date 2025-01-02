import { CodeHighlight } from "@rtdui/code-highlight";

export default function Demo() {
	const code = `
import React from "react";

function Demo(props) {
  const {className} = props
- return <div className={className}>hello world!</div>
+ return <span className={className}>hello world!</span>
}
`;
	return (
		<CodeHighlight
			code={code}
			language="jsx"
			highlingtLines="{1,4-5}"
			diff
			showLineNumbers
		/>
	);
}
Demo.displayName = "CodeHighlightAllDemo";
