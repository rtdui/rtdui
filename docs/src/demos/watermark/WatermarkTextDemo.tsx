import { Watermark } from "@rtdui/core";

export default function Demo() {
  return (
    <Watermark text="这是水印rtdui">
      <div className="h-96 bg-base-100">内容</div>
    </Watermark>
  );
}
Demo.displayName = "WatermarkTextDemo";
