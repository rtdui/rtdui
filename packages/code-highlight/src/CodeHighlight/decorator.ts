import type { RefractorElement, RefractorRoot, Text } from "refractor";

/** Get the plain-text value of a hast node. */
function getNodeText(node: any) {
  function one(node: any) {
    if (node.type === "text") {
      return node.value;
    }
    return "children" in node ? all(node) : "";
  }
  function all(node: any) {
    let index = -1;
    const result: string[] = [];
    while (++index < node.children.length) {
      result[index] = one(node.children[index]);
    }

    return result.join("");
  }

  // “The concatenation of data of all the Text node descendants of the context
  // object, in tree order.”
  if ("children" in node) {
    return all(node);
  }

  // “Context object’s data.”
  return "value" in node ? (node.value as string) : "";
}

/** 过滤tree中的节点 */
function filterTree(
  tree: RefractorRoot,
  test: (node: any, index?: number, parent?: any) => boolean
) {
  const cascade = true;

  function preorder(node: any, index?: number, parentNode?: any) {
    const children: Array<RefractorElement | Text> = [];

    if (!test(node, index, parentNode)) return undefined;

    if ("children" in node && node.children !== undefined) {
      let childIndex = -1;
      while (++childIndex < node.children.length) {
        const result = preorder(node.children[childIndex], childIndex, node);

        if (result) {
          children.push(result);
        }
      }

      if (cascade && node.children.length > 0 && children.length === 0) {
        return undefined;
      }
    }

    // Create a shallow clone, using the new children.
    const next: any = {};
    for (const key in node) {
      if (Object.prototype.hasOwnProperty.call(node, key)) {
        next[key] = key === "children" ? children : node[key];
      }
    }

    return next;
  }

  return preorder(tree);
}

/**
 * 将形如1,3-4解析到[1,3,4]数组
 * @param strRange
 * @returns
 */
function rangeParser(strRange: string) {
  const res = [];
  let m:RegExpMatchArray|null;

  for (const str of strRange.split(",").map((str) => str.trim())) {
    // just a number
    if (/^-?\d+$/.test(str)) {
      res.push(Number.parseInt(str, 10));
    } else if (
      (m = str.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/))
    ) {
      // 1-5 or 1..5 (equivalent) or 1...5 (doesn't include 5)
      const [_, lhs, sep, rhs] = m;

      if (lhs && rhs) {
        const n_lhs = Number.parseInt(lhs, 10);
        let n_rhs = Number.parseInt(rhs, 10);
        const incr = n_lhs < n_rhs ? 1 : -1;

        // Make it inclusive by moving the right 'stop-point' away by one.
        if (sep === "-" || sep === ".." || sep === "\u2025") n_rhs += incr;

        for (let i = n_lhs; i !== n_rhs; i += incr) res.push(i);
      }
    }
  }

  return res;
}

const calculateLinesToHighlight = (meta: string) => {
  const RE = /{([\d,-]+)}/;
  // Remove space between {} e.g. {1, 3}
  const parsedMeta = meta
    .split(",")
    .map((str) => str.trim())
    .join();
  if (RE.test(parsedMeta)) {
    const strlineNumbers = (RE.exec(parsedMeta) || [])[1];
    const lineNumbers = rangeParser(strlineNumbers);
    return (index: number) => lineNumbers.includes(index + 1);
  }
  return () => false;
};

const calculateStartingLine = (meta: string) => {
  const RE = /showLineNumbers=(?<lines>\d+)/i;
  // pick the line number after = using a named capturing group
  if (RE.test(meta)) {
    const { groups } = RE.exec(meta)!;
    return Number(groups!.lines);
  }
  return 1;
};

/**
 * Create container AST for node lines
 */
const createLineNodes = (number: number) => {
  const a = new Array(number);
  for (let i = 0; i < number; i++) {
    a[i] = {
      type: "element",
      tagName: "span",
      properties: { className: [] },
      children: [],
    };
  }
  return a;
};
/**
 * Split multiline text nodes into individual nodes with positioning
 * Add a node start and end line position information for each text node
 */
const addNodePositionClosure = () => {
  let startLineNum = 1;

  const addNodePosition = (ast: (RefractorElement | Text)[]) => {
    return ast.reduce((result, node) => {
      if (node.type === "text") {
        const { value } = node;
        const numLines = (value.match(/\n/g) || "").length;
        if (numLines === 0) {
          node.position = {
            // column: 1 is needed to avoid error with @next/mdx
            // https://github.com/timlrx/rehype-prism-plus/issues/44
            start: { line: startLineNum, column: 1 },
            end: { line: startLineNum, column: 1 },
          };
          result.push(node);
        } else {
          const lines = value.split("\n");
          for (const [i, line] of lines.entries()) {
            result.push({
              type: "text",
              value: i === lines.length - 1 ? line : `${line}\n`,
              position: {
                start: { line: startLineNum + i, column: 1 },
                end: { line: startLineNum + i, column: 1 },
              },
            });
          }
        }
        startLineNum += numLines;

        return result;
      }

      if (Object.prototype.hasOwnProperty.call(node, "children")) {
        const initialLineNum = startLineNum;
        //@ts-expect-error arg count
        node.children = addNodePosition(node.children, startLineNum);
        result.push(node);
        node.position = {
          start: { line: initialLineNum, column: 1 },
          end: { line: startLineNum, column: 1 },
        };
        return result;
      }

      result.push(node);
      return result;
    }, [] as any[]);
  };
  return addNodePosition;
};
/** 给refractor生成的节点树附加行高亮和行号装饰器 */
export function decorator(
  refractorRoot: RefractorRoot,
  diff: boolean,
  meta: string
) {
  refractorRoot.children = addNodePositionClosure()(refractorRoot.children);

  // Add position info to root
  if (refractorRoot.children.length > 0) {
    refractorRoot.position = {
      start: {
        line: refractorRoot.children[0].position!.start.line,
        column: 0,
      },
      end: {
        line: refractorRoot.children[refractorRoot.children.length - 1]
          .position!.end.line,
        column: 0,
      },
    };
  } else {
    refractorRoot.position = {
      start: { line: 0, column: 0 },
      end: { line: 0, column: 0 },
    };
  }

  const shouldHighlightLine = calculateLinesToHighlight(meta);
  const startingLineNumber = calculateStartingLine(meta);
  const codeLineArray = createLineNodes(refractorRoot.position.end.line);

  for (const [i, line] of codeLineArray.entries()) {
    // Default class name for each line
    line.properties.className = ["code-line"];

    // Syntax highlight
    const treeExtract = filterTree(
      refractorRoot,
      (node: any) =>
        node.position.start.line <= i + 1 && node.position.end.line >= i + 1
    );
    line.children = treeExtract.children;

    // Line number
    if (meta.toLowerCase().includes("showLineNumbers".toLowerCase())) {
      line.properties.line = [(i + startingLineNumber).toString()];
      line.properties.className.push("line-number");
    }

    // Line highlight
    if (shouldHighlightLine(i)) {
      line.properties.className.push("highlight-line");
    }

    // Diff classes
    if (diff && getNodeText(line).trim().substring(0, 1) === "-") {
      line.properties.className.push("deleted");
    } else if (diff && getNodeText(line).trim().substring(0, 1) === "+") {
      line.properties.className.push("inserted");
    }
  }

  // Remove possible trailing line when splitting by \n which results in empty array
  if (
    codeLineArray.length > 0 &&
    getNodeText(codeLineArray[codeLineArray.length - 1]).trim() === ""
  ) {
    codeLineArray.pop();
  }

  refractorRoot.children = codeLineArray;
}
