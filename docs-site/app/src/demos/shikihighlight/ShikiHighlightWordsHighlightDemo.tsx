import { ShikiHighlight } from "@rtdui/shiki-highlight";

export default function Demo() {
	const code = `
// [!code word:hello]
import React from "react";

function Demo(props) {
  const {className, ...other} = props;
  const str = "hello"; 
  const int = 123;

  // comment hello
  console.log(foo(5));

  return <div className={className}>hello world!</div>
}
`;
	const code2 = `
import React from "react";

function Demo(props) {
  const {className, ...other} = props;
  // [!code word:hello:1]
  const str = "hello"; 
  const int = 123;

  // comment hello
  console.log(foo(5));

  return <div className={className}>hello world!</div>
}
`;
	return (
		<>
			<ShikiHighlight code={code} language="jsx" />
			<ShikiHighlight code={code2} language="jsx" />
		</>
	);
}
Demo.displayName = "ShikiHighlightWordsHighlightDemo";
