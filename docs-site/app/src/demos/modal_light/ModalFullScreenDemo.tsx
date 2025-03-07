import { Button, ModalLight } from "@rtdui/core";
import { useRef } from "react";

export default function Demo() {
	const ref = useRef<HTMLDialogElement>(null!);

	const content = Array(100)
		.fill(0)
		.map((_, index) => <p key={index}>Modal with scroll</p>);

	return (
		<>
			<ModalLight ref={ref} fullScreen title="Title">
				{content}
			</ModalLight>

			<Button color="primary" onClick={() => ref.current.showModal()}>
				Open modal
			</Button>
		</>
	);
}

Demo.displayName = "ModalFullScreenDemo";
