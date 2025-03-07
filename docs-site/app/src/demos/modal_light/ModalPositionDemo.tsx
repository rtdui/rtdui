import { useRef } from "react";
import { Button, ModalLight } from "@rtdui/core";

export default function Demo({
	position,
}: { position: "top" | "middle" | "bottom" | "start" | "end" }) {
	const ref = useRef<HTMLDialogElement>(null!);

	return (
		<>
			<ModalLight ref={ref} title="Title" position={position}>
				Modal, press escape or click on overlay or click close button to close
			</ModalLight>

			<Button color="primary" onClick={() => ref.current.showModal()}>
				Open modal
			</Button>
		</>
	);
}

Demo.displayName = "ModalPositionDemo";
