import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { Resizable } from "re-resizable";

export default function ImageResizableComponent(props: NodeViewProps) {
	const { editor, node, selected, updateAttributes, extension } = props;

	const ref = React.useRef<Resizable>(null!);

	const handleImgLoad = (ev: React.UIEvent<HTMLImageElement>) => {
		const img = ev.target as HTMLImageElement;
		const aspectRatio = img.naturalWidth / img.naturalHeight;
		const { width } = img.getBoundingClientRect();
		const height = width / aspectRatio;
		ref.current.updateSize({
			width,
			height,
		});
	};

	return (
		<NodeViewWrapper>
			<Resizable
				ref={ref}
				size={
					node.attrs.width && node.attrs.height
						? {
								width: node.attrs.width,
								height: node.attrs.height,
							}
						: {
								width: "100%",
								height: "auto",
							}
				}
				onResizeStop={(ev, direction, element, delta) => {
					updateAttributes({
						// width: node.attrs.width + delta.width,
						// height: node.attrs.height + delta.height,
						width: Number(getComputedStyle(element).width.slice(0, -2)),
						height: Number(getComputedStyle(element).height.slice(0, -2)),
					});
				}}
				lockAspectRatio
				// bounds="window"
				enable={
					extension.options.resizable && editor.isEditable
						? {
								top: false,
								right: false,
								bottom: false,
								left: false,
								topRight: false,
								bottomRight: true,
								bottomLeft: false,
								topLeft: false,
							}
						: false
				}
			>
				<img
					src={node.attrs.src}
					alt={node.attrs.alt}
					title={node.attrs.title}
					className={selected ? "ProseMirror-selectednode" : undefined}
					onLoad={handleImgLoad}
					data-drag-handle
					style={{
						width: "100%",
						height: "100%",
					}}
				/>
			</Resizable>
		</NodeViewWrapper>
	);
}
