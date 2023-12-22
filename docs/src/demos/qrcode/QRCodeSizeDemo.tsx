import React from "react";
import { QRCode } from "@rtdui/qr-code";
import { TextInput, Slider } from "@rtdui/core";

export default function Demo() {
  const [value, setValue] = React.useState("https://example.com/?query=1");
  const [size, setSize] = React.useState(160);
  return (
    <div className="flex flex-col gap-8">
      <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
      <Slider
        color="primary"
        min={60}
        max={320}
        step={10}
        value={size}
        onChange={setSize}
      />
      <QRCode
        value={value}
        size={size}
        icon="/favicon.ico"
        iconSize={size / 4}
      />
    </div>
  );
}
Demo.displayName = "QRCodeSizeDemo";
