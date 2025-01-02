import { ButtonCheckbox } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="join">
			<ButtonCheckbox required label="label1" className="join-item" />
			<ButtonCheckbox required label="label2" className="join-item" />
			<ButtonCheckbox required label="label3" className="join-item" />
			<ButtonCheckbox required label="label4" className="join-item" />
		</div>
	);
}
Demo.displayName = "ButtonCheckboxGroupDemo";
