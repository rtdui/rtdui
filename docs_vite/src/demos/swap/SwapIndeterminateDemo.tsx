import { Swap } from "@rtdui/core";

export default function SwapIndeterminateDemo() {
  return (
    <Swap transitionEffect="flip" className="text-9xl" indeterminate>
      <div>😈</div>
      <div>😇</div>
      <div>😭</div>
    </Swap>
  );
}
