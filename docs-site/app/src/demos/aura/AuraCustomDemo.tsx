import { Aura, Button } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col items-start gap-3">
      自定义动画持续时间:
      <Aura className="duration-1000">
        <Button>Button</Button>
      </Aura>
      自定义颜色(使用currentColor作为渐变背景图像):
      <Aura className="text-orange-600 bg-yellow-200">
        <Button>Button</Button>
      </Aura>
    </div>
  );
}
Demo.displayName = "AuraCustomDemo";
