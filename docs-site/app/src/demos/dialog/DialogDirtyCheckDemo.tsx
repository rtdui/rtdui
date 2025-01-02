import { useEffect, useState } from "react";
import { Button, TextInput } from "@rtdui/core";
import { dialogs } from "@rtdui/dialogs";

interface DialogViewProps {
	dialogId?: string;
	onClose?: () => void;
}
function DialogView(props: DialogViewProps) {
	const { dialogId } = props;
	let initialValues = { myInput1: "abc", myInput2: "xyz" };
	const [values, setValues] = useState(initialValues);

	useEffect(() => {
		if (JSON.stringify(initialValues) !== JSON.stringify(values)) {
			dialogs.update({
				dialogId,
				isDirty: true,
			});
		} else {
			dialogs.update({
				dialogId,
				isDirty: false,
			});
		}
	}, [values]);

	return (
		<form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
			<div className="navbar">
				<Button
					color="secondary"
					onClick={(e) => {
						dialogs.update({
							dialogId,
							isDirty: false,
						});
						initialValues = values;
					}}
				>
					保 存
				</Button>
				(点击保存后会清除脏状态)
			</div>
			<div className="flex flex-col gap-4">
				<TextInput
					label="修改输入框中的内容,点击关闭时会进行脏数据提醒"
					value={values.myInput1}
					onChange={(e) =>
						setValues((prev) => ({ ...prev, myInput1: e.target.value }))
					}
				/>
				<TextInput
					label="修改输入框中的内容,点击关闭时会进行脏数据提醒"
					value={values.myInput2}
					onChange={(e) =>
						setValues((prev) => ({ ...prev, myInput2: e.target.value }))
					}
				/>
			</div>
		</form>
	);
}

export default function Demo() {
	return (
		<div className="flex flex-col items-center gap-4">
			<Button
				onClick={() => {
					dialogs.show({
						dialogId: "dirty-check",
						title: "脏数据检查例子",
						content: <DialogView />,
						fullScreen: true,
					});
				}}
			>
				打开带有脏数据检查功能的对话框
			</Button>
		</div>
	);
}
Demo.displayName = "DialogDirtyCheckDemo";
