import { ShikiHighlight } from "@rtdui/shiki-highlight";

export default function Demo() {
	const code = `
import React from "react";

function Demo(props) {
  const {className} = props;
  const {className, ...other} = props;
  const str = "hello"; 
  const int = 123;

  // comment hello
  console.log(foo(5));

  return <div className={className}>hello world!</div>
}
`;
	return <ShikiHighlight code={code} language="jsx" />;
}
Demo.displayName = "ShikiHighlightBasicDemo";
