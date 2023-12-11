import { RichTextEditor } from "@rtdui/editor";
import { Button } from "@rtdui/core";
import React from "react";

export default function () {
  const ref = React.useRef<any>(null!);
  const refTarget = React.useRef<any>(null!);

  const handleBtnClick = () =>
    refTarget.current.setContent(ref.current.getJSON());

  return (
    <div>
      <RichTextEditor
        ref={ref}
        uploadImageUrl="/api/editor/upload"
        className="border border-base-200 rounded-box bg-base-100 overflow-hidden"
        slots={{ toolbar: "border-b" }}
      />
      <div className="my-4 flex items-center gap-2">
        <Button color="primary" onClick={handleBtnClick}>
          保存JSON
        </Button>
        <div className="bg-base-200 px-4">
          点击保存按钮会将上面编辑器的内容保存为JSON,并且被加载到下面的只读编辑器中.
          <br />
          这模拟了编辑、保存、阅览的过程
        </div>
      </div>
      <RichTextEditor
        ref={refTarget}
        editable={false}
        className="border border-base-200 rounded-box bg-base-100 overflow-hidden"
        slots={{ toolbar: "border-b" }}
      />
    </div>
  );
}
