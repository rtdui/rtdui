import { forwardRef, useEffect } from "react";
import { Dialog, type DialogProps } from "./Dialog";
import type { DialogData } from "./dialogs.store";

export interface DialogContainerProps extends DialogProps {
  data: DialogData;
  onHide: (id: string) => void;
}

export const DialogContainer = forwardRef<HTMLDivElement, DialogContainerProps>(
  (props, ref) => {
    const { data, onHide, ...others } = props;
    const { content, onOpen, onClose, ...dialogProps } = data;

    const handleHide = (result: any) => {
      onHide(data.id!);
      data.onClose?.(result);
    };

    useEffect(() => {
      if (typeof onOpen === "function") {
        data.onOpen?.(data);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Dialog ref={ref} {...others} {...dialogProps} onClose={handleHide}>
        {content}
      </Dialog>
    );
  }
);

DialogContainer.displayName = "@rtdui/DialogContainer";
