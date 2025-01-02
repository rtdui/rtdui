import { forwardRef } from "react";
import type { ControlBaseProps } from "./ControlBase";
import { ControlBase } from "./ControlBase";
import { useEditorContext } from "./ControlContext";
import type { ControlLabels } from "./constrolLabels";

interface CreateControlOptions {
	label: keyof ControlLabels;
	icon: React.FC<{ size: number | string }>;
	isActive?: { name: string; attributes?: Record<string, any> | string };
	operation: { name: string; attributes?: Record<string, any> | string };
}

export default function createTiptapControl({
	label,
	isActive,
	operation,
	icon,
}: CreateControlOptions) {
	const Control = forwardRef<HTMLButtonElement, ControlBaseProps>(
		(props, ref) => {
			const { editor, labels } = useEditorContext();
			const _label = labels[label] as string;
			return (
				<ControlBase
					aria-label={_label}
					title={_label}
					active={
						isActive?.name
							? editor?.isActive(isActive.name, isActive.attributes)
							: false
					}
					ref={ref}
					onClick={() =>
						(editor?.chain().focus() as any)
							[operation.name](operation.attributes)
							.run()
					}
					icon={icon}
					{...props}
				/>
			);
		},
	);

	Control.displayName = `@rtdui/editor/Control_${label}`;

	return Control;
}
