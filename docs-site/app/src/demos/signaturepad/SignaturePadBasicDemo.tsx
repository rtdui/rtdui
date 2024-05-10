import { Button, Divider, Slider } from "@rtdui/core";
import { SignaturePad, SignaturePadHandle } from "@rtdui/signature-pad";
import { useRef, useState } from "react";
import ColorControl from "~/src/components/ColorControl";

export default function Demo() {
  const [state, setState] = useState({
    width: 330,
    height: 200,
    penColor: "black",
    minWidth: 0.5,
    maxWidth: 2.5,
  });
  const [dataUrl, setDataUrl] = useState("");
  const signPadRef = useRef<SignaturePadHandle>(null!);

  const handleConfirm = () => {
    setDataUrl(signPadRef.current.toDataURL()); // 默认为image/png格式
    // setDataUrl(signPadRef.current.toDataURL("image/jpeg")); // image/jpeg格式
    // setDataUrl(signPadRef.current.toDataURL("image/jpeg", 0.5)); // image/jpeg格式, 带输出图像质量
    // setDataUrl(signPadRef.current.toDataURL("image/svg+xml")); // image/svg+xml格式
    // setDataUrl(signPadRef.current.toDataURL("image/svg+xml", {includeBackgroundColor: true,})); // image/svg+xml格式, 带背景输出
  };
  return (
    <div className="flex flex-col gap-4 select-none">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 select-none">
          <SignaturePad
            ref={signPadRef}
            width={state.width}
            height={state.height}
            onConfirm={handleConfirm}
            clearLabel="清除"
            confirmLabel="确定"
            penColor={state.penColor}
            minWidth={state.minWidth}
            maxWidth={state.maxWidth}
          />
        </div>
        <Divider direction="horizontal" />
        <div className="flex flex-col gap-4 bg-base-100 md:w-56 p-4">
          Pen color:
          <ColorControl
            withThemeColor={false}
            value={state.penColor}
            onChange={(val) => setState((prev) => ({ ...prev, penColor: val }))}
          />
          Pen min width:
          <Slider
            min={0.5}
            max={5}
            step={0.5}
            value={state.minWidth}
            onChange={(val) => setState((prev) => ({ ...prev, minWidth: val }))}
          />
          Pen max width:
          <Slider
            min={0.5}
            max={5}
            step={0.5}
            value={state.maxWidth}
            onChange={(val) => setState((prev) => ({ ...prev, maxWidth: val }))}
          />
          <Button size="sm" onClick={() => signPadRef.current.undo()}>
            Undo
          </Button>
          <Button size="sm" onClick={() => signPadRef.current.redo()}>
            Redo
          </Button>
        </div>
      </div>
      <Divider>预览</Divider>
      <div className="bg-base-100 w-fit">
        {dataUrl && (
          <img src={dataUrl} alt="" width={state.width} height={state.height} />
        )}
      </div>
    </div>
  );
}

Demo.displayName = "SignaturePadBasicDemo";
