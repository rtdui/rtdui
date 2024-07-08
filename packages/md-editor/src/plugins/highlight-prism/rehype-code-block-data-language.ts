import { visit } from "unist-util-visit";

const getLanguage = (node: any) => {
  const className = node.properties.className;
  for (const classListItem of className) {
    if (classListItem.slice(0, 9) === "language-") {
      return classListItem.slice(9).toLowerCase();
    }
  }
  return null;
};

/**
 * 这个MDX插件给pre元素额外添加data-language特性, 方便为CSS的content属性设置attr([data-language])
 */
export function rehypeCodeBlockDataLanguage(
  options:
    | {
        defaultLanguage?: string;
      }
    | undefined = { defaultLanguage: "txt" }
) {
  function visitor(node: any, index: number, parent: any) {
    if (!parent || parent.tagName !== "pre" || node.tagName !== "code") {
      return;
    }
    // Coerce className to array
    if (node.properties.className) {
      if (typeof node.properties.className === "boolean") {
        node.properties.className = [];
      } else if (!Array.isArray(node.properties.className)) {
        node.properties.className = [node.properties.className];
      }
    } else {
      node.properties.className = [];
    }

    let lang = getLanguage(node);
    if (!lang && options.defaultLanguage) {
      lang = options.defaultLanguage;
    }
    let rootLang;
    if (lang?.includes("diff-")) {
      rootLang = lang.split("-")[1];
    } else {
      rootLang = lang;
    }
    parent.properties["data-language"] = rootLang;
  }

  return (tree: any) => {
    visit(tree, "element" as any, visitor as any);
  };
}
