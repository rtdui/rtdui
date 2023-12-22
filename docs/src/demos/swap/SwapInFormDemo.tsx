import React from "react";
import { Swap } from "@rtdui/core";

export default function Demo() {
  // 作为Swap的受控属性
  const [swapChecked, setSwapChecked] = React.useState(false);

  const [output, setOutput] = React.useState("");

  const handleSwapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwapChecked(e.currentTarget.checked);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jsonObj = Object.fromEntries(formData.entries());
    setOutput(JSON.stringify(jsonObj));
  };

  return (
    <>
      <form method="post" onSubmit={handleFormSubmit}>
        <Swap
          name="aa"
          checked={swapChecked}
          onChange={handleSwapChange}
          className="text-6xl"
        >
          <div>😈</div>
          <div>😇</div>
        </Swap>

        <Swap name="bb" defaultChecked={true} className="text-6xl">
          <div>🥶</div>
          <div>😭</div>
        </Swap>

        <button className="btn btn-primary btn-block mt-4" type="submit">
          提交
        </button>
      </form>
      <div className="mt-4">输出: {output}</div>
    </>
  );
}
Demo.displayName = "SwapInFormDemo";
