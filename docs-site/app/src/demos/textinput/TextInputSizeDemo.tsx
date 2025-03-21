import { TextInput } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex flex-col gap-4 items-start">
			<TextInput placeholder="请输入" size="xs" className="min-w-52" />
			<TextInput placeholder="请输入" size="sm" className="min-w-52" />
			<TextInput placeholder="请输入" size="md" className="min-w-52" />
			<TextInput placeholder="请输入" size="lg" className="min-w-52" />
		</div>
	);
}
Demo.displayName = "TextInputSizeDemo";
