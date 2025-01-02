import { TextInput } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex flex-col gap-4 items-start">
			<TextInput placeholder="请输入" color="primary" className="min-w-52" />
			<TextInput placeholder="请输入" color="secondary" className="min-w-52" />
			<TextInput placeholder="请输入" color="accent" className="min-w-52" />
			<TextInput placeholder="请输入" color="info" className="min-w-52" />
			<TextInput placeholder="请输入" color="success" className="min-w-52" />
			<TextInput placeholder="请输入" color="warning" className="min-w-52" />
			<TextInput placeholder="请输入" color="error" className="min-w-52" />
		</div>
	);
}
Demo.displayName = "TextInputColorDemo";
