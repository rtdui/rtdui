import type { ControlBaseProps } from "./ControlBase";
import { ControlBase } from "./ControlBase";
import { useEditorContext } from "./context";
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
  return function Control(props: ControlBaseProps) {
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
        onClick={() =>
          (editor?.chain().focus() as any)
            [operation.name](operation.attributes)
            .run()
        }
        icon={icon}
        {...props}
      />
    );
  };
}
