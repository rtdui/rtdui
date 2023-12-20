import { Watermark } from "@rtdui/core";

export default function WatermarkImageDemo() {
  return (
    <Watermark
      width={200}
      height={50}
      imageSrc="/photo-1414694762283-acccc27bca85.jpg"
    >
      <div className="h-96 bg-base-100">内容</div>
    </Watermark>
  );
}