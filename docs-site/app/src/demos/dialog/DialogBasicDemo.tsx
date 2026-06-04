import React from "react";
import { Button } from "@rtdui/core";
import { dialogs } from "@rtdui/dialogs";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={() => {
          dialogs.show({
            title: "这是提示框标题",
            content: "这是对话框消息体",
            mode: "alert",
          });
        }}
      >
        打开alert框
      </Button>
      <Button
        onClick={() => {
          dialogs.show({
            title: "这是确认框标题",
            content: "这是对话框消息体",
            mode: "confirm",
            onClose: (result) => result && alert(JSON.stringify(result)),
          });
        }}
      >
        打开Confirm框
      </Button>
      <Button
        onClick={() => {
          dialogs.show({
            title: "这是输入框标题",
            content: "请输入姓名",
            mode: "prompt",
            onClose: (result) => result && alert(JSON.stringify(result)),
          });
        }}
      >
        打开Prompt框
      </Button>
      <Button
        onClick={() => {
          dialogs.show({
            title: "这是对话框标题",
            content: <div>这是对话框消息体</div>,
            fullScreen: true,
            slots: { dialogContent: "h-[2000px]", dialogTitle: "sticky top-0" },
          });
        }}
      >
        打开全屏对话框
      </Button>
    </div>
  );
}
Demo.displayName = "DialogBasicDemo";
