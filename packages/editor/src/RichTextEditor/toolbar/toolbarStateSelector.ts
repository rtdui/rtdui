import type { Editor } from "@tiptap/core";
import type { EditorStateSnapshot } from "@tiptap/react";

/**
 * State selector for the MenuBar component.
 * Extracts the relevant editor state for rendering menu buttons.
 */
export function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
  return {
    // History
    canUndo: ctx.editor.can().chain().undo().run() ?? false,
    canRedo: ctx.editor.can().chain().redo().run() ?? false,

    // Text formatting
    isBold: ctx.editor.isActive("bold") ?? false,
    canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
    isItalic: ctx.editor.isActive("italic") ?? false,
    canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
    isUnderline: ctx.editor.isActive("underline") ?? false,
    canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
    isStrike: ctx.editor.isActive("strike") ?? false,
    canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
    isSuperscript: ctx.editor.isActive("superscript") ?? false,
    canSuperscript: ctx.editor.can().chain().toggleSuperscript().run() ?? false,
    isSubscript: ctx.editor.isActive("subscript") ?? false,
    canSubscript: ctx.editor.can().chain().toggleSubscript().run() ?? false,
    isCode: ctx.editor.isActive("code") ?? false,
    canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
    isHighlight: ctx.editor.isActive("highlight") ?? false,
    canHighlight: ctx.editor.can().chain().toggleHighlight().run() ?? false,
    canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,

    // color
    canColor: ctx.editor.can().chain().setColor("black").run() ?? false,
    color: ctx.editor.getAttributes("textStyle").color,
    canBgColor:
      ctx.editor.can().chain().setBackgroundColor("black").run() ?? false,
    bgColor: ctx.editor.getAttributes("textStyle").backgroundColor,

    // Block types
    isParagraph: ctx.editor.isActive("paragraph") ?? false,
    isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
    isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
    isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
    isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
    isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
    isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,

    // Lists and blocks
    isBulletList: ctx.editor.isActive("bulletList") ?? false,
    isOrderedList: ctx.editor.isActive("orderedList") ?? false,
    isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
    isBlockquote: ctx.editor.isActive("blockquote") ?? false,
    isHardBreak: ctx.editor.isActive("hardBreak") ?? false,

    // text align
    isLeftAlign: ctx.editor.isActive({ textAlign: "left" }) ?? false,
    isCenterAlign: ctx.editor.isActive({ textAlign: "center" }) ?? false,
    isRightAlign: ctx.editor.isActive({ textAlign: "right" }) ?? false,
    isJustifyAlign: ctx.editor.isActive({ textAlign: "justify" }) ?? false,

    // font size
    isFontSize(fontSize: string) {
      return ctx.editor.isActive("textStyle", { fontSize }) ?? false;
    },
    fontSize:
      ctx.editor.getAttributes("textStyle")?.fontSize?.slice(0, -2) ?? 16, // 12px => 12

    // link
    isLink: ctx.editor.isActive("link"),
    setLink() {
      const editor = ctx.editor;
      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      try {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
      } catch (e: any) {
        alert(e.message);
      }
    },
  };
}

export type MenuBarState = ReturnType<typeof menuBarStateSelector>;
