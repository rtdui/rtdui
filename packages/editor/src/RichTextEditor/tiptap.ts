import StarterKit from "@tiptap/starter-kit";
// import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import SuperScript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import FloatingMenu from "@tiptap/extension-floating-menu";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { HocuspocusProvider } from "@hocuspocus/provider";
import * as Y from "yjs";
import type { Doc } from "yjs";
import { refractor } from "refractor/lib/all.js";
// import { IndexeddbPersistence } from "y-indexeddb";
// 自定义扩展
import { UploadImageWithResizable } from "./tiptap_extensions/extension-image-upload";
import { MarkdownPaste } from "./tiptap_extensions/extension-markdown-paste";
import {
  MathKatexInline,
  MathKatexBlock,
} from "./tiptap_extensions/extension-math";
import { CodeBlockPrism } from "./tiptap_extensions/extension-code-block-refractor";
import { CustomTable as Table } from "./tiptap_extensions/extension-table";

const instants = new Map<string, HocuspocusProvider>();
function getProvider(docName: string, ydoc: Doc) {
  let provider = instants.get(docName);
  if (!provider) {
    provider = new HocuspocusProvider({
      url: `ws://${window.location.host}/collaboration/${docName}`,
      name: docName,
      document: ydoc,
      onAwarenessUpdate: ({ states }) => {
        const customData = states.find((d) => d.data);
        if (customData) {
          // eslint-disable-next-line no-console
          console.log(customData.data);
        }
      },
    });
    instants.set(docName, provider);
  }
  return provider;
}

// const CodeBlockHighlight = CodeBlockLowlight.configure({
//   lowlight,
//   defaultLanguage: "plaintext",
// });

const CodeBlockPrismjs = CodeBlockPrism.configure({
  refractor,
  defaultLanguage: "tsx",
});

export {
  StarterKit,
  Collaboration,
  CollaborationCursor,
  HocuspocusProvider,
  // IndexeddbPersistence,
  UploadImageWithResizable,
  getProvider,
  Y,
  MarkdownPaste as markdownPasteExtension,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Link,
  TaskList,
  TaskItem,
  SuperScript,
  SubScript,
  Highlight,
  TextAlign,
  Placeholder,
  FloatingMenu,
  CodeBlockPrismjs,
  MathKatexInline,
  MathKatexBlock,
};
