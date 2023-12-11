import { Tooltip, Button } from "@rtdui/core";

export default function () {
  return (
    <div className="flex flex-col gap-4 pt-8 lg:flex-row ">
      <Tooltip tip="气泡提示" color="primary">
        <Button>按钮</Button>
      </Tooltip>
      <Tooltip tip="气泡提示" color="secondary">
        <Button>按钮</Button>
      </Tooltip>
      <Tooltip tip="气泡提示" color="accent">
        <Button>按钮</Button>
      </Tooltip>
      <Tooltip tip="气泡提示" color="info">
        <Button>按钮</Button>
      </Tooltip>
      <Tooltip tip="气泡提示" color="success">
        <Button>按钮</Button>
      </Tooltip>
      <Tooltip tip="气泡提示" color="warning">
        <Button>按钮</Button>
      </Tooltip>
      <Tooltip tip="气泡提示" color="error">
        <Button>按钮</Button>
      </Tooltip>
    </div>
  );
}
