import { Button, Modal } from "@rtdui/core";
import { useDisclosure } from "@rtdui/hooks";

export default function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>Modal with scroll</p>);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Title">
        {content}
      </Modal>

      <Button color="primary" onClick={open}>
        Open modal
      </Button>
    </>
  );
}

Demo.displayName = "ModalContentScrollDemo";
