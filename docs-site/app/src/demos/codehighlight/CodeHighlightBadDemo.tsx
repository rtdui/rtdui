import { CodeHighlight } from "@rtdui/code-highlight";

export default function Demo() {
	const code = `
import React from "react";

function Demo(props) {
  const {className} = props
  return <div className={className}>hello world!</div>
}
`;
	return <CodeHighlight code={code} language="jsx" bad />;
}
Demo.displayName = "CodeHighlightBadDemo";
