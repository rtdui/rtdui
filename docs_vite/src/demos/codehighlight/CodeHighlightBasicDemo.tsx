import { CodeHighlight } from "@rtdui/code-highlight";

export default function CodeHighlightBasicDemo() {
  const code = `
import React from "react";

function Demo(props) {
  const {className} = props
  return <div className={className}>hello world!</div>
}
`;
  return <CodeHighlight code={code} language="jsx" />;
}