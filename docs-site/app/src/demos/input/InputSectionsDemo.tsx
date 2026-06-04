import { CloseButton, Input } from "@rtdui/core";
import { IconAt } from "@tabler/icons-react";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Input leftSection={<IconAt className="stroke-gray-400" size={18} />} />
      <Input
        rightSection={<CloseButton size="xs" />}
        rightSectionPointerEvents="auto"
      />
    </div>
  );
}

Demo.displayName = "InputSectionsDemo";
