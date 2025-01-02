import React, { forwardRef } from "react";

export interface RichTextEditorControlsGroupProps
	extends React.ComponentPropsWithoutRef<"div"> {}

export const ControlsGroup = forwardRef<
	HTMLDivElement,
	RichTextEditorControlsGroupProps
>((props, ref) => {
	const { className, children, ...others } = props;

	return (
		<div className="join" ref={ref} {...others}>
			{children}
		</div>
	);
});

ControlsGroup.displayName = "TiptapControlsGroup";
