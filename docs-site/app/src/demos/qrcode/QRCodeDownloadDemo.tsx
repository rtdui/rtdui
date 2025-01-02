import React from "react";
import { QRCode } from "@rtdui/qr-code";
import { Button, TextInput } from "@rtdui/core";

export default function Demo() {
	const [value, setValue] = React.useState("https://example.com/?query=1");
	const id = React.useId();
	const downloadQRCode = () => {
		const canvas = document
			.getElementById(id)!
			.querySelector<HTMLCanvasElement>("canvas");
		if (canvas) {
			const url = canvas.toDataURL();
			const a = document.createElement("a");
			a.download = "QRCode.png";
			a.href = url;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};
	return (
		<div id={id} className="flex flex-col gap-2">
			<TextInput value={value} onChange={(e) => setValue(e.target.value)} />
			<QRCode value={value} />
			<Button
				type="button"
				color="primary"
				className="self-start"
				onClick={downloadQRCode}
			>
				下载二维码
			</Button>
		</div>
	);
}
Demo.displayName = "QRCodeDownloadDemo";
