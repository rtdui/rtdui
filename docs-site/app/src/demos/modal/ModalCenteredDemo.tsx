import { Button, Modal } from "@rtdui/core";
import { useDisclosure } from "@rtdui/hooks";

export default function Demo() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Title" centered>
        Modal, press escape or click on overlay or click close button to close
      </Modal>

      <Button color="primary" onClick={open}>
        Open modal
      </Button>
    </>
  );
}

Demo.displayName = "ModalCenterDemo";
