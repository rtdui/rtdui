import React from "react";
import { Button } from "@rtdui/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import { notifications } from "@rtdui/notifications";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={() => {
          notifications.show({
            title: "这是通知标题",
            content: "这是通知消息体",
            autoClose: false,
          });
        }}
      >
        禁用自动关闭
      </Button>
      <Button
        onClick={() => {
          notifications.show({
            title: "这是通知标题",
            content: "这是通知消息体",
          });
        }}
      >
        显示通知(无图标)
      </Button>
      <Button
        onClick={() => {
          notifications.show({
            title: "这是通知标题",
            content: "这是通知消息体",
            icon: <IconX size="20" />,
            color: "error",
          });
        }}
      >
        显示通知
      </Button>
      <Button
        onClick={() => {
          notifications.show({
            id: "my-test-notifications-id",
            content: "正在处理中...",
            loading: true,
            autoClose: false,
          });
          setTimeout(() => {
            notifications.update({
              id: "my-test-notifications-id",
              content: "已处理成功",
              color: "success",
              loading: false,
              icon: <IconCheck size="20" />,
              autoClose: 4000,
            });
          }, 3000);
        }}
      >
        显示通知(loading+更新)
      </Button>
    </div>
  );
}
Demo.displayName = "NotificationBasicDemo";
