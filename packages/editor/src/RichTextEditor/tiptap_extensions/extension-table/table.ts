import { Table } from "@tiptap/extension-table";
import { Plugin } from "@tiptap/pm/state";

/** 只留作例子, 未使用 */
export const CustomTable = Table.extend({
  addProseMirrorPlugins() {
    const { View, cellMinWidth } = this.options;

    return [
      ...(this.parent?.() ?? []),
      new Plugin({
        props: {
          nodeViews: {
            [this.name]: (node, view) =>
              new (View as unknown as new (
                node: any,
                cellMinWidth: any,
                view: any,
              ) => any)(node, cellMinWidth, view),
          },
        },
      }),
    ];
  },
});
