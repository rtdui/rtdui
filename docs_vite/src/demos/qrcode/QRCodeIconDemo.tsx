import React from "react";
import { QRCode } from "@rtdui/qr-code";
import { TextInput } from "@rtdui/core";

export default function Demo() {
  const [value, setValue] = React.useState("https://example.com/?query=1");
  return (
    <div className="flex flex-col gap-2">
      <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
      <QRCode value={value} icon="/favicon.ico" />
    </div>
  );
}
Demo.displayName = "QRCodeIconDemo";
