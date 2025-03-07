import { useRef } from "react";
import { Button, ModalLight } from "@rtdui/core";

export default function Demo() {
	const ref = useRef<HTMLDialogElement>(null!);

	return (
		<>
			<ModalLight ref={ref} title="Title">
				Modal, press escape or click on overlay or click close button to close
			</ModalLight>

			<Button color="primary" onClick={() => ref.current.showModal()}>
				Open modal
			</Button>
		</>
	);
}

Demo.displayName = "ModalBasicDemo";
