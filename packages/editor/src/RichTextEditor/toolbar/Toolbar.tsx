import clsx from "clsx";
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconSuperscript,
  IconSubscript,
  IconCode,
  IconEraser,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconList,
  IconListNumbers,
  IconCodeblock,
  IconLink,
  IconUnlink,
  IconBlockquote,
  IconAlignLeft,
  IconAlignRight,
  IconAlignCenter,
  IconAlignJustified,
  IconSeparator,
  IconPhoto,
  IconTable,
  IconCornerDownLeft,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconPaint,
  IconHelp,
} from "@tabler/icons-react";
import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { menuBarStateSelector } from "./toolbarStateSelector";
import { useState } from "react";
import { ColorPickerPopover } from "./ColorPickerPopover";
import { CloseButton } from "@rtdui/core";
import TiptapEditorHelpMDX from "./editorMan.mdx";

const FONT_SIZES = [
  "8",
  "9",
  "10",
  "11",
  "12",
  "14",
  "16",
  "18",
  "20",
  "22",
  "24",
  "26",
  "28",
  "36",
  "48",
  "72",
];

export interface ToolbarProps extends React.ComponentProps<"div"> {
  editor: Editor | null;
}

export const Toolbar = (props: ToolbarProps) => {
  const { editor, className, ...other } = props;

  if (!editor) {
    return null;
  }

  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  const [color, setColor] = useState("auto");
  const [bgColor, setBgColor] = useState("auto");

  return (
    <div {...other} className={clsx("flex gap-1 p-1", className)}>
      <div className="join">
        <button
          title="撤销"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          className={clsx("join-item btn btn-xs btn-square")}
        >
          <IconArrowBackUp stroke={1.5} size={18} />
        </button>
        <button
          title="重做"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          className={clsx("join-item btn btn-xs btn-square")}
        >
          <IconArrowForwardUp stroke={1.5} size={18} />
        </button>
      </div>

      <div className="join">
        <select
          value={editorState.fontSize}
          onChange={(ev) => {
            const val = ev.target.value;
            if (val === "16") {
              editor.chain().focus().unsetFontSize().run();
            } else {
              editor.chain().focus().setFontSize(`${val}px`).run();
            }
          }}
          className="select select-xs w-16 join-item"
        >
          {FONT_SIZES.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="join">
        <button
          title="粗体"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isBold,
          })}
        >
          <IconBold stroke={2} size={18} />
        </button>
        <button
          title="斜体"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isItalic,
          })}
        >
          <IconItalic stroke={1.5} size={18} />
        </button>
        <button
          title="下划线"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderline}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isUnderline,
          })}
        >
          <IconUnderline stroke={1.5} size={20} />
        </button>
        <button
          title="删除线"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isStrike,
          })}
        >
          <IconStrikethrough stroke={1.5} size={18} />
        </button>
        <button
          title="上标"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          disabled={!editorState.canSuperscript}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isSuperscript,
          })}
        >
          <IconSuperscript stroke={1.5} size={18} />
        </button>
        <button
          title="下标"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          disabled={!editorState.canSubscript}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isSubscript,
          })}
        >
          <IconSubscript stroke={1.5} size={18} />
        </button>
        <button
          title="代码"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isCode,
          })}
        >
          <IconCode stroke={1.5} size={18} />
        </button>
      </div>

      <div className="join">
        <button
          title="高亮"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          disabled={!editorState.canHighlight}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isHighlight,
          })}
        >
          <div className="size-4 flex items-center justify-center bg-warning text-sm font-normal">
            A
          </div>
        </button>
      </div>
      <div className="join">
        <button
          title="文本颜色"
          onClick={() => {
            if (color === "auto") {
              editor.chain().focus().unsetColor().run();
            } else {
              editor.chain().focus().setColor(color).run();
            }
          }}
          disabled={!editorState.canColor}
          className={clsx(
            "join-item btn btn-xs btn-square relative text-sm font-normal",
          )}
        >
          A
          <div
            className="absolute left-1 right-1 bottom-0.5 z-1 h-1"
            style={{ backgroundColor: color === "auto" ? "black" : color }}
          />
        </button>
        <ColorPickerPopover onChangeEnd={(val) => setColor(val)} />
      </div>
      <div className="join">
        <button
          title="背景颜色"
          onClick={() => {
            if (bgColor === "auto") {
              editor.chain().focus().unsetBackgroundColor().run();
            } else {
              editor.chain().focus().setBackgroundColor(bgColor).run();
            }
          }}
          disabled={!editorState.canBgColor}
          className={clsx(
            "join-item btn btn-xs btn-square relative text-sm font-normal",
          )}
        >
          <IconPaint stroke={1.5} size={14} />
          <div
            className="absolute left-1 right-1 bottom-0.5 z-1 h-1"
            style={{
              backgroundColor: bgColor === "auto" ? "black" : bgColor,
            }}
          />
        </button>
        <ColorPickerPopover onChangeEnd={(val) => setBgColor(val)} />
      </div>

      <div className="join">
        <button
          title="清除格式"
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
          className={clsx("join-item btn btn-xs btn-square")}
        >
          <IconEraser stroke={1.5} size={18} />
        </button>
      </div>

      <div className="join">
        {/* <button
          title="段落"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={clsx("join-item btn btn-xs", {
            "btn-active": editorState.isParagraph,
          })}
        >
          Paragraph
        </button> */}
        <button
          title="H1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isHeading1,
          })}
        >
          <IconH1 stroke={1.5} size={18} />
        </button>
        <button
          title="H2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isHeading2,
          })}
        >
          <IconH2 stroke={1.5} size={18} />
        </button>
        <button
          title="H3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isHeading3,
          })}
        >
          <IconH3 stroke={1.5} size={18} />
        </button>
        <button
          title="H4"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isHeading4,
          })}
        >
          <IconH4 stroke={1.5} size={18} />
        </button>
        <button
          title="H5"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isHeading5,
          })}
        >
          <IconH5 stroke={1.5} size={18} />
        </button>
        <button
          title="H6"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isHeading6,
          })}
        >
          <IconH6 stroke={1.5} size={18} />
        </button>
      </div>

      <div className="join">
        <button
          title="符号列表"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isBulletList,
          })}
        >
          <IconList stroke={1.5} size={18} />
        </button>
        <button
          title="序号列表"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isOrderedList,
          })}
        >
          <IconListNumbers stroke={1.5} size={18} />
        </button>
        <button
          title="代码块"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isCodeBlock,
          })}
        >
          <IconCodeblock stroke={1.5} size={18} />
        </button>
        <button
          title="引用"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isBlockquote,
          })}
        >
          <IconBlockquote stroke={1.5} size={18} />
        </button>
      </div>

      <div className="join">
        <button
          title="左对齐"
          onClick={() => editor.chain().focus().toggleTextAlign("left").run()}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isLeftAlign,
          })}
        >
          <IconAlignLeft stroke={1.5} size={18} />
        </button>
        <button
          title="居中对齐"
          onClick={() => editor.chain().focus().toggleTextAlign("center").run()}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isCenterAlign,
          })}
        >
          <IconAlignCenter stroke={1.5} size={18} />
        </button>
        <button
          title="右对齐"
          onClick={() => editor.chain().focus().toggleTextAlign("right").run()}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isRightAlign,
          })}
        >
          <IconAlignRight stroke={1.5} size={18} />
        </button>
        <button
          title="两端对齐"
          onClick={() =>
            editor.chain().focus().toggleTextAlign("justify").run()
          }
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isJustifyAlign,
          })}
        >
          <IconAlignJustified stroke={1.5} size={18} />
        </button>
      </div>

      <div className="join">
        <button
          title="超链接"
          onClick={() => {
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
          }}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isLink,
          })}
        >
          <IconLink stroke={1.5} size={18} />
        </button>
        <button
          title="取消超链接"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isLink,
          })}
        >
          <IconUnlink stroke={1.5} size={18} />
        </button>
      </div>

      <div className="join">
        <button
          title="水平线"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={clsx("join-item btn btn-xs btn-square")}
        >
          <IconSeparator stroke={1.5} size={18} />
        </button>
        <button
          title="断行"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className={clsx("join-item btn btn-xs btn-square", {
            "btn-active": editorState.isHardBreak,
          })}
        >
          <IconCornerDownLeft stroke={1.5} size={18} />
        </button>
      </div>

      <div className="join">
        <button
          title="插入图片"
          onClick={() => editor.chain().focus().uploadImage({}).run()}
          className={clsx("join-item btn btn-xs btn-square")}
        >
          <IconPhoto stroke={1.5} size={18} />
        </button>
        <button
          title="插入表格"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className={clsx("join-item btn btn-xs btn-square")}
        >
          <IconTable stroke={1.5} size={18} />
        </button>
      </div>

      <div className="join">
        <button
          type="button"
          className="join-item btn btn-xs btn-square"
          onClick={() =>
            (
              document.getElementById("edit_helper_dialog") as HTMLDialogElement
            )?.showModal()
          }
        >
          <IconHelp size={20} stroke={1.5} />
        </button>
        <dialog id="edit_helper_dialog" className="modal">
          <div
            className={clsx(
              "modal-box flex flex-col p-6 w-11/12 max-w-5xl",
              className,
            )}
          >
            <form method="dialog">
              <div className="sticky top-0 flex justify-end mb-1">
                <CloseButton type="submit" />
              </div>
            </form>
            <div className="flex-1 overflow-y-auto prose max-w-none" {...other}>
              <TiptapEditorHelpMDX />
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};
