import { useMergedRef } from "@rtdui/hooks";
import { EditorView } from "codemirror";
import { forwardRef, useEffect, useRef } from "react";
import { createEditorView, injectKeyMap } from "./utils/codemirror";
import { useMdEditorContext } from "./context";
import clsx from "clsx";

export type EditorOwnProps = {};

type EditorProps = EditorOwnProps &
	Omit<React.ComponentPropsWithoutRef<"div">, keyof EditorOwnProps>;

export const Editor = forwardRef<HTMLDivElement, EditorProps>((props, ref) => {
	const { className, ...other } = props;

	const mountRef = useRef<HTMLDivElement>(null!);
	const mergeRef = useMergedRef(ref, mountRef);

	const cmViewRef = useRef<EditorView>();

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
});

Editor.displayName = "@rtdui/md-editor/Editor";
