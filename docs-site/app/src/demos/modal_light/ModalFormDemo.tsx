import { Button, Checkbox, ModalLight, TextInput } from "@rtdui/core";
import { useState, useRef } from "react";

export default function Demo() {
	const ref = useRef<HTMLDialogElement>(null!);
	const [fullScreen, setFullScreen] = useState(false);

	return (
		<>
			<ModalLight ref={ref} title="Register" fullScreen={fullScreen}>
				<form className="flex flex-col gap-4 p-2">
					<div className="flex gap-4">
						<TextInput
							label="First name"
							placeholder="your first name"
							required
							className="flex-1"
						/>
						<TextInput
							label="Last name"
							placeholder="your last name"
							required
							className="flex-1"
						/>
					</div>
					<TextInput label="Email" placeholder="your email" required />
					<TextInput label="Password" placeholder="password" required />
					<TextInput
						label="Confirm Password"
						placeholder="confirm password"
						required
					/>
					<Checkbox
						color="secondary"
						defaultChecked
						size="sm"
						label="I agree to sell my privacy to this corporation"
					/>
					<div className="flex justify-end">
						<Button color="primary" defaultChecked>
							Submit
						</Button>
					</div>
				</form>
			</ModalLight>

			<div className="flex gap-4">
				<Button
					color="primary"
					onClick={(e) => {
						setFullScreen(false);
						ref.current.showModal();
					}}
				>
					Open modal
				</Button>

				<Button
					color="primary"
					onClick={(e) => {
						setFullScreen(true);
						ref.current.showModal();
					}}
				>
					Open modal in full screen
				</Button>
			</div>
		</>
	);
}

Demo.displayName = "ModalBasicDemo";
