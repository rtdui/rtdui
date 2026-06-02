import { useEffect, useRef } from "react";
import { useMergedRef } from "@rtdui/hooks";
import type { EditorView } from "codemirror";
import { createEditorView, injectKeyMap } from "./utils/codemirror";
import { useMdEditorContext } from "./context";
import clsx from "clsx";

export type MdEditPartOwnProps = {};

type MdEditPartProps = MdEditPartOwnProps &
  Omit<React.ComponentProps<"div">, keyof MdEditPartOwnProps>;

export function MdEditPart(props: MdEditPartProps) {
  const { ref, className, ...other } = props;

  const mountRef = useRef<HTMLDivElement>(null!);
  const mergeRef = useMergedRef(ref, mountRef);

  const cmViewRef = useRef<EditorView>(null);

  const {
    value = "",
    onValueChange = () => {},
    onEditorViewChange,
    toolbars,
  } = useMdEditorContext() ?? {};

  useEffect(() => {
    if (!cmViewRef.current) {
      cmViewRef.current = createEditorView(
        value,
        onValueChange,
        mountRef.current,
      );

      onEditorViewChange?.(cmViewRef.current);
    }
  }, []);

  const keymapInjectedRef = useRef(false);
  useEffect(() => {
    if (cmViewRef.current && toolbars && !keymapInjectedRef.current) {
      keymapInjectedRef.current = true;
      injectKeyMap(cmViewRef.current, toolbars);
    }
  }, []);

  return (
    <div ref={mergeRef} {...other} className={clsx("md-editor", className)} />
  );
}
