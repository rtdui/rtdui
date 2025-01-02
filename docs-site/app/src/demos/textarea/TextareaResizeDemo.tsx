import { TextArea } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex flex-col gap-2">
			允许用户改变尺寸(限制于垂直方向):
			<TextArea autosize placeholder="请输入" resize="vertical" />
		</div>
	);
}
Demo.displayName = "TextareaDemo";
