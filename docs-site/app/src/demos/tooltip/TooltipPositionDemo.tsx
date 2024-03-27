import { Tooltip, Button } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex justify-center">
      <div>
        <div className="w-48 flex justify-center mb-2">
          <Tooltip tip="气泡提示" position="top">
            <Button>顶部</Button>
          </Tooltip>
        </div>
        <div className="w-48 flex justify-between mb-1.5">
          <Tooltip tip="气泡提示" position="left">
            <Button>左侧</Button>
          </Tooltip>
          <Tooltip tip="气泡提示" position="right">
            <Button>右侧</Button>
          </Tooltip>
        </div>
        <div className="w-48 flex justify-center">
          <Tooltip tip="气泡提示" position="bottom">
            <Button>底部</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
Demo.displayName = "TooltipPositionDemo";
