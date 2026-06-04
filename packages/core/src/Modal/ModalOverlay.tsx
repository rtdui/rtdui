import { Overlay, type OverlayProps } from "../Overlay";
import { Transition, type TransitionProps } from "../Transition";
import { useModalContext } from "./context";
import { useModalTransition } from "./use-modal-transition";
import { mergeRefs } from "@rtdui/hooks";

export interface ModalOverlayProps
  extends
    Omit<OverlayProps, "styles" | "classNames" | "variant" | "vars">,
    Omit<React.ComponentProps<"div">, "color"> {
  /** Props passed down to the `Transition` component */
  transitionProps?: TransitionProps;
}

export function ModalOverlay(props: ModalOverlayProps) {
  const { ref, onClick, transitionProps, style, ...others } = props;
  const ctx = useModalContext();
  const transition = useModalTransition(transitionProps);

  return (
    <Transition in={ctx.opened} appear={true} transition="fade" {...transition}>
      {(_ref, _styles) => (
        <Overlay
          ref={mergeRefs(ref, _ref)}
          fixed
          style={{ ...style, ..._styles }}
          zIndex={ctx.zIndex}
          onClick={(event) => {
            onClick?.(event);
            ctx.closeOnClickOutside && ctx.onClose();
          }}
          {...others}
        />
      )}
    </Transition>
  );
}
