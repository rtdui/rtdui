import { TextInput } from "@rtdui/core";

export default function Demo() {
	return (
		<TextInput
			placeholder="请输入"
			required
			label="这是标签"
			description="(这是帮助文本)"
			error="错误消息"
		/>
	);
}
Demo.displayName = "TextInputMemberDemo";
