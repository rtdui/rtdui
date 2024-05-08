import { Button, Modal } from "@rtdui/core";
import { useDisclosure } from "@rtdui/hooks";
import { useState } from "react";

export default function Demo() {
  const [opened, { open, close }] = useDisclosure(false);
  const [size, setSize] = useState("xs");
  return (
    <>
      <Modal size={size} opened={opened} onClose={close} title="Title">
        press escape or click on overlay or click close button to close
      </Modal>

      <div className="flex gap-4">
        <Button
          color="primary"
          onClick={() => {
            setSize("xs");
            open();
          }}
        >
          xs
        </Button>
        <Button
          color="primary"
          onClick={() => {
            setSize("sm");
            open();
          }}
        >
          sm
        </Button>
        <Button
          color="primary"
          onClick={() => {
            setSize("md");
            open();
          }}
        >
          md
        </Button>
        <Button
          color="primary"
          onClick={() => {
            setSize("lg");
            open();
          }}
        >
          lg
        </Button>
        <Button
          color="primary"
          onClick={() => {
            setSize("xl");
            open();
          }}
        >
          xl
        </Button>
        <Button
          color="primary"
          onClick={() => {
            setSize("70%");
            open();
          }}
        >
          70%
        </Button>
        <Button
          color="primary"
          onClick={() => {
            setSize("100%");
            open();
          }}
        >
          100%
        </Button>
        <Button
          color="primary"
          onClick={() => {
            setSize("auto");
            open();
          }}
        >
          auto
        </Button>
      </div>
    </>
  );
}

Demo.displayName = "ModalSizeDemo";
