import React from "react";
import { QRCode } from "@rtdui/qr-code";
import { TextInput } from "@rtdui/core";

export default function () {
  const [value, setValue] = React.useState("https://example.com/?query=1");
  return (
    <div className="flex flex-col gap-2">
      <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
      <div className="flex gap-4">
        <QRCode value={value} fgColor="green" />
        <QRCode value={value} fgColor="blue" />
        <QRCode value={value} fgColor="#C71585" />
      </div>
    </div>
  );
}
