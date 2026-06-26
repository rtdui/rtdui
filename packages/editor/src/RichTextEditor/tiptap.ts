/*
 * starter kit includes:
 * Nodes:
 *   Blockquote,BulletList,CodeBlock,Document,HardBreak,Heading,HorizontalRule,ListItem,OrderedList,Paragraph,Text
 * Marks:
 *   Bold,Code,Italic,Link (New in v3),Strike,Underline (New in v3)
 * Functionality:
 *   Dropcursor,Gapcursor,UndoRedo,ListKeymap (New in v3),TrailingNode (New in v3)
 */
import { StarterKit } from "@tiptap/starter-kit";
/*
 * extensions kit includes:
 * Extensions:
 *   in Starter kit:
 *   Dropcursor,Gapcursor,UndoRedo (before named History),TrailingNode,
 *   others:
 *   CharacterCount,Placeholder,Focus,Selection
 */
import {
  Placeholder,
  CharacterCount, //字符计数
  Focus, //为得到焦点的节点添加.has-focus CSS类名
  Selection, //当编辑器失去焦点时为当前的选择添加.selection CSS类名
} from "@tiptap/extensions";
/*
 * list kit includes:
 * Nodes:
 *   BulletList,ListItem,OrderedList,TaskItem,TaskList
 * Functionality:
 *   ListKeymap
 * in Starter kit:
 *   BulletList,ListItem,OrderedList,ListKeymap
 * others:
 *   TaskItem,TaskList
 * Kit:
 *   ListKit
 */
import { TaskItem, TaskList } from "@tiptap/extension-list";
/*
 * table kit includes:
 * Nodes:
 *   Table,TableCell,TableHeader,TableRow
 * Kit:
 *   TableKit
 */
import { TableKit } from "@tiptap/extension-table";
/*
 * text style kit includes:
 * Marks:
 *   TextStyle
 * Functionality:
 *   BackgroundColor,Color,FontFamily,FontSize,LineHeight
 * Kit:
 *   TextStyleKit
 */
import { TextStyleKit } from "@tiptap/extension-text-style";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
// import Collaboration from "@tiptap/extension-collaboration";
// import CollaborationCaret from "@tiptap/extension-collaboration-caret";
// import { HocuspocusProvider } from "@hocuspocus/provider";
// import * as Y from "yjs";
// import type { Doc } from "yjs";
// import { IndexeddbPersistence } from "y-indexeddb";

// 自定义扩展
import { UploadImageWithResizable } from "./tiptap_extensions/extension-image-upload";
import { MarkdownPaste } from "./tiptap_extensions/extension-markdown-paste";
import {
  MathKatexInline,
  MathKatexBlock,
} from "./tiptap_extensions/extension-math";
import { CodeBlockShiki } from "./tiptap_extensions/extension-code-block-shiki";

// const instants = new Map<string, HocuspocusProvider>();
// function getProvider(docName: string, ydoc: Doc) {
//   let provider = instants.get(docName);
//   if (!provider) {
//     provider = new HocuspocusProvider({
//       url: `ws://${window.location.host}/collaboration/${docName}`,
//       name: docName,
//       document: ydoc,
//       onAwarenessUpdate: ({ states }) => {
//         const customData = states.find((d) => d.data);
//         if (customData) {
//           console.log(customData.data);
//         }
//       },
//     });
//     instants.set(docName, provider);
//   }
//   return provider;
// }

export {
  StarterKit,
  // Collaboration,
  // CollaborationCursor,
  // HocuspocusProvider,
  // IndexeddbPersistence,
  UploadImageWithResizable,
  // getProvider,
  // Y,
  MarkdownPaste as markdownPasteExtension,
  TableKit,
  TaskItem,
  TaskList,
  TextStyleKit,
  Superscript,
  Subscript,
  Highlight,
  TextAlign,
  Placeholder,
  CharacterCount,
  Focus,
  Selection,
  CodeBlockShiki,
  MathKatexInline,
  MathKatexBlock,
};
