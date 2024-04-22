import { Button, Input } from "@rtdui/core";
import { IconAt, IconX } from "@tabler/icons-react";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Input leftSection={<IconAt className="stroke-gray-400" size={18} />} />
      <Input
        rightSection={
          <Button size="xs" ghost sharp="circle">
            <IconX size={18} />
          </Button>
        }
        rightSectionPointerEvents="auto"
      />
    </div>
  );
}

Demo.displayName = "InputSectionsDemo";
