import { forwardRef, isValidElement, cloneElement } from "react";
import clsx from "clsx";
import { Button, CloseButton, TextInput } from "@rtdui/core";
import { useInputState } from "@rtdui/hooks";

export interface DialogProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title" | "content"> {
  /** Called when close button is clicked */
  onClose?: (result?: any) => void;

  /** Dialog title, displayed before body */
  title?: React.ReactNode;

  /** Dialog message, place main text here */
  children?: React.ReactNode;

  /** Dialog actions */
  actions?: React.ReactNode;

  /** Determines whether close button should be visible in title
   * @default true
   */
  withCloseButton?: boolean;

  /** full screen dialog */
  fullScreen?: boolean;
  /** dialog mode
   * @default "dialog"
   */
  mode?: "alert" | "prompt" | "confirm" | "dialog";

  /** confirm button text for confirm or prompt mode
   * @default "OK"
   */
  confirmLabel?: string;
  /** cancel button text for confirm or prompt mode
   * @default "Cancel"
   */
  cancelLabel?: string;
  /** close button text for alert mode
   * @default "Close"
   */
  closeLabel?: string;
  /** default prompt text for prompt mode
   * @default "Close"
   */
  defaultPrompt?: string;

  slots?: {
    closeBtn?: string;
    dialogTitle?: string;
    title?: string;
    dialogContent?: string;
    dialogAction?: string;
    okBtn?: string;
    cancelBtn?: string;
  };
  dialogId?: string;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
  const {
    dialogId,
    className,
    color = "info",
    withCloseButton = true,
    title,
    children,
    actions,
    onClose,
    fullScreen,
    mode = "dialog",
    confirmLabel = "OK",
    cancelLabel = "Cancel",
    closeLabel = "Close",
    defaultPrompt = "",
    slots,
    ...others
  } = props;

  const [promptValue, setPromptValue] = useInputState(defaultPrompt);

  return (
    <div className="modal modal-open">
      <div
        ref={ref}
        className={clsx(
          "modal-box p-0",
          {
            "w-screen max-w-full h-screen max-h-screen rounded-none":
              fullScreen,
          },
          className
        )}
        {...others}
      >
        <div
          className={clsx(
            "dialog-title bg-base-200 px-6 py-2 pr-4 flex items-center justify-between",
            slots?.dialogTitle
          )}
        >
          <h3 className={clsx("font-bold", slots?.title)}>{title}</h3>
          {withCloseButton && <CloseButton onClick={(e) => onClose?.()} />}
        </div>
        <div
          className={clsx(
            "dialog-content p-6 overflow-auto",
            slots?.dialogContent
          )}
        >
          {mode === "prompt" ? (
            <TextInput
              label={children as string}
              slots={{ input: "input-bordered" }}
              value={promptValue}
              onChange={setPromptValue}
            />
          ) : isValidElement(children) ? (
            cloneElement(children as React.ReactElement<any>, {
              onClose,
              dialogId,
            })
          ) : (
            children
          )}
        </div>
        {mode !== "dialog" && (
          <div className={clsx("modal-action px-6 pb-6", slots?.dialogAction)}>
            {mode !== "alert" && (
              <Button
                className={clsx("btn-primary", slots?.okBtn)}
                onClick={(e) =>
                  onClose?.(mode === "confirm" ? "ok" : promptValue)
                }
              >
                {confirmLabel}
              </Button>
            )}
            <Button
              className={clsx("", slots?.cancelBtn)}
              onClick={(e) => onClose?.()}
            >
              {mode === "alert" ? closeLabel : cancelLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});

Dialog.displayName = "@rtdui/Dialog";
