import { FloatingSelect } from "@rtdui/core";
import { IconCode, IconExternalLink, IconEye } from "@tabler/icons-react";

export default function Demo() {
  const data = [
    {
      value: "preview",
      label: (
        <div className="inline-flex items-center gap-0.5">
          <IconEye size={16} />
          <span>Preview</span>
        </div>
      ),
    },
    {
      value: "code",
      label: (
        <div className="inline-flex items-center gap-0.5">
          <IconCode size={16} />
          <span>Code</span>
        </div>
      ),
    },
    {
      value: "export",
      label: (
        <div className="inline-flex items-center gap-0.5">
          <IconExternalLink size={16} />
          <span>Export</span>
        </div>
      ),
    },
  ];
  return (
    <div className="flex justify-center">
      <FloatingSelect data={data} defaultValue="preview" />
    </div>
  );
}

Demo.displayName = "FloatingSelectLabelDemo";
