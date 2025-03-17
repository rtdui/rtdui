import { ShikiHighlight } from "@rtdui/shiki-highlight";

export default function Demo() {
	const code = `
// [!code word:react:1]
import React from "react";

// [!code highlight:1]
function Demo(props) {
  const {className} = props; // [!code --]
  const {className, ...other} = props; // [!code ++]
  // [!code error]
  const str = "hello"; 
  // [!code warning]
  const int = 123;

  // comment hello
  console.log(foo(5));

  return <div className={className}>hello world!</div>
}
`;
	return <ShikiHighlight code={code} language="jsx" showLineNumbers />;
}
Demo.displayName = "ShikiHighlightAllDemo";
