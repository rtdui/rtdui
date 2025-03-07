import { Button, ModalLight } from "@rtdui/core";
import { useRef } from "react";

export default function Demo() {
	const ref = useRef<HTMLDialogElement>(null!);

	return (
		<>
			<ModalLight ref={ref} withCloseButton={false}>
				Modal without header, press escape or click on overlay to close
			</ModalLight>

			<Button color="primary" onClick={() => ref.current.showModal()}>
				Open modal
			</Button>
		</>
	);
}

Demo.displayName = "ModalNoHeaderDemo";
