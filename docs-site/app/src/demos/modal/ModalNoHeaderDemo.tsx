import { Button, Modal } from "@rtdui/core";
import { useDisclosure } from "@rtdui/hooks";

export default function Demo() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        Modal without header, press escape or click on overlay to close
      </Modal>

      <Button color="primary" onClick={open}>
        Open modal
      </Button>
    </>
  );
}

Demo.displayName = "ModalNoHeaderDemo";
