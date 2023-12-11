import React, { forwardRef } from "react";
import { IconHelp, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import TiptapEditorHelpMDX from "./editorMan.mdx";

export interface HelperControlProps
  extends React.ComponentPropsWithoutRef<"div"> {}

export default forwardRef<HTMLButtonElement, HelperControlProps>(
  (props, ref) => {
    const { className, ...other } = { ...props };
    return (
      <>
        {/* The button to open modal */}
        <button
          type="button"
          className="btn btn-square btn-sm"
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
              className
            )}
          >
            <form method="dialog">
              <div className="sticky top-0 flex justify-end mb-1">
                <button type="submit" className="btn btn-sm btn-circle">
                  <IconX />
                </button>
              </div>
            </form>
            <div className="flex-1 overflow-y-auto prose max-w-none" {...other}>
              <TiptapEditorHelpMDX />
            </div>
          </div>
        </dialog>
      </>
    );
  }
);
