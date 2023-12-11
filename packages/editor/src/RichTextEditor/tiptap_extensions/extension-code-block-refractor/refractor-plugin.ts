import { findChildren } from "@tiptap/core";
import { Node as ProsemirrorNode } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

function parseNodes(
  nodes: any[],
  className: string[] = []
): { text: string; classes: string[] }[] {
  return nodes
    .map((node) => {
      const classes = [
        ...className,
        ...(node.properties ? node.properties.className : []),
      ];

      if (node.children) {
        return parseNodes(node.children, classes);
      }

      return {
        text: node.value,
        classes,
      };
    })
    .flat();
}

function getDecorations({
  doc,
  name,
  refractor,
  defaultLanguage,
}: {
  doc: ProsemirrorNode;
  name: string;
  refractor: any;
  defaultLanguage: string | null | undefined;
}) {
  const decorations: Decoration[] = [];

  findChildren(doc, (node) => node.type.name === name).forEach((block) => {
    let from = block.pos + 1;
    const language: string = block.node.attrs.language || defaultLanguage;
    let rootLang = language;
    if (language.includes("diff-")) {
      // eslint-disable-next-line prefer-destructuring
      rootLang = language.split("-")[1];
    }

    const ast = refractor.registered(rootLang)
      ? refractor.highlight(block.node.textContent, rootLang)
      : refractor.highlight(block.node.textContent, "tsx");

    const nodes = ast.children || [];
    parseNodes(nodes).forEach((node) => {
      const to = from + node.text.length;

      if (node.classes.length) {
        const decoration = Decoration.inline(from, to, {
          class: node.classes.join(" "),
        });

        decorations.push(decoration);
      }

      from = to;
    });
  });

  return DecorationSet.create(doc, decorations);
}

function isFunction(param: Function) {
  return typeof param === "function";
}

export function RefractorPlugin({
  name,
  refractor,
  defaultLanguage,
}: {
  name: string;
  refractor: any;
  defaultLanguage: string | null | undefined;
}) {
  if (
    !["highlight", "register", "alias", "registered", "listLanguages"].every(
      (api) => isFunction(refractor[api])
    )
  ) {
    throw Error(
      "You should provide an instance of refractor to use the extension-code-block-refractor"
    );
  }

  const refractorPlugin: Plugin<any> = new Plugin({
    key: new PluginKey("refractor"),

    state: {
      init: (_, { doc }) =>
        getDecorations({
          doc,
          name,
          refractor,
          defaultLanguage,
        }),
      apply: (transaction, decorationSet, oldState, newState) => {
        const oldNodeName = oldState.selection.$head.parent.type.name;
        const newNodeName = newState.selection.$head.parent.type.name;
        const oldNodes = findChildren(
          oldState.doc,
          (node) => node.type.name === name
        );
        const newNodes = findChildren(
          newState.doc,
          (node) => node.type.name === name
        );

        if (
          transaction.docChanged &&
          // Apply decorations if:
          // selection includes named node,
          ([oldNodeName, newNodeName].includes(name) ||
            // OR transaction adds/removes named node,
            newNodes.length !== oldNodes.length ||
            // OR transaction has changes that completely encapsulte a node
            // (for example, a transaction that affects the entire document).
            // Such transactions can happen during collab syncing via y-prosemirror, for example.
            transaction.steps.some((step) => {
              // @ts-ignore
              return (
                // @ts-ignore
                step.from !== undefined &&
                // @ts-ignore
                step.to !== undefined &&
                oldNodes.some((node) => {
                  // @ts-ignore
                  return (
                    // @ts-ignore
                    node.pos >= step.from &&
                    // @ts-ignore
                    node.pos + node.node.nodeSize <= step.to
                  );
                })
              );
            }))
        ) {
          return getDecorations({
            doc: transaction.doc,
            name,
            refractor,
            defaultLanguage,
          });
        }

        return decorationSet.map(transaction.mapping, transaction.doc);
      },
    },

    props: {
      decorations(state) {
        return refractorPlugin.getState(state);
      },
    },
  });

  return refractorPlugin;
}
