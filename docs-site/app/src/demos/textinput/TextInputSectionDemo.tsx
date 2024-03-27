import { IconAt, IconSend } from "@tabler/icons-react";
import { TextInput, Button } from "@rtdui/core";

export default function Demo() {
  return (
    <TextInput
      type="search"
      required
      size="sm"
      placeholder="这是占位文本"
      label="这是标签"
      helperText="(这是帮助文本)"
      leftSection={<IconAt strokeWidth={1} size="1.2rem" />}
      rightSection={
        <Button color="primary" size="sm" sharp="square">
          <IconSend size="1rem" />
        </Button>
      }
    />
  );
}
Demo.displayName = "TextInputSectionDemo";
