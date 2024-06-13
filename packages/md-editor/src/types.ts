import type { EditorView } from "@codemirror/view";
import type { Schema } from "hast-util-sanitize";
import type { Image } from "mdast";
import type { Options } from "remark-rehype";
import type { Processor } from "unified";
import type { Root, Element } from "hast";
export { EditorView };

export type VFile = ReturnType<Processor["processSync"]>;

export { Root, Element };
export interface Meta {
  hast: Root;
  file: VFile;
  toc: Toc;
}

export interface UploadResult {
  fileName: string;
  fileUrl: string;
}

export interface Locale {
  bold: string;
  boldText: string;
  boldAnditalic: string;
  boldAnditalicText: string;
  cheatsheet: string;
  closeHelp: string;
  closeToc: string;
  code: string;
  codeBlock: string;
  codeLang: string;
  codeText: string;
  exitFullscreen: string;
  exitPreviewOnly: string;
  exitWriteOnly: string;
  fullscreen: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  headingText: string;
  help: string;
  hr: string;
  image: string;
  imageAlt: string;
  imageTitle: string;
  italic: string;
  italicText: string;
  limited: string;
  lines: string;
  link: string;
  linkText: string;
  ol: string;
  olItem: string;
  preview: string;
  previewOnly: string;
  quote: string;
  quotedText: string;
  shortcuts: string;
  source: string;
  sync: string;
  toc: string;
  top: string;
  ul: string;
  ulItem: string;
  words: string;
  write: string;
  writeOnly: string;
  /** gfm */
  strike: string;
  strikeText: string;
  table: string;
  tableHeading: string;
  task: string;
  taskText: string;
  /** math */
  math: string;
  block: string;
  blockText: string;
  inline: string;
  inlineText: string;
  /** mermaid */
  class: string;
  er: string;
  flowchart: string;
  gantt: string;
  mermaid: string;
  mindmap: string;
  pie: string;
  sequence: string;
  state: string;
  timeline: string;
  uj: string;
  [key: string]: string;
}

export interface EditorContext {
  /**
   * CodeMirror editor instance
   */
  editor: EditorView;
}
export type SplitMode = "edit" | "preview" | "both";
export type Mode = "auto" | "split" | "tab";
export type ActivedSidebar = "toc" | "help" | "none";
export type Toc = { level: number; text: string }[];

export interface ViewerContext {
  /**
   * The root element of the viewer
   */
  markdownBody: HTMLElement;
  /**
   * Virtual file format used in [unified](https://unifiedjs.com/)
   *
   * Get the HTML output by calling `vfile.toString()`
   */
  file: VFile;
}

interface ToolbarCommon {
  /**
   * Toolbar title
   */
  title: string;
  /**
   * Toolbar icon (16x16), usually inline svg
   */
  icon?: React.ReactNode;
  /**
   * item is actived
   */
  active?: boolean;
  /**
   * item display sequence
   */
  order?: number;
}

export interface Action {
  /**
   * Action title
   */
  title: string;
  /**
   * Toolbar icon (16x16), usually inline svg
   */
  icon?: React.ReactNode;
  /**
   * Click event handler
   */
  click: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    ctx: EditorContext
  ) => void;
  /**
   * Markdown syntax cheatsheet
   *
   * If specified, this record will be added to the Markdown cheatsheet section
   */
  cheatsheet?: string;
  /**
   * Keyboard shortcut
   *
   * If specified, this shortcut will bind to click listener
   * and will be added to the Keyboard shortcut section
   *
   * https://codemirror.net/doc/manual.html#keymaps
   */
  shortcut?: string;
  mouseenter?: EventListener;
  mouseleave?: EventListener;
}

export interface ToolbarActionSingle extends ToolbarCommon, Action {
  type: "single";
}

export interface ToolbarActionMultiple extends ToolbarCommon {
  type: "multiple";
  title: string;
  actions: Action[];
}

export interface ToolbarDivider {
  type: "divider";
}

export interface ToolbarSpace {
  type: "space";
}

export type ToolbarItem =
  | ToolbarActionSingle
  | ToolbarActionMultiple
  | ToolbarDivider
  | ToolbarSpace;

// export type ToolbarActionHandler = {};

type EventListener = (e: CustomEvent<EditorContext>) => void;

export interface Plugin {
  /**
   * Customize Markdown parse by remark plugins:
   *
   * https://github.com/remarkjs/remark/blob/main/doc/plugins.md
   */
  remark?: (p: Processor) => Processor;
  /**
   * Customize HTML parse by rehype plugins:
   *
   * https://github.com/rehypejs/rehype/blob/main/doc/plugins.md
   */
  rehype?: (p: Processor) => Processor;
  /**
   * Register actions in toolbar, cheatsheet and shortcuts
   */
  toolbar?: ToolbarItem[];

  /**
   * Side effect for the viewer, triggers when viewer props changes
   */
  viewerEffect?(ctx: ViewerContext): void | (() => void);
}

export interface ProcessorOptions {
  /**
   * Plugin list
   */
  plugins?: Plugin[];
  /**
   * Sanitize strategy: Defaults to GitHub style sanitation with class names allowed
   *
   * https://github.com/syntax-tree/hast-util-sanitize/blob/main/lib/github.json
   *
   * If you want further customization, pass a function to mutate sanitize schema.
   */
  sanitize?: (schema: Schema) => Schema;
  /**
   * custom remark-rehype options: Defaults value { allowDangerousHtml: true }
   *
   * https://github.com/remarkjs/remark-rehype
   */
  remarkRehypeOptions?: Options;
}

export interface EditorProps extends ViewerProps {
  /**
   * Editor display mode
   *
   * - `split`: edit on the left and preview on the right
   * - `tab`: click tabs to switch between edit and preview
   * - `auto`: auto determined by the width of editor container
   *
   * @defaultValue `auto`
   */
  mode?: "split" | "tab" | "auto";
  /**
   * Debounce time (ms) for preview
   *
   * @defaultValue 300
   */
  previewDebounce?: number;
  /**
   * i18n locale
   *
   * @defaultValue en
   */
  locale?: Partial<Locale>;
  /**
   * Handle images upload
   */
  uploadImages?: (
    files: File[]
  ) => Promise<Pick<Image, "url" | "alt" | "title">[]>;
}

export interface ViewerProps {
  /**
   * Markdown text
   */
  value: string;
  /**
   * Plugin list
   */
  plugins?: Plugin[];
  /**
   * Sanitize strategy: Defaults to GitHub style sanitation with class names allowed
   *
   * https://github.com/syntax-tree/hast-util-sanitize/blob/main/lib/github.json
   *
   * If you want further customization, pass a function to mutate sanitize schema.
   */
  sanitize?: (schema: Schema) => Schema;
  /**
   * custom remark-rehype options: Defaults value { allowDangerousHtml: true }
   *
   * https://github.com/remarkjs/remark-rehype
   */
  remarkRehypeOptions?: Options;
}
