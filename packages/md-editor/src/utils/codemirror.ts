import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
  redo,
} from "@codemirror/commands";
import { EditorState, StateEffect } from "@codemirror/state";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import {
  bracketMatching,
  HighlightStyle,
  indentOnInput,
  syntaxHighlighting,
  foldGutter,
  // defaultHighlightStyle,
} from "@codemirror/language";
import { languages } from "@codemirror/language-data";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import {
  EditorView,
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightSpecialChars,
  keymap,
  rectangularSelection,
  lineNumbers,
  highlightActiveLineGutter,
  highlightActiveLine,
  KeyBinding,
} from "@codemirror/view";
import { tags } from "@lezer/highlight";

import { EditorContext, EditorProps, ToolbarItem } from "../types";

export const historyExtraKeymap: readonly KeyBinding[] = [
  { key: "Ctrl-Shift-z", run: redo, preventDefault: true },
];

export const createEditorView = (
  initialValue: string,
  onChange: (v: string) => void,
  parent: HTMLElement
) => {
  const updateListener = EditorView.updateListener.of((vu) => {
    // console.log(vu)
    if (vu.docChanged) {
      onChange(vu.state.doc.toString());
    }
  });

  const theme = EditorView.theme({
    "&": {
      height: "100%",
    },
    "&.cm-focused": {
      outline: 0,
    },
    "& .cm-scroller": {
      fontFamily: "SF Mono, Consolas, Liberation Mono, Menlo, monospace",
      fontSize: "14px",
      overflowY: "auto",
      // padding: "16px",
    },
    "& .cm-gutters": {
      backgroundColor: "oklch(var(--b3))",
    },
  });

  const editorHighlightStyle = HighlightStyle.define([
    /** markdow syntax */
    { tag: tags.meta, color: "#f97316" }, // markdown syntax symbol
    { tag: tags.link, color: "#0ea5e9" },
    { tag: tags.heading, fontWeight: "bold", color: "#0ea5e9" },
    { tag: tags.emphasis, fontStyle: "italic", color: "#f97316" },
    { tag: tags.strong, fontWeight: "bold", color: "#f97316" },
    { tag: tags.strikethrough, textDecoration: "line-through" },
    /** code block */
    { tag: tags.name, color: "#ca8a04" }, // Any kind of identifier, undefined
    { tag: tags.keyword, color: "#a855f7" }, // language keyword
    {
      tag: [tags.atom],
      color: "#f97316",
    },
    {
      tag: [tags.url, tags.labelName],
      color: "#0ea5e9",
    },
    {
      tag: [tags.number, tags.bool, tags.inserted, tags.null],
      color: "#ca8a04",
    },
    {
      tag: [tags.string, tags.special(tags.string), tags.deleted],
      color: "#16a34a",
    },
    {
      tag: [tags.regexp, tags.escape],
      color: "#ef4444",
    },
    { tag: tags.definition(tags.variableName), color: "#f59e0b" },
    { tag: tags.local(tags.variableName), color: "#f59e0b" },
    { tag: [tags.typeName, tags.namespace], color: "#f59e0b" },
    { tag: tags.className, color: "#f59e0b" },
    {
      tag: [tags.special(tags.variableName), tags.macroName],
      color: "#f59e0b",
    },
    { tag: tags.definition(tags.propertyName), color: "#ec4899" },
    { tag: tags.comment, color: "#6b7280" },
    { tag: tags.invalid, color: "#6b7280" },
  ]);

  return new EditorView({
    doc: initialValue,
    extensions: [
      // tweaked from basicSetup: https://github.com/codemirror/basic-setup/blob/b3be7cd30496ee578005bd11b1fa6a8b21fcbece/src/codemirror.ts#L50
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      foldGutter(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      // syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      syntaxHighlighting(editorHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      // autocompletion(),
      rectangularSelection(),
      crosshairCursor(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        // ...foldKeymap,
        // ...completionKeymap,
        // ...lintKeymap,
        ...historyExtraKeymap,
        indentWithTab,
      ]),

      // extra
      EditorView.lineWrapping,
      theme,
      markdown({
        codeLanguages: languages,
        base: markdownLanguage,
      }),
      updateListener,
    ],
    parent,
  });
};

export function injectKeyMap(view: EditorView, toolbarItems: ToolbarItem[]) {
  const keyBindings = toolbarItems
    .flatMap((d) => {
      switch (d.type) {
        case "single": {
          if (d.shortcut) {
            return {
              key: d.shortcut,
              //@ts-expect-error undefined
              run: (v) => d.click(undefined, { editor: v }),
              preventDefault: true,
            } as KeyBinding;
          } else {
            return {};
          }
        }
        case "multiple": {
          return d.actions.flatMap((dd) => {
            if (dd.shortcut) {
              return {
                key: dd.shortcut,
                //@ts-expect-error undefined
                run: (v) => dd.click(undefined, { editor: v }),
                preventDefault: true,
              } as KeyBinding;
            } else {
              return {};
            }
          });
        }
        default:
          return {} as KeyBinding;
      }
    })
    .filter((d) => Object.keys(d).length > 0);

  view.dispatch({
    effects: StateEffect.appendConfig.of(keymap.of(keyBindings)),
  });
}
/**
 * Wrap text with decorators
 *
 * @example
 * `text -> *text*`
 */
export function wrapText(editor: EditorView, prefix: string, suffix = prefix) {
  const selection =
    editor.state.selection.ranges.find((r) => !r.empty) ?? // find the first selection
    editor.state.wordAt(editor.state.selection.main.head) ?? // if not, try to find the word
    editor.state.selection.main;

  const { from, to } = selection;
  const text = editor.state.sliceDoc(from, to); // use from/to instead of anchor/head for reverse select

  const shouldUnwrap =
    editor.state.sliceDoc(from - prefix.length, from) === prefix &&
    editor.state.sliceDoc(to, to + suffix.length) === suffix;
  if (shouldUnwrap) {
    editor.dispatch({
      changes: {
        from: from - prefix.length,
        to: to + suffix.length,
        insert: text,
      },
      selection: {
        anchor: from - prefix.length,
        head: to - prefix.length,
      },
    });
  } else {
    editor.dispatch({
      changes: { from, to, insert: prefix + text + suffix },
      selection: {
        anchor: from + prefix.length,
        head: to + prefix.length,
      },
    });
  }
  editor.focus();
}

/**
 * replace multiple lines
 *
 * @example
 * `line -> # line`
 */
export function replaceLines(
  editor: EditorView,
  replace: Parameters<Array<string>["map"]>[0]
) {
  const [selection] = editor.state.selection.ranges;
  const { from } = editor.state.doc.lineAt(selection.from);
  const { to } = editor.state.doc.lineAt(selection.to);
  const lines = editor.state.sliceDoc(from, to).split("\n");

  editor.dispatch({
    changes: { from, to, insert: lines.map(replace).join("\n") },
  });
  editor.dispatch({
    selection: {
      anchor: from,
      head: editor.state.doc.lineAt(selection.to).to, // recalculate here for updated position
    },
  });
  editor.focus();
}

/**
 * Append a block based on the cursor position
 */
export function appendBlock(
  editor: EditorView,
  content: string,
  { prefix = "", suffix = "" }: { prefix?: string; suffix?: string } = {}
) {
  prefix = `\n\n${prefix}`;
  suffix = `${suffix}\n`;

  const end = editor.state.doc.lineAt(editor.state.selection.main.head).to;
  editor.dispatch({
    changes: { from: end, insert: prefix + content + suffix },
    selection: {
      anchor: end + prefix.length,
      head: end + prefix.length + content.length,
    },
  });
  editor.focus();
}

export function findStartIndex(num: number, nums: number[]) {
  let startIndex = nums.length - 2;
  for (let i = 0; i < nums.length; i++) {
    if (num < nums[i]) {
      startIndex = i - 1;
      break;
    }
  }
  startIndex = Math.max(startIndex, 0); // ensure >= 0
  return startIndex;
}

export const getShortcutWithPrefix = (key: string, shift = false) => {
  const shiftPrefix = shift ? "Shift-" : "";
  const cmdPrefix =
    typeof navigator !== "undefined" && /Mac/.test(navigator.platform)
      ? "Cmd-"
      : "Ctrl-";
  return cmdPrefix + shiftPrefix + key;
};

export async function handleImageUpload(
  { editor }: EditorContext,
  uploadImages: NonNullable<EditorProps["uploadImages"]>,
  files: File[]
) {
  const imgs = await uploadImages(files);
  appendBlock(
    editor,
    imgs
      .map(({ url, alt, title }, i) => {
        alt = alt ?? files[i].name;
        return `![${alt}](${url}${title ? ` "${title}"` : ""})`;
      })
      .join("\n\n")
  );
}
