import React from "react";
import { QRCode } from "@rtdui/qr-code";
import { TextInput } from "@rtdui/core";

function randomString(length: number, chars = "abcdefghijklmnopqrstuvwxyz") {
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export default function QRCodeRefreshDemo() {
  const [value, setValue] = React.useState("https://example.com/?query=1");
  const noise = randomString(6);
  return (
    <div className="flex flex-col gap-2">
      <TextInput value={value} onChange={(e) => setValue(e.target.value)} />
      <QRCode
        value={value}
        onRefresh={() =>
          setValue(`https://example.com/?query=1&noise=${noise}`)
        }
      />
    </div>
  );
}
