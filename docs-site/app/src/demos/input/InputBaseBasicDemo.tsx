import { InputBase } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <InputBase
        placeholder="['label', 'description', 'input', 'error']"
        label="默认顺序"
        description="description"
        error="error"
        required
      />
      <InputBase
        inputWrapperOrder={["label", "input", "description", "error"]}
        placeholder="['label', 'input', 'description', 'error']"
        label="自定义顺序"
        description="description"
        error="error"
        required
      />

      <InputBase
        inputWrapperOrder={["label", "input", "error"]}
        placeholder="['label', 'input', 'error']"
        label="只指定的部分"
        description="description"
        error="error"
        required
      />
    </div>
  );
}

Demo.displayName = "InputBaseBasicDemo";
