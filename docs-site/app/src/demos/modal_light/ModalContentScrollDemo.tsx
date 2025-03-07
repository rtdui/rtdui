import { useRef } from "react";
import { Button, ModalLight } from "@rtdui/core";

export default function Demo() {
	const ref = useRef<HTMLDialogElement>(null!);

	const content = Array(100)
		.fill(0)
		.map((_, index) => <p key={index}>Modal with scroll</p>);

	return (
		<>
			<ModalLight ref={ref} title="Title">
				{content}
			</ModalLight>

			<Button color="primary" onClick={() => ref.current.showModal()}>
				Open modal
			</Button>
		</>
	);
}

Demo.displayName = "ModalContentScrollDemo";
